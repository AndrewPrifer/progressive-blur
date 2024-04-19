# Progressive Blur

Drop-in progressive (gradient) backdrop blur for React. Both radial and linear gradients are supported.

## Installation

```bash
yarn add progressive-blur
```

## Usage

```tsx
import { RadialBlur, LinearBlur } from "progressive-blur";

const App = () => (
  <div>
    <RadialBlur
      // The resolution of the blur. Higher values will result in a more detailed blur, but will be more computationally expensive. Default is 8.
      steps={8}
      // The blur radius of the blur in pixels at the peak of the gradient. Default is 64.
      strength={64}
      // How much of the blur is falloff. 0 means no falloff, 100 means the entire blur is falloff. Default is 100.
      falloffPercentage={100}
      // The tint applied to the blur. This can be any valid CSS color. Default is transparent.
      tint="rgba(0, 0, 0, 0.1)"
      // You can pass any div props to the component. Useful for positioning.
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
      }}
    />
    <LinearBlur
      // Same props as RadialBlur, but with an additional side prop that specifies the direction of the gradient and the transform origin so it's easy to scale in the right direction. Default is "top".
      side="top"
    />
  </div>
);
```
