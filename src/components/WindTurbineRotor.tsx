'use client';

import React from 'react';

interface WindTurbineRotorProps {
  /** CSS animation duration, e.g. "10s" */
  duration?: string;
  /** CSS animation delay (negative for mid-cycle start), e.g. "-3s" */
  delay?: string;
  /** Extra Tailwind or inline classes for the outer wrapper */
  className?: string;
  /** Opacity for distant/background turbines */
  opacity?: number;
  /** 3D Yaw angle (rotation around Y-axis in degrees) */
  yaw?: number;
  /** 3D Pitch angle (rotation around X-axis in degrees) */
  pitch?: number;
  /** Unique id suffix to avoid SVG gradient collisions */
  id: string;
}

/**
 * A photorealistic 3D Wind Turbine Rotor.
 * Uses genuine 3D perspective transforms combined with multi-stop aerodynamic
 * blade shading, specular highlights, root collar fillets, and a 3D bullet spinner.
 */
export const WindTurbineRotor: React.FC<WindTurbineRotorProps> = ({
  duration = '11s',
  delay = '0s',
  className = '',
  opacity = 1,
  yaw = 0,
  pitch = 0,
  id,
}) => {
  const bladeGradId = `wt-blade-${id}`;
  const bladeShineId = `wt-shine-${id}`;
  const bladeShadowId = `wt-shadow-${id}`;
  const spinnerGradId = `wt-spinner-${id}`;
  const ringGradId = `wt-ring-${id}`;

  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        opacity,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Orientation wrapper giving the turbine its realistic viewing angle */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${yaw}deg) rotateX(${pitch}deg)`,
        }}
      >
        {/* Continuously spinning rotor group */}
        <div
          style={{
            width: '100%',
            height: '100%',
            animation: `spin ${duration} linear infinite`,
            animationDelay: delay,
            transformOrigin: '50% 50%',
            willChange: 'transform',
          }}
        >
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
            aria-hidden="true"
          >
            <defs>
              {/* 3D Aerofoil Blade Surface Gradient */}
              <linearGradient id={bladeGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#F5F8F6" />
                <stop offset="60%" stopColor="#E2ECE4" />
                <stop offset="90%" stopColor="#CBD8CE" />
                <stop offset="100%" stopColor="#B4C4B8" />
              </linearGradient>

              {/* Specular Highlight along blade leading edge */}
              <linearGradient id={bladeShineId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
              </linearGradient>

              {/* Soft Ambient Depth Shadow along blade trailing edge */}
              <linearGradient id={bladeShadowId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.0" />
                <stop offset="70%" stopColor="#000000" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.14" />
              </linearGradient>

              {/* 3D Spinner Nose Cone Radial Gradient */}
              <radialGradient id={spinnerGradId} cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#EFF5F1" />
                <stop offset="75%" stopColor="#BDCDC1" />
                <stop offset="100%" stopColor="#829787" />
              </radialGradient>

              {/* Red Accent Trim Ring (as seen on clean reference turbines) */}
              <linearGradient id={ringGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E05252" />
                <stop offset="100%" stopColor="#A82828" />
              </linearGradient>
            </defs>

            {/* Three aerofoil blades pre-rotated at 0°, 120°, 240° around center (100, 100) */}
            {[0, 120, 240].map((deg) => (
              <g key={deg} transform={`rotate(${deg}, 100, 100)`}>
                {/* Root attachment collar */}
                <rect
                  x="97"
                  y="87"
                  width="6"
                  height="7"
                  rx="2"
                  fill="#CCD8CF"
                  opacity="0.85"
                />

                {/* Main Aerofoil Blade Body: tapered, aerodynamic modern wind-turbine contour */}
                <path
                  d="
                    M 97.2 88
                    C 95.0 72, 93.2 56, 95.5 38
                    C 97.0 24, 98.6 14, 99.4 6.5
                    C 99.8 4.8, 100.2 4.8, 100.6 6.5
                    C 101.4 14, 103.0 24, 104.5 38
                    C 106.8 56, 105.0 72, 102.8 88
                    Z
                  "
                  fill={`url(#${bladeGradId})`}
                />

                {/* Leading Edge Specular Highlight */}
                <path
                  d="
                    M 97.2 88
                    C 95.0 72, 93.2 56, 95.5 38
                    C 97.0 24, 98.6 14, 99.4 6.5
                    C 99.8 4.8, 100.2 4.8, 100.6 6.5
                    C 101.4 14, 103.0 24, 104.5 38
                    C 106.8 56, 105.0 72, 102.8 88
                    Z
                  "
                  fill={`url(#${bladeShineId})`}
                />

                {/* Trailing Edge Shadow for true 3D curvature */}
                <path
                  d="
                    M 97.2 88
                    C 95.0 72, 93.2 56, 95.5 38
                    C 97.0 24, 98.6 14, 99.4 6.5
                    C 99.8 4.8, 100.2 4.8, 100.6 6.5
                    C 101.4 14, 103.0 24, 104.5 38
                    C 106.8 56, 105.0 72, 102.8 88
                    Z
                  "
                  fill={`url(#${bladeShadowId})`}
                />
              </g>
            ))}

            {/* Red Accent Trim Ring at Hub Base */}
            <circle cx="100" cy="100" r="10.5" fill={`url(#${ringGradId})`} opacity="0.9" />

            {/* Central Streamlined Spinner Cap (Nose Cone) */}
            <circle cx="100" cy="100" r="9" fill={`url(#${spinnerGradId})`} />

            {/* Specular Highlight Glint on Nose Cone */}
            <circle cx="96.8" cy="96.5" r="3" fill="#FFFFFF" opacity="0.8" />
          </svg>
        </div>
      </div>
    </div>
  );
};
