import React from "react";

export interface LogoProps {
  /** icon = pear mark, wordmark = text only, combined = pear + text */
  variant: "icon" | "wordmark" | "combined";
  theme: "dark" | "light";
  width?: number | string;
  height?: number | string;
}

const PearIcon: React.FC<{ theme: "dark" | "light"; id?: string }> = ({ theme, id = "" }) => {
  const isDark = theme === "dark";
  const gradId = `pearGrad${id}-${theme}`;
  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="30%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#d4ff47" : "#b8e600"} />
          <stop offset="45%" stopColor={isDark ? "#55e292" : "#3bc776"} />
          <stop offset="100%" stopColor={isDark ? "#1990ff" : "#0070dd"} />
        </linearGradient>
      </defs>

      {/* Leaves */}
      <path d="M 152 75 C 152 48 176 42 185 47 C 180 62 163 72 152 75 Z" fill={isDark ? "#d4ff47" : "#b8e600"} />
      <path d="M 148 75 C 148 48 124 42 115 47 C 120 62 137 72 148 75 Z" fill={isDark ? "#aaff2b" : "#8ecc00"} />

      {/* Pear body — flat silhouette */}
      <path
        d="M 150 75 C 165 75 175 95 180 118 C 185 142 212 152 212 182 C 212 212 184 232 150 232 C 116 232 88 212 88 182 C 88 152 115 142 120 118 C 125 95 135 75 150 75 Z"
        fill={`url(#${gradId})`}
      />

      {/* Whisper lines — subtle sound waves emanating from the pear */}
      <path
        d="M 222 155 C 232 145 232 175 222 165"
        fill="none"
        stroke={isDark ? "#00ffff" : "#0070dd"}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={isDark ? 0.6 : 0.5}
      />
      <path
        d="M 234 145 C 248 138 248 182 234 175"
        fill="none"
        stroke={isDark ? "#00ffff" : "#0070dd"}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={isDark ? 0.4 : 0.3}
      />
      <path
        d="M 246 137 C 264 128 264 192 246 183"
        fill="none"
        stroke={isDark ? "#00ffff" : "#0070dd"}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={isDark ? 0.25 : 0.2}
      />

      {/* Flat base ring — subtle ground shadow */}
      <ellipse
        cx="150"
        cy="236"
        rx="50"
        ry="8"
        fill={isDark ? "#00ffff" : "#0070dd"}
        opacity={isDark ? 0.15 : 0.1}
      />
    </g>
  );
};

const Wordmark: React.FC<{ theme: "dark" | "light"; x?: number; y?: number }> = ({
  theme,
  x = 0,
  y = 0,
}) => {
  const isDark = theme === "dark";
  const accentColor = isDark ? "#00ffff" : "#0070dd";
  const textColor = isDark ? "#ffffff" : "#121433";

  return (
    <text
      x={x}
      y={y}
      fontFamily="'Montserrat', 'Inter', 'Helvetica Neue', 'Segoe UI', sans-serif"
      fontSize="85"
      fontWeight="900"
      fill={textColor}
      letterSpacing="-2"
    >
      wis<tspan fill={accentColor}>p</tspan>ear<tspan fill={accentColor}>.ai</tspan>
    </text>
  );
};

const defaultSizes: Record<LogoProps["variant"], { w: number; h: number }> = {
  icon: { w: 140, h: 150 },
  wordmark: { w: 520, h: 100 },
  combined: { w: 800, h: 250 },
};

export const Logo: React.FC<LogoProps> = ({ variant, theme, width, height }) => {
  const w = width ?? defaultSizes[variant].w;
  const h = height ?? defaultSizes[variant].h;

  if (variant === "icon") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="70 35 200 215" width={w} height={h} role="img" aria-label={`Wispear logo (${theme})`}>
        <PearIcon theme={theme} id="icon" />
      </svg>
    );
  }

  if (variant === "wordmark") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 100" width={w} height={h} role="img" aria-label={`Wispear wordmark (${theme})`}>
        <Wordmark theme={theme} x={0} y={78} />
      </svg>
    );
  }

  // combined
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 250" width={w} height={h} role="img" aria-label={`Wispear logo with text (${theme})`}>
      <g transform="translate(20, 5)">
        <PearIcon theme={theme} id="combined" />
      </g>
      <Wordmark theme={theme} x={280} y={165} />
    </svg>
  );
};
