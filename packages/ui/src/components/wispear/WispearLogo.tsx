import { forwardRef, useId, type SVGProps } from "react";

export type WispearTheme = "dark" | "light";

export type WispearLogoProps = SVGProps<SVGSVGElement> & {
  theme?: WispearTheme;
};

const defaultSize = { width: 120, height: 132 };

/**
 * Wispear icon mark (pear + base rings). IDs are scoped with useId() for multiple instances.
 */
export const WispearLogo = forwardRef<SVGSVGElement, WispearLogoProps>(function WispearLogo(
  { theme = "dark", width, height, viewBox, ...rest },
  ref,
) {
  const rawId = useId().replace(/:/g, "");
  const isDark = theme === "dark";
  const gradId = `pearGrad-${rawId}`;
  const ringGlowId = `ringGlow-${rawId}`;
  const baseLightId = `baseLight-${rawId}`;

  const w = width ?? defaultSize.width;
  const h = height ?? defaultSize.height;
  const vb = viewBox ?? "30 10 280 260";

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={vb}
      width={w}
      height={h}
      role="img"
      aria-label={`Wispear logo (${theme})`}
      {...rest}
    >
      <title>Wispear</title>
      <g transform="translate(20, 0)">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="40%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#d4ff47" : "#b8e600"} />
            <stop offset="40%" stopColor={isDark ? "#55e292" : "#3bc776"} />
            <stop offset="100%" stopColor={isDark ? "#1990ff" : "#0070dd"} />
          </linearGradient>
          <filter id={ringGlowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={isDark ? "6" : "4"} result="blur1" />
            {isDark && <feGaussianBlur stdDeviation="2" result="blur2" />}
            <feMerge>
              <feMergeNode in="blur1" />
              {isDark && <feMergeNode in="blur2" />}
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={baseLightId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={isDark ? "12" : "10"} />
          </filter>
        </defs>

        <g className="wispear-base" transform="translate(0, 220)">
          <ellipse
            className="wispear-glow-fill"
            cx="150"
            cy="0"
            rx="70"
            ry="16"
            fill={isDark ? "#00ffff" : "#0070dd"}
            opacity={isDark ? 0.4 : 0.25}
            filter={`url(#${baseLightId})`}
          />
          <ellipse
            className="wispear-ring-outer"
            cx="150"
            cy="0"
            rx="60"
            ry="14"
            fill="none"
            stroke={isDark ? "#00ffff" : "#0070dd"}
            strokeWidth={isDark ? 4 : 3}
            filter={`url(#${ringGlowId})`}
          />
          <ellipse
            className="wispear-ring-inner"
            cx="150"
            cy="0"
            rx="56"
            ry="12"
            fill="none"
            stroke={isDark ? "#ffffff" : "#1d2050"}
            strokeWidth="1"
            opacity={isDark ? 0.8 : 0.4}
          />
        </g>

        <g className="wispear-splash" transform="translate(0, 220)">
          <ellipse className="wispear-splash-ellipse" cx="150" cy="0" rx="15" ry="4" fill={isDark ? "#d4ff47" : "#b8e600"} opacity="0" />
          <ellipse className="wispear-splash-ellipse" cx="110" cy="5" rx="10" ry="3" fill={isDark ? "#55e292" : "#3bc776"} opacity="0" />
          <ellipse className="wispear-splash-ellipse" cx="190" cy="2" rx="12" ry="3" fill={isDark ? "#1990ff" : "#0070dd"} opacity="0" />
          <ellipse className="wispear-splash-ellipse" cx="130" cy="-5" rx="8" ry="2" fill={isDark ? "#aaff2b" : "#8ecc00"} opacity="0" />
          <ellipse className="wispear-splash-ellipse" cx="170" cy="-3" rx="9" ry="2" fill={isDark ? "#00ffff" : "#0070dd"} opacity="0" />
        </g>

        <g className="wispear-pear" transform="translate(0, -10)">
          <path
            className="wispear-leaf wispear-leaf-right"
            d="M 152 75 C 152 45 178 40 188 45 C 183 62 163 72 152 75 Z"
            fill={isDark ? "#d4ff47" : "#b8e600"}
          />
          <path
            className="wispear-leaf wispear-leaf-left"
            d="M 148 76 C 145 52 122 47 112 52 C 117 68 137 73 148 76 Z"
            fill={isDark ? "#aaff2b" : "#8ecc00"}
          />
          <path
            className="wispear-body"
            d="M 150 75 C 165 75 175 95 180 120 C 185 145 215 155 215 185 C 215 215 185 235 150 235 C 115 235 85 215 85 185 C 85 155 115 145 120 120 C 125 95 135 75 150 75 Z"
            fill={`url(#${gradId})`}
          />
          <circle className="wispear-tracer" r="5" fill="#ffffff" opacity="0" aria-hidden />
        </g>
        <g className="wispear-juice" transform="translate(0, -10)">
          <path className="wispear-drop wispear-drop-1" d="M 150 180 C 150 180 145 190 145 195 C 145 198 147 200 150 200 C 153 200 155 198 155 195 C 155 190 150 180 150 180 Z" fill={isDark ? "#d4ff47" : "#b8e600"} opacity="0" />
          <path className="wispear-drop wispear-drop-2" d="M 120 160 C 120 160 115 170 115 175 C 115 178 117 180 120 180 C 123 180 125 178 125 175 C 125 170 120 160 120 160 Z" fill={isDark ? "#55e292" : "#3bc776"} opacity="0" />
          <path className="wispear-drop wispear-drop-3" d="M 180 160 C 180 160 175 170 175 175 C 175 178 177 180 180 180 C 183 180 185 178 185 175 C 185 170 180 160 180 160 Z" fill={isDark ? "#1990ff" : "#0070dd"} opacity="0" />
          <path className="wispear-drop wispear-drop-4" d="M 135 190 C 135 190 130 200 130 205 C 130 208 132 210 135 210 C 138 210 140 208 140 205 C 140 200 135 190 135 190 Z" fill={isDark ? "#aaff2b" : "#8ecc00"} opacity="0" />
          <path className="wispear-drop wispear-drop-5" d="M 165 190 C 165 190 160 200 160 205 C 160 208 162 210 165 210 C 168 210 170 208 170 205 C 170 200 165 190 165 190 Z" fill={isDark ? "#00ffff" : "#0070dd"} opacity="0" />
          <path className="wispear-drop wispear-drop-6" d="M 100 140 C 100 140 95 150 95 155 C 95 158 97 160 100 160 C 103 160 105 158 105 155 C 105 150 100 140 100 140 Z" fill={isDark ? "#d4ff47" : "#b8e600"} opacity="0" />
          <path className="wispear-drop wispear-drop-7" d="M 200 140 C 200 140 195 150 195 155 C 195 158 197 160 200 160 C 203 160 205 158 205 155 C 205 150 200 140 200 140 Z" fill={isDark ? "#55e292" : "#3bc776"} opacity="0" />
        </g>
      </g>
    </svg>
  );
});
