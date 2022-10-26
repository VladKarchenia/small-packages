import {
  AccordionButton,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@/shared/components"
import { IStep } from "@/shared/state"

export const StepperItem = ({
  title,
  data,
  content,
}: {
  title: string
  data?: IStep
  content: React.ReactNode
}) => {
  return (
    <AccordionItem value={data?.name || ""} disabled={data?.disabled}>
      <AccordionHeader scale={4} thin>
        <AccordionButton
          size="large"
          compact
          css={{
            padding: "$32",

            hover: {
              backgroundColor: "$system-white",
            },
          }}
        >
          {title}
        </AccordionButton>
      </AccordionHeader>
      <AccordionPanel contentCss={{ padding: "$32" }}>{content}</AccordionPanel>
    </AccordionItem>
  )
}
