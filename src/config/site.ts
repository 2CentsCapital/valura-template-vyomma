/**
 * Every outbound link, CTA target, brand string and lead-form setting lives here, so a deployment can be
 * retargeted without touching components.
 *
 * VITE_APP_URL (optional, read at build time): the web app host for this brand.
 *   - unset: "Open account" CTAs scroll to the lead form and no "Log in" link is rendered
 *   - set:   "Open account" and "Log in" go to that URL
 */

function parseHttpUrl(value: string | undefined): string | undefined {
  const trimmed = (value ?? "").trim()
  if (!trimmed) return undefined
  try {
    const url = new URL(trimmed)
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : undefined
  } catch {
    return undefined
  }
}

export const APP_URL = parseHttpUrl(import.meta.env.VITE_APP_URL)

/** id of the section that holds the lead form */
export const LEAD_FORM_ID = "open-account"

export const links = {
  openAccount: APP_URL ?? `#${LEAD_FORM_ID}`,
  /** undefined when there is no app host: the Log in link is then not rendered */
  logIn: APP_URL,
  appStore: "https://apps.apple.com/in/app/valura-ai/id6752678259",
  googlePlay:
    "https://play.google.com/store/apps/details?id=ai.valura.invester&hl=en",
  valura: "https://valura.ai/",
} as const

export const brand = {
  partner: "Vyomma",
  platform: "Valura.Ai",
  fullName: "Vyomma powered by Valura.Ai",
} as const

export const legal = {
  entity: "Valura India IFSC Limited",
  address: "GIFT SEZ, GIFT City, Gandhinagar, Gujarat 382355, India",
  riskLine:
    "Investments in securities markets are subject to market risks. Read all related documents carefully before investing.",
  illustrative: "Illustrative only. Not investment advice.",
} as const

export const leadForm = {
  endpoint: "https://api.web3forms.com/submit",
  /** Public client-side key, already used by the live Valura co-brand landing pages. */
  accessKey: "8534e800-fe2d-4b45-996b-cdda26d02edb",
  subject: "Vyomma powered by Valura.Ai: new lead",
  fromName: "Vyomma powered by Valura.Ai landing page",
} as const
