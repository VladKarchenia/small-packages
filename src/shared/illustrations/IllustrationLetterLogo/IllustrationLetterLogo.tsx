import { BaseIllustration, IIllustrationProps } from "../Illustration"

export const IllustrationLetterLogo = ({ ...props }: IIllustrationProps) => (
  <BaseIllustration {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="167" height="100" fill="none">
      <path
        fill="var(--colors-brand-yellow-light)"
        d="M67.55.04h32v32h-32v-32ZM.28.04h32v32h-32v-32ZM134.82 67.66h32v32h-32v-32ZM32.28 99.66h-32v-32h32v32ZM67.55 67.66h32v32h-32v-32Z"
      />
      <path
        fill="var(--colors-brand-yellow-light)"
        d="M80.752 16.049h5.751v69.726h-5.75V16.05ZM13.478 16.049h5.75v69.726h-5.75V16.05Z"
      />
      <path
        fill="var(--colors-brand-yellow-light)"
        d="m18.39 14.006 67.269 67.62-4.067 4.087-67.27-67.62 4.067-4.087ZM85.661 14.008l67.27 67.619-4.067 4.087-67.27-67.619 4.067-4.087Z"
      />
    </svg>
  </BaseIllustration>
)
