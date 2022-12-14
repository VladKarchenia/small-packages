import { IIconProps, withIcon } from "../Icon"

const ClarityEye = withIcon(
  '<path d="M20 10s-3.75-6.875-10-6.875S0 10 0 10s3.75 6.875 10 6.875S20 10 20 10ZM1.466 10c.605-.919 1.3-1.774 2.075-2.554C5.15 5.835 7.35 4.375 10 4.375c2.65 0 4.849 1.46 6.46 3.071A16.42 16.42 0 0 1 18.535 10c-.073.109-.152.229-.244.36-.419.6-1.037 1.4-1.831 2.194-1.611 1.611-3.811 3.071-6.46 3.071-2.65 0-4.849-1.46-6.46-3.071A16.422 16.422 0 0 1 1.465 10h.001Z" fill="currentColor"/><path d="M10 6.875a3.125 3.125 0 1 0 0 6.25 3.125 3.125 0 0 0 0-6.25ZM5.625 10a4.375 4.375 0 1 1 8.75 0 4.375 4.375 0 0 1-8.75 0Z" fill="currentColor"/>',
)

export const IconClarityEye = (props: IIconProps) => (
  <ClarityEye dimensions={{ width: 20, height: 20 }} {...props} />
)
