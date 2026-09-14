import { useEffect, useRef } from "react"

const vertexShaderGLSL = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShaderGLSL = `
precision highp float;
varying vec2 vUv;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3  u_colors[4];
uniform vec3  u_bg;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 p = uv - 0.5;
  p.x *= ratio;

  float t = u_time * 0.1;

  float n1 = snoise(p * 0.4 + vec2(t * 0.2, -t * 0.3));
  float n2 = snoise(p * 0.55 + vec2(-t * 0.15, t * 0.25) + n1 * 0.25);
  float n3 = snoise(p * 0.75 + vec2(t * 0.1, -t * 0.2) + n2 * 0.2);

  vec3 col = u_bg;

  float dist = length(p) * 0.7;
  float vignette = 1.0 - smoothstep(0.4, 1.5, dist);

  col = mix(col, u_colors[0], smoothstep(-0.2, 0.5, n1) * 0.85);
  col = mix(col, u_colors[1], smoothstep(-0.1, 0.6, n2) * 0.7);
  col = mix(col, u_colors[2], smoothstep(-0.3, 0.4, n3) * 0.6);
  col = mix(col, u_colors[3], smoothstep(0.0, 0.7, n1 * n2) * 0.5);

  float glow = smoothstep(0.8, 0.0, dist) * 0.3;
  col += u_colors[1] * glow;

  col = mix(col * 0.2, col, vignette);

  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * u_grain * 0.1;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "")
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255
  return [r, g, b]
}

const DEFAULT_COLORS = ["#3b82f6", "#2563eb", "#0f172a", "#7c3aed"]

interface VelarisProps {
  height?: string
  className?: string
  bg?: string
  colors?: string[]
  speed?: number
  grain?: number
}

/**
 * Animated noise gradient (WebGL 1). Renders at 1x resolution, only runs while on screen and while the tab
 * is visible, and releases its context on unmount. Callers mount it lazily and skip it for reduced motion.
 */
export default function Velaris({
  height = "100%",
  className = "",
  bg = "#0f172a",
  colors = DEFAULT_COLORS,
  speed = 3.5,
  grain = 0.15,
}: VelarisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorsKey = colors.join(",")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", {
      antialias: false,
      powerPreference: "low-power",
    })
    if (!gl) return

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vert = compile(gl.VERTEX_SHADER, vertexShaderGLSL)
    const frag = compile(gl.FRAGMENT_SHADER, fragmentShaderGLSL)
    const program = gl.createProgram()
    if (!vert || !frag || !program) return
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    // Full-screen quad
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const position = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, "u_resolution")
    const uTime = gl.getUniformLocation(program, "u_time")
    gl.uniform1f(gl.getUniformLocation(program, "u_grain"), grain)
    gl.uniform3f(gl.getUniformLocation(program, "u_bg"), ...hexToRgb(bg))
    const palette = [
      ...colorsKey.split(","),
      "#000000",
      "#000000",
      "#000000",
      "#000000",
    ].slice(0, 4)
    gl.uniform3fv(
      gl.getUniformLocation(program, "u_colors"),
      palette.flatMap((c) => hexToRgb(c)),
    )

    // A soft gradient gains nothing from retina resolution, so the canvas renders at 1x.
    const resize = () => {
      const width = Math.max(1, Math.round(canvas.clientWidth))
      const heightPx = Math.max(1, Math.round(canvas.clientHeight))
      if (canvas.width !== width || canvas.height !== heightPx) {
        canvas.width = width
        canvas.height = heightPx
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
    }

    const startedAt = performance.now()
    const draw = () => {
      gl.uniform1f(uTime, ((performance.now() - startedAt) / 1000) * speed)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    let frame = 0
    let onScreen = false
    const loop = () => {
      draw()
      frame = requestAnimationFrame(loop)
    }
    const play = () => {
      if (frame === 0 && onScreen && !document.hidden)
        frame = requestAnimationFrame(loop)
    }
    const pause = () => {
      if (frame !== 0) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    resize()
    draw()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw()
    })
    resizeObserver.observe(canvas)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) play()
      else pause()
    })
    visibilityObserver.observe(canvas)

    const onVisibilityChange = () => {
      if (document.hidden) pause()
      else play()
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      pause()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [bg, colorsKey, speed, grain])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height, display: "block" }}
    />
  )
}
