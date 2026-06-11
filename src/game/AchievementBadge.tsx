/** Inline SVG achievement badge icons — vectorized, no emoji. */

interface Props {
  icon: string;
  color: string;
  size?: number;
}

export function AchievementBadge({ icon, color, size = 20 }: Props) {
  const s = size;
  const half = s / 2;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ flexShrink: 0 }}>
      <circle cx={half} cy={half} r={half} fill={color} opacity={0.2} />
      {renderIcon(icon, s, color)}
    </svg>
  );
}

function renderIcon(icon: string, s: number, color: string) {
  const h = s / 2;

  switch (icon) {
    case "rose":
      // 5-petal flower
      return (
        <g transform={`translate(${h},${h})`}>
          {[0, 72, 144, 216, 288].map((angle) => (
            <circle
              key={angle}
              cx={0}
              cy={-s * 0.18}
              r={s * 0.14}
              fill={color}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx={0} cy={0} r={s * 0.1} fill="#ffeb3b" />
        </g>
      );

    case "backpack":
      // Bag shape
      return (
        <g>
          <rect x={s * 0.25} y={s * 0.15} width={s * 0.1} height={s * 0.2} rx={2} fill={color} />
          <rect x={s * 0.65} y={s * 0.15} width={s * 0.1} height={s * 0.2} rx={2} fill={color} />
          <rect x={s * 0.2} y={s * 0.3} width={s * 0.6} height={s * 0.55} rx={s * 0.08} fill={color} />
          <rect x={s * 0.3} y={s * 0.5} width={s * 0.4} height={s * 0.2} rx={2} fill="#5d4037" opacity={0.4} />
        </g>
      );

    case "lightning":
      // Bolt
      return (
        <polygon
          points={`${s * 0.55},${s * 0.1} ${s * 0.35},${s * 0.45} ${s * 0.5},${s * 0.45} ${s * 0.4},${s * 0.9} ${s * 0.65},${s * 0.5} ${s * 0.5},${s * 0.5}`}
          fill={color}
        />
      );

    case "clown":
      // Red nose
      return (
        <g>
          <circle cx={h} cy={h * 0.85} r={s * 0.22} fill={color} />
          <circle cx={s * 0.35} cy={s * 0.35} r={s * 0.06} fill="#333" />
          <circle cx={s * 0.65} cy={s * 0.35} r={s * 0.06} fill="#333" />
          <path
            d={`M${s * 0.3},${s * 0.7} Q${h},${s * 0.85} ${s * 0.7},${s * 0.7}`}
            stroke="#333"
            strokeWidth={1.5}
            fill="none"
          />
        </g>
      );

    case "ghost":
      // Ghost silhouette
      return (
        <g>
          <path
            d={`M${s * 0.3},${s * 0.85} L${s * 0.3},${s * 0.4} Q${s * 0.3},${s * 0.15} ${h},${s * 0.15} Q${s * 0.7},${s * 0.15} ${s * 0.7},${s * 0.4} L${s * 0.7},${s * 0.85} L${s * 0.6},${s * 0.75} L${h},${s * 0.85} L${s * 0.4},${s * 0.75} Z`}
            fill={color}
          />
          <circle cx={s * 0.4} cy={s * 0.4} r={s * 0.06} fill="#333" />
          <circle cx={s * 0.6} cy={s * 0.4} r={s * 0.06} fill="#333" />
        </g>
      );

    case "sacred":
      // Four-point star / sparkle
      return (
        <g>
          <polygon
            points={`${h},${s * 0.1} ${s * 0.57},${s * 0.43} ${s * 0.9},${h} ${s * 0.57},${s * 0.57} ${h},${s * 0.9} ${s * 0.43},${s * 0.57} ${s * 0.1},${h} ${s * 0.43},${s * 0.43}`}
            fill={color}
          />
          <circle cx={h} cy={h} r={s * 0.08} fill="#fff" opacity={0.6} />
        </g>
      );

    case "cat":
      // Tiny cat face — triangular ears, round head, dot eyes
      return (
        <g>
          <polygon points={`${s*0.25},${s*0.45} ${s*0.35},${s*0.2} ${s*0.45},${s*0.45}`} fill={color} />
          <polygon points={`${s*0.55},${s*0.45} ${s*0.65},${s*0.2} ${s*0.75},${s*0.45}`} fill={color} />
          <ellipse cx={h} cy={s*0.55} rx={s*0.28} ry={s*0.22} fill={color} />
          <circle cx={s*0.4} cy={s*0.52} r={s*0.05} fill="#1a1a2e" />
          <circle cx={s*0.6} cy={s*0.52} r={s*0.05} fill="#1a1a2e" />
          <ellipse cx={h} cy={s*0.62} rx={s*0.04} ry={s*0.025} fill="#ffaaaa" />
        </g>
      );

    default:
      return <circle cx={h} cy={h} r={s * 0.3} fill={color} />;
  }
}
