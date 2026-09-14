import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import SplitText from "../ui/SplitText"
import StoreButtons from "../common/StoreButtons"
import { APP_URL, LEAD_FORM_ID, brand, leadForm } from "../../config/site"
import { facts } from "../../content/facts"

type FieldName = "name" | "phone" | "email" | "interest"
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>
type Status = "idle" | "submitting" | "success" | "error"

const REQUIRED: readonly FieldName[] = ["name", "phone", "email"]
const EMPTY: Values = { name: "", phone: "", email: "", interest: "" }
const INTERESTS = [
  "US stocks and ETFs",
  "Global mutual funds",
  "Bonds and structured income",
  "Pre-IPO and unlisted",
  "Not sure yet",
]
const CHECKLIST = [
  "Paperless KYC in minutes",
  `Buy in fractions, from ${facts.fractionalFrom}`,
  "No foreign bank account needed",
  "One consolidated INR + USD view",
]

function validateField(field: FieldName, raw: string): string | undefined {
  const value = raw.trim()
  switch (field) {
    case "name":
      return value.length >= 2 ? undefined : "Please enter your full name."
    case "phone": {
      const digits = value.replace(/\D/g, "")
      if (!digits) return "Please enter your mobile number."
      return digits.length >= 10 && digits.length <= 15
        ? undefined
        : "Please enter a valid mobile number."
    }
    case "email":
      if (!value) return "Please enter your email address."
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
        ? undefined
        : "Please enter a valid email address."
    default:
      return undefined
  }
}

function validate(values: Values): Errors {
  const errors: Errors = {}
  for (const field of REQUIRED) {
    const message = validateField(field, values[field])
    if (message) errors[field] = message
  }
  return errors
}

const inputClass = (invalid: boolean) =>
  `bg-slate-50 border rounded-[10px] h-[46px] sm:h-[47px] px-[16px] font-display text-[15px] text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow w-full ${
    invalid ? "border-red-600" : "border-slate-300"
  }`

