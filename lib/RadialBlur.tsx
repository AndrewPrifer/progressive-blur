import React from "react";

interface RadialBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number;
  steps?: number;
  falloffPercentage?: number;
  tint?: string;
}

function RadialBlur({
  strength = 64,
  steps = 8,
  falloffPercentage = 100,
  tint = "transparent",
  ...props
}: RadialBlurProps) {
  const actualSteps = Math.max(1, steps);
  const step = falloffPercentage / actualSteps;
  const factor = 0.5;
  const base = Math.pow(strength / factor, 1 / (actualSteps - 1));
  const centerPercentage = 100 - falloffPercentage;

  const getBackdropFilter = (i: number) =>
    `blur(${factor * base ** (actualSteps - i - 1)}px)`;

  return (
    <div
      {...props}
      style={{
        // This has to be set on the top level element to prevent pointer events
        pointerEvents: "none",
        ...props.style,
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(
            closest-side,
            rgb(from ${tint} r g b / alpha) 0%,
            rgb(from ${tint} r g b / 0%) 100%
          )`,
        }}
      >
        {/* Center starts at 100-falloffPercentage% */}
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            inset: 0,
            mask: `radial-gradient(
                  closest-side,
                  rgba(0, 0, 0, 1) ${centerPercentage}%,
                  rgba(0, 0, 0, 0) ${centerPercentage + step}%
                )`,
            backdropFilter: getBackdropFilter(0),
            WebkitBackdropFilter: getBackdropFilter(0),
          }}
        />
        {actualSteps > 1 && (
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              inset: 0,
              mask: `radial-gradient(
                  closest-side,
                  rgba(0, 0, 0, 1) ${centerPercentage}%,
                  rgba(0, 0, 0, 1) ${centerPercentage + step}%,
                  rgba(0, 0, 0, 0) ${centerPercentage + step * 2}%
                )`,
              backdropFilter: getBackdropFilter(1),
              WebkitBackdropFilter: getBackdropFilter(1),
            }}
          />
        )}
        {actualSteps > 2 &&
          Array.from({ length: actualSteps - 2 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                zIndex: i + 2,
                inset: 0,
                mask: `radial-gradient(
                    closest-side,
                    rgba(0, 0, 0, 0) ${centerPercentage + i * step}%,
                    rgba(0, 0, 0, 1) ${centerPercentage + (i + 1) * step}%,
                    rgba(0, 0, 0, 1) ${centerPercentage + (i + 2) * step}%,
                    rgba(0, 0, 0, 0) ${centerPercentage + (i + 3) * step}%
                  )`,
                backdropFilter: getBackdropFilter(i + 2),
                WebkitBackdropFilter: getBackdropFilter(i + 2),
              }}
            />
          ))}
      </div>
    </div>
  );
}

export { RadialBlur };
