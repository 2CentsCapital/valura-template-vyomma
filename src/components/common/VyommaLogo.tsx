import svgPaths from "../../../imports/svg-199um8fzce";

interface VyommaLogoProps {
  className?: string;
}

export default function VyommaLogo({ className = "" }: VyommaLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Ribbon Vector Icon */}
      <div className="relative w-[48px] h-[45px] shrink-0">
        <svg
          className="w-full h-full block"
          fill="none"
          viewBox="0 0 52.2237 49"
          preserveAspectRatio="xMidYMid meet"
        >
          <g id="ribbon-logo">
            <path d={svgPaths.p15af0880} fill="#6F41EE" />
            <path d={svgPaths.p48b4200} fill="#3E68F6" />
            <path d={svgPaths.p3d4203c0} fill="#42B8F7" />
          </g>
        </svg>
      </div>

      {/* Brand Text Stack */}
      <div className="flex flex-col justify-center">
        {/* VYOMMA Wordmark SVG */}
        <div className="w-[145px] sm:w-[155px] h-[19px] shrink-0">
          <svg
            className="w-full h-full block"
            fill="none"
            viewBox="0 0 164.408 19.6494"
            preserveAspectRatio="xMidYMid meet"
          >
            <g id="vyomma-wordmark" fill="#06064F">
              <path d={svgPaths.p32fd9a70} />
              <path d={svgPaths.p2acecf00} />
              <path d={svgPaths.p301e1800} />
              <path d={svgPaths.p1ef0a00} />
              <path d={svgPaths.paef9580} />
              <path d={svgPaths.p32a3f480} />
            </g>
          </svg>
        </div>

        {/* Powered By Valura.Ai */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[9px] font-medium text-slate-500 tracking-wide whitespace-nowrap">
            Powered By
          </span>
          <div className="flex items-center gap-0.5">
            <div className="w-[9px] h-[13px] shrink-0">
              <svg
                className="w-full h-full block"
                fill="none"
                viewBox="0 0 9.54389 13.3714"
              >
                <g id="valura-icon">
                  <path d={svgPaths.p1139ee20} stroke="#05A049" strokeWidth="0.60863" />
                  <path d={svgPaths.p2dd45640} stroke="#05A049" strokeWidth="0.60863" />
                  <path d={svgPaths.p5b19c00} stroke="#05A049" strokeWidth="0.60863" />
                  <path d={svgPaths.p1f515800} stroke="#05A049" strokeWidth="0.60863" />
                  <path d={svgPaths.p31382c00} stroke="#05A049" strokeWidth="0.60863" />
                  <path d={svgPaths.p3ad5eb80} fill="#05A049" />
                </g>
              </svg>
            </div>
            <span className="text-[12px] font-light text-[#05a049] tracking-tight whitespace-nowrap font-['Open_Sans',sans-serif]">
              alura.Ai
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
