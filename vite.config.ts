import { defineConfig, loadEnv, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

/**
 * Open Graph and Twitter image URLs must be absolute to be picked up reliably. When VITE_SITE_URL is set
 * (for example https://vyomma.example.com) this replaces %SITE_URL% in index.html and adds og:url and a
 * canonical link. When it is unset the image URLs stay relative.
 */
function siteUrl(value: string | undefined): Plugin {
  const origin = (value ?? "").trim().replace(/\/+$/, "")
  return {
    name: "site-url",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const result = html.replace(/%SITE_URL%/g, origin)
        if (!origin) return result
        return {
          html: result,
          tags: [
            {
              tag: "meta",
              attrs: { property: "og:url", content: `${origin}/` },
              injectTo: "head",
            },
            {
              tag: "link",
              attrs: { rel: "canonical", href: `${origin}/` },
              injectTo: "head",
            },
          ],
        }
      },
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_")
  return {
    plugins: [react(), tailwindcss(), siteUrl(env.VITE_SITE_URL)],
  }
})
