import { useTabsContext } from "./state"

export const useTabs = () => {
  const { items, setItems, selected, setSelected } = useTabsContext()

  const getSelectedIndex = () => {
    return items.indexOf(selected)
  }

  const getNextItem = () => {
    const index = getSelectedIndex()
    if (index >= 0) {
      const next = index === items.length - 1 ? items[0] : items[index + 1]
      setSelected(next)
    }
  }

  const getPreviousItem = () => {
    const index = getSelectedIndex()
    if (index >= 0) {
      const previous = index === 0 ? items[items.length - 1] : items[index - 1]
      setSelected(previous)
    }
  }

  const getStartItem = () => {
    setSelected(items[0])
  }

  const getEndItem = () => {
    setSelected(items[items.length - 1])
  }

  return {
    getNextItem,
    getPreviousItem,
    getStartItem,
    getEndItem,
    setItems,
  }
}
