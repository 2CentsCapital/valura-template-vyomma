const support = new Map<number, boolean>()

/** Feature check before mounting a shader effect, so browsers without WebGL never log shader errors. */
export function canUseWebGL(version: 1 | 2 = 1): boolean {
  const cached = support.get(version)
  if (cached !== undefined) return cached
  let supported = false
  try {
    const canvas = document.createElement("canvas")
    const context = (
      version === 2 ? canvas.getContext("webgl2") : canvas.getContext("webgl")
    ) as WebGLRenderingContext | WebGL2RenderingContext | null
    supported = context !== null
    context?.getExtension("WEBGL_lose_context")?.loseContext()
  } catch {
    supported = false
  }
  support.set(version, supported)
  return supported
}
