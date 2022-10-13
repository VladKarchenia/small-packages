import { BaseIllustration, IIllustrationProps } from "../Illustration";

export const IllustrationLogo = ({ ...props }: IIllustrationProps) => (
  <BaseIllustration {...props}>
    <svg
      width="40"
      height="30"
      viewBox="0 0 40 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.4246 12.2136V12.1368L29.297 7.54103L19.3231 13.6687C20.8716 15.3138 22.9277 16.2955 25.1043 16.429C29.629 16.7501 33.8022 14.59 36.5919 10.8457C37.1236 10.118 37.5891 9.33744 37.9819 8.51462C38.4734 7.50962 40.228 4.12821 39.9741 3.31862C39.603 2.13914 34.4402 1.32607 33.2586 1.15508C27.1193 0.244294 19.6193 1.33654 17.9526 9.07296C17.8734 9.45054 17.8492 9.839 17.881 10.2245L17.5359 10.4688L17.2104 10.2141C17.2737 9.94613 17.3033 9.67033 17.2983 9.394C17.1453 2.71841 11.1395 0.460649 5.94414 0.0907525C4.94479 0.0209607 0.563282 -0.244248 0.075001 0.659556C-0.263541 1.27721 0.651173 4.37946 0.895314 5.29722C1.09015 6.04543 1.35064 6.77219 1.67331 7.46774C2.48649 9.24685 3.69315 10.7858 5.18816 11.9505C6.68317 13.1153 8.42119 13.8705 10.2508 14.1503C12.0686 14.4361 13.9211 13.9992 15.4591 12.922L8.20977 6.0754L16.0223 11.5366V11.5959C16.644 13.9305 16.5366 17.3119 15.9344 20.1384L19.0626 21.2865C18.4116 18.6693 17.6271 14.8203 18.4116 12.2136H18.4246Z"
        fill="#338032"
        fillRule="evenodd"
      />
      <path
        d="M3.23242 28.0807C2.44791 28.1191 1.875 29.3126 2.14843 30.0105H31.7253C31.4626 29.3091 31.0338 28.6932 30.4811 28.2238C29.9285 27.7544 29.2712 27.4477 28.5742 27.334C28.1901 23.0836 24.3164 21.5657 21.4616 23.1953C22.5325 20.0093 20.2572 19.3358 18.6361 19.8139C17.8223 18.7391 14.7298 19.5941 14.6322 21.5308C10.8138 18.767 7.1875 21.0597 7.5651 24.9645C6.27929 24.1689 3.13476 24.6435 3.23242 28.0807V28.0807Z"
        fill="#432a16"
        fillRule="evenodd"
      />
    </svg>
  </BaseIllustration>
);
