import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import mainLogo from "../../imports/VyommaAutomatedTaskSchedulingWealthWorkflow/main logo.png";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-[16px] bg-white/95 border-b border-slate-200/80 transition-colors">
      <div className="max-w-[1280px] mx-auto h-[72px] sm:h-[80px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group shrink-0">
          <img src={mainLogo} alt="Vyomma Logo" className="h-7 sm:h-8 w-auto object-contain" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {/* Home Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHomeDropdownOpen(true)}
            onMouseLeave={() => setHomeDropdownOpen(false)}
          >
            <button
              onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
              className="flex items-center gap-1.5 py-2 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[15px] text-[#334155] hover:text-[#3e68f6] transition-colors cursor-pointer"
            >
              <span>Home</span>
              <ChevronDown
                size={14}
                className={`text-slate-500 transition-transform duration-200 ${
                  homeDropdownOpen ? "rotate-180 text-[#3e68f6]" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {homeDropdownOpen && (
              <div className="absolute top-full left-0 w-48 pt-2 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 py-2.5 flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <a
                    href="#hero"
                    className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6] rounded-lg transition-colors"
                  >
                    Task Scheduling
                  </a>
                  <a
                    href="#features"
                    className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6] rounded-lg transition-colors"
                  >
                    Wealth Workflow
                  </a>
                  <a
                    href="#analytics"
                    className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6] rounded-lg transition-colors"
                  >
                    Portfolio Analytics
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Pages Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPagesDropdownOpen(true)}
            onMouseLeave={() => setPagesDropdownOpen(false)}
          >
            <button
              onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
              className="flex items-center gap-1.5 py-2 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[15px] text-[#334155] hover:text-[#3e68f6] transition-colors cursor-pointer"
            >
              <span>Pages</span>
              <ChevronDown
                size={14}
                className={`text-slate-500 transition-transform duration-200 ${
                  pagesDropdownOpen ? "rotate-180 text-[#3e68f6]" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {pagesDropdownOpen && (
              <div className="absolute top-full left-0 w-48 pt-2 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 py-2.5 flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <a
                    href="#pricing"
                    className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6] rounded-lg transition-colors"
                  >
                    Pricing & Plans
                  </a>
                  <a
                    href="#about"
                    className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6] rounded-lg transition-colors"
                  >
                    About Us
                  </a>
                  <a
                    href="#security"
                    className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6] rounded-lg transition-colors"
                  >
                    Security & Trust
                  </a>
                </div>
              </div>
            )}
          </div>

          <a
            href="#features"
            className="py-2 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[15px] text-[#334155] hover:text-[#3e68f6] transition-colors"
          >
            Features
          </a>
          <a
            href="#contact"
            className="py-2 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[15px] text-[#334155] hover:text-[#3e68f6] transition-colors"
          >
            Contact us
          </a>
          <a
            href="#blogs"
            className="py-2 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[15px] text-[#334155] hover:text-[#3e68f6] transition-colors"
          >
            Blogs
          </a>
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          <button className="px-3.5 py-2 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[15px] text-[#334155] hover:text-slate-900 rounded-lg hover:bg-slate-100/70 transition-colors cursor-pointer">
            Sign in
          </button>
          <button className="bg-gradient-to-b from-[#4da2ff] to-[#3e68f6] text-white font-['Inter',sans-serif] font-bold text-[15px] px-[20px] py-[9px] rounded-[10px] shadow-[0_4px_12px_rgba(62,104,246,0.25)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer">
            Get started
          </button>
        </div>

        {/* Mobile & Tablet Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button className="hidden sm:inline-flex bg-gradient-to-b from-[#4da2ff] to-[#3e68f6] text-white font-['Inter',sans-serif] font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-xs">
            Get started
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-lg px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[16px] text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6]"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[16px] text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6]"
            >
              Features
            </a>
            <a
              href="#analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[16px] text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6]"
            >
              Analytics
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[16px] text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6]"
            >
              Contact us
            </a>
            <a
              href="#blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[16px] text-slate-700 hover:bg-slate-50 hover:text-[#3e68f6]"
            >
              Blogs
            </a>
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <button className="w-full py-3 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[15px] text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              Sign in
            </button>
            <button className="w-full py-3 bg-gradient-to-b from-[#4da2ff] to-[#3e68f6] text-white font-['Inter',sans-serif] font-bold text-[16px] rounded-xl shadow-md hover:brightness-105 active:scale-[0.98] transition-all">
              Get started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
