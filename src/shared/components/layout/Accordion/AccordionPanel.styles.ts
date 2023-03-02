import { motion } from "framer-motion"

import { styled } from "@/stitches/config"

export const SAccordionPanel = styled(motion.div, {
  backgroundColor: "$system-white",
  overflow: "hidden",
})

export const SAccordionContent = styled("div", {
  paddingX: "$12",
  paddingY: "$24",
})
