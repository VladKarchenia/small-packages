import { motion } from "framer-motion";

import { styled } from "@/config";

export const SAccordionPanel = styled(motion.div, {
  backgroundColor: "$neutrals-0",
  overflow: "hidden",
});

export const SAccordionContent = styled("div", {
  paddingX: "$12",
  paddingY: "$24",
});
