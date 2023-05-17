export const spaceAndEnterKeyDown = (key: string) => {
  switch (key) {
    case "Enter":
    case " ":
      return true
    default:
      return false
  }
}
