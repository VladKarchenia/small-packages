import { BaseIllustration, IIllustrationProps } from "../Illustration"

export const IllustrationLogo = ({ theme = "light", ...props }: IIllustrationProps) => (
  <BaseIllustration {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="209" height="30" fill="none">
      <path
        fill={theme === "light" ? "var(--colors-neutrals-0)" : "var(--colors-neutrals-12)"}
        d="M56.32 9.663v19.27h3.767V13.517h6.859v15.416h3.768V13.517l-3.768-3.854H56.319ZM70.714 9.663v3.854h6.859v15.416h3.768V13.517l-3.768-3.854h-6.859ZM86.398 9.663v3.854h14.094v3.584H89.036l-3.768 3.854v4.124l3.768 3.854h15.225V13.517l-3.769-3.854H86.398Zm14.094 15.416H89.036v-4.124h11.456v4.124ZM171.883 9.663l-3.768 3.854V25.08l3.768 3.854h14.094v-3.854h-14.094v-3.584h15.225v-7.978l-3.769-3.854h-11.456Zm11.456 7.978h-11.456v-4.124h11.456v4.124ZM108.289 9.663v3.854h3.769V25.08h-3.769v3.854h12.436v-3.854h-4.899V13.517h7.047v3.854h3.769v-3.854l-3.769-3.854h-14.584ZM204.97 9.663h-14.583v3.854h3.769V25.08h-3.769v3.854h12.435v-3.854h-4.898V13.517h7.046v3.854h3.769v-3.854l-3.769-3.854ZM144.996 9.663v19.27h3.769V13.517h11.456v15.416h3.768V13.517l-3.768-3.854h-15.225ZM137.227 9.663h-7.462v3.854h3.694V25.08h-4.9v3.854h13.567v-3.854h-4.899V9.663ZM137.227 3.882h-3.768v3.854h3.768V3.882Z"
      />
      <path
        fill={theme === "light" ? "var(--colors-brand-yellow-light)" : "var(--colors-neutrals-12)"}
        d="M28.29.267h-9.006v9.21h9.006V.268ZM47.312.267h-9.006v9.21h9.006V.268ZM9.267 19.722H.26v9.211h9.007v-9.211ZM38.306 28.933h9.007v-9.211h-9.007v9.211ZM28.29 19.722h-9.006v9.211h9.006v-9.211Z"
      />
      <path
        fill={theme === "light" ? "var(--colors-brand-yellow-light)" : "var(--colors-neutrals-12)"}
        d="M24.6 4.872h-1.626v20.062H24.6V4.872ZM43.623 4.872h-1.626v20.062h1.626V4.872Z"
      />
      <path
        fill={theme === "light" ? "var(--colors-brand-yellow-light)" : "var(--colors-neutrals-12)"}
        d="M42.234 4.284 23.211 23.74l1.15 1.176L43.384 5.46l-1.15-1.176ZM23.212 4.285 4.189 23.74l1.15 1.176L24.36 5.46l-1.15-1.176Z"
      />
    </svg>
  </BaseIllustration>
)