type FieldProps = {
  name: "name" | "phone" | "email"
  label: string
  type: "text" | "tel" | "email"
  autoComplete: string
  placeholder: string
  inputMode?: "text" | "tel" | "email"
  value: string
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function Field({
  name,
  label,
  type,
  autoComplete,
  placeholder,
  inputMode,
  value,
  error,
  onChange,
}: FieldProps) {
  const id = `lead-${name}`
  const errorId = `${id}-error`
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-display font-semibold text-[13px] text-slate-700"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputClass(Boolean(error))}
      />
      {error && (
        <p
          id={errorId}
          data-field-error
          className="font-display text-[12.5px] font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  )
}

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function OpenAccount() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [serverMessage, setServerMessage] = useState("")
  const [firstName, setFirstName] = useState("")
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus()
  }, [status])

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const field = event.target.name as FieldName
    const { value } = event.target
    setValues((previous) => ({ ...previous, [field]: value }))
    if (errors[field])
      setErrors((previous) => ({
        ...previous,
        [field]: validateField(field, value),
      }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "submitting") return
    const form = event.currentTarget

    const found = validate(values)
    setErrors(found)
    const firstInvalid = REQUIRED.find((field) => found[field])
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus("submitting")
    setServerMessage("")

    const body = new FormData(form)
    body.set("access_key", leadForm.accessKey)
    body.set("subject", leadForm.subject)
    body.set("from_name", leadForm.fromName)
    if (!values.interest) body.set("interest", "Not specified")

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 20000)
    try {
      const response = await fetch(leadForm.endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
        signal: controller.signal,
      })
      const result = (await response.json().catch(() => null)) as {
        success?: boolean
        message?: string
      } | null
      if (response.ok && result?.success === true) {
        setFirstName(values.name.trim().split(/\s+/)[0] ?? "")
        setValues(EMPTY)
        setStatus("success")
      } else {
        setServerMessage(
          result?.message
            ? `${result.message} Please try again.`
            : "Couldn't send right now. Please try again.",
        )
        setStatus("error")
      }
    } catch {
      setServerMessage(
        "Network error. Please check your connection and try again.",
      )
      setStatus("error")
    } finally {
      window.clearTimeout(timeout)
    }
  }

  const submitting = status === "submitting"

  return (
    <section
      id={LEAD_FORM_ID}
      aria-labelledby="open-title"
      className="on-dark w-full overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-600 py-16 md:py-24 lg:py-[104px]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        <div className="w-full lg:w-[50%] flex flex-col items-start text-white">
          <p className="flex items-center gap-2 mb-4 sm:mb-[20px] font-display text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[1.44px] text-indigo-100">
            <span aria-hidden="true">❖</span> Open an account
          </p>

          <SplitText
            id="open-title"
            text="Ready to take your portfolio global?"
            tag="h2"
            className="font-display font-extrabold text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] leading-[1.2] tracking-[-0.96px] mb-4 sm:mb-[20px]"
            splitType="chars"
            textAlign="left"
          />

          <p className="font-display text-[15px] sm:text-[17px] md:text-[18px] text-indigo-50 mb-6 sm:mb-[36px]">
            Fully digital and regulated at GIFT City. Leave your details and a
            specialist takes it from there.
          </p>

          <ul className="flex flex-col gap-3.5 sm:gap-[18px] w-full">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-3 sm:gap-[14px]">
                <span
                  aria-hidden="true"
                  className="font-display font-black text-[15px] sm:text-[17px] shrink-0 text-emerald-300"
                >
                  ✓
                </span>
                <span className="font-display font-medium text-[15px] sm:text-[17px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {APP_URL && (
            <a
              href={APP_URL}
              className="mt-8 inline-flex items-center gap-2 rounded-[12px] border border-white/60 px-5 py-2.5 font-display font-bold text-[15px] text-white hover:bg-white/10 transition-colors"
            >
              Open your account online <span aria-hidden="true">→</span>
            </a>
          )}

          <StoreButtons
            tone="dark"
            label="Or invest on the go: get the Valura.Ai app"
            className="mt-8 sm:mt-10"
          />
        </div>

        <div className="w-full lg:w-[48%] flex justify-center lg:justify-end">
          <div className="on-light bg-white rounded-2xl sm:rounded-[24px] p-6 sm:p-8 md:p-[40px] w-full max-w-[536px] shadow-[0_25px_25px_rgba(0,0,0,0.35)]">
            {status === "success" ? (
              <div role="status" className="flex flex-col items-start">
                <span
                  className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                  aria-hidden="true"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="mt-4 font-display font-extrabold text-[22px] sm:text-[24px] text-slate-900 tracking-[-0.48px]"
                >
                  Thanks{firstName ? `, ${firstName}` : ""}! Request received.
                </h3>
                <p className="mt-2 font-display text-[15px] text-slate-600 leading-relaxed">
                  A specialist will contact you to help you get started.
                  Investments in securities markets are subject to market risks.
                </p>
                {APP_URL ? (
                  <a
                    href={APP_URL}
                    className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-blue-900 px-5 py-3 font-display font-bold text-[15px] text-white hover:bg-blue-800 transition-colors"
                  >
                    Continue to open your account{" "}
                    <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <StoreButtons
                    label="Meanwhile, get the Valura.Ai app"
                    className="mt-6"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 font-display text-[14px] font-semibold text-indigo-700 underline underline-offset-4"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={onSubmit}
                aria-labelledby="lead-form-title"
                className="flex flex-col gap-4 sm:gap-[18px]"
              >
                <div>
                  <h3
                    id="lead-form-title"
                    className="font-display font-extrabold text-[20px] sm:text-[24px] text-slate-900 tracking-[-0.48px]"
                  >
                    Open your global account
                  </h3>
                  <p className="mt-1.5 font-display text-[14px] text-slate-600">
                    Two minutes. No overseas paperwork.
                  </p>
                </div>

                {status === "error" && serverMessage && (
                  <p
                    role="alert"
                    className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 font-display text-[14px] text-red-800"
                  >
                    {serverMessage}
                  </p>
                )}

                <Field
                  name="name"
                  label="Full name"
                  type="text"
                  autoComplete="name"
                  placeholder="As per PAN"
                  value={values.name}
                  error={errors.name}
                  onChange={onChange}
                />
                <Field
                  name="phone"
                  label="Mobile"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91"
                  value={values.phone}
                  error={errors.phone}
                  onChange={onChange}
                />
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={values.email}
                  error={errors.email}
                  onChange={onChange}
                />

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="lead-interest"
                    className="font-display font-semibold text-[13px] text-slate-700"
                  >
                    Primary interest{" "}
                    <span className="font-normal text-slate-600">
                      (optional)
                    </span>
                  </label>
                  <div className="relative w-full">
                    <select
                      id="lead-interest"
                      name="interest"
                      value={values.interest}
                      onChange={onChange}
                      className={`${inputClass(false)} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="">Select one</option>
                      {INTERESTS.map((interest) => (
                        <option key={interest} value={interest}>
                          {interest}
                        </option>
                      ))}
                    </select>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <path d="M1 1L5 5L9 1" />
                    </svg>
                  </div>
                </div>

                {/* Spam honeypot: hidden from people, Web3Forms rejects submissions that tick it */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="mt-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-80 disabled:cursor-wait transition-colors text-white font-display font-bold text-[15px] sm:text-[16px] py-3.5 sm:py-[14px] rounded-[10px] flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {submitting ? (
                    <>
                      <Spinner /> Sending...
                    </>
                  ) : (
                    <>
                      Contact us <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>

                <p className="mt-1 font-display text-[12px] text-slate-600 text-center leading-relaxed">
                  By submitting, you agree to be contacted by {brand.partner}{" "}
                  and {brand.platform} about this enquiry. Investments in
                  securities markets are subject to market risks.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
