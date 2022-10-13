import { IIconProps } from "./Icon";

export function getIconRotation(direction: IIconProps["direction"]) {
  switch (direction) {
    case "top":
      return 270;

    case "bottom":
      return 90;

    case "left":
      return 180;

    case "right":
    default:
      return 0;
  }
}
