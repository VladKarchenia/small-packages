import { BaseIllustration, IIllustrationProps } from "../Illustration"

export const IllustrationSpinner = ({ ...props }: IIllustrationProps) => (
  <BaseIllustration {...props}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7.33331" width="1.33333" height="4" rx="0.666667" fill="var(--colors-theme-b-ypl)" />
      <rect
        x="7.33331"
        y="12"
        width="1.33333"
        height="4"
        rx="0.666667"
        fill="var(--colors-theme-n5-yp)"
      />
      <rect
        y="8.66699"
        width="1.33333"
        height="4"
        rx="0.666667"
        transform="rotate(-90 0 8.66699)"
        fill="var(--colors-theme-n5-yp)"
      />
      <rect
        x="12"
        y="8.66699"
        width="1.33333"
        height="4"
        rx="0.666667"
        transform="rotate(-90 12 8.66699)"
        fill="var(--colors-theme-n5-yp)"
      />
      <rect
        x="1.87173"
        y="2.81445"
        width="1.33333"
        height="4"
        rx="0.666667"
        transform="rotate(-45 1.87173 2.81445)"
        fill="var(--colors-theme-n5-yp)"
      />
      <rect
        x="10.3568"
        y="11.2998"
        width="1.33333"
        height="4"
        rx="0.666667"
        transform="rotate(-45 10.3568 11.2998)"
        fill="var(--colors-theme-n5-yp)"
      />
      <rect
        x="2.81445"
        y="14.1279"
        width="1.33333"
        height="4"
        rx="0.666667"
        transform="rotate(-135 2.81445 14.1279)"
        fill="var(--colors-theme-n5-yp)"
      />
      <rect
        x="11.2993"
        y="5.64258"
        width="1.33333"
        height="4"
        rx="0.666667"
        transform="rotate(-135 11.2993 5.64258)"
        fill="var(--colors-theme-n5-yp)"
      />
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur=".6s"
        repeatCount="indefinite"
        calcMode="discrete"
        values="0; 45; 90; 135; 180; 225; 270; 315"
      />
    </svg>
  </BaseIllustration>
)
