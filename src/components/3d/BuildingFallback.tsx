export default function BuildingFallback() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0D1420',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width="280"
        height="400"
        viewBox="0 0 280 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        opacity={0.7}
      >
        {/* Main facade */}
        <rect x="40" y="80" width="200" height="300" fill="#1A1814" stroke="#9C7C46" strokeWidth="0.5" />

        {/* Roof / mansard */}
        <rect x="30" y="55" width="220" height="30" fill="#1C2430" stroke="#9C7C46" strokeWidth="0.5" />
        {/* Dormer windows */}
        <rect x="70" y="42" width="28" height="20" fill="#1C2430" stroke="#9C7C46" strokeWidth="0.5" />
        <polygon points="70,42 84,30 98,42" fill="#1C2430" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="126" y="42" width="28" height="20" fill="#1C2430" stroke="#9C7C46" strokeWidth="0.5" />
        <polygon points="126,42 140,30 154,42" fill="#1C2430" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="182" y="42" width="28" height="20" fill="#1C2430" stroke="#9C7C46" strokeWidth="0.5" />
        <polygon points="182,42 196,30 210,42" fill="#1C2430" stroke="#9C7C46" strokeWidth="0.5" />
        {/* Chimneys */}
        <rect x="80" y="22" width="10" height="18" fill="#1C2430" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="190" y="22" width="10" height="18" fill="#1C2430" stroke="#9C7C46" strokeWidth="0.5" />

        {/* Floor cornices */}
        <line x1="40" y1="140" x2="240" y2="140" stroke="#9C7C46" strokeWidth="0.5" opacity="0.5" />
        <line x1="40" y1="200" x2="240" y2="200" stroke="#9C7C46" strokeWidth="0.5" opacity="0.5" />
        <line x1="40" y1="260" x2="240" y2="260" stroke="#9C7C46" strokeWidth="0.5" opacity="0.5" />
        <line x1="40" y1="320" x2="240" y2="320" stroke="#9C7C46" strokeWidth="0.5" opacity="0.5" />

        {/* Windows - floor 4 */}
        <rect x="75" y="95" width="35" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="122" y="95" width="36" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="170" y="95" width="35" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />

        {/* Windows - floor 3 */}
        <rect x="75" y="155" width="35" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="122" y="155" width="36" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="170" y="155" width="35" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />

        {/* Windows - floor 2 */}
        <rect x="75" y="215" width="35" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="122" y="215" width="36" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="170" y="215" width="35" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />

        {/* Windows - floor 1 */}
        <rect x="75" y="275" width="35" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="122" y="275" width="36" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="170" y="275" width="35" height="32" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />

        {/* Ground floor */}
        {/* Door arch */}
        <rect x="118" y="340" width="44" height="38" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        <path d="M118,340 Q140,318 162,340" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        {/* Pilastres */}
        <rect x="110" y="335" width="10" height="45" fill="#1A1814" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="160" y="335" width="10" height="45" fill="#1A1814" stroke="#9C7C46" strokeWidth="0.5" />
        {/* Side windows ground */}
        <rect x="65" y="338" width="35" height="40" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />
        <rect x="180" y="338" width="35" height="40" fill="#1C2A3A" stroke="#9C7C46" strokeWidth="0.5" />

        {/* Balcony lines floor 2 & 4 */}
        <line x1="38" y1="195" x2="242" y2="195" stroke="#9C7C46" strokeWidth="1" opacity="0.4" />
        <line x1="38" y1="315" x2="242" y2="315" stroke="#9C7C46" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  )
}
