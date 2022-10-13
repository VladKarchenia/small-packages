import React, { useEffect, useState } from "react";

export type TabsContextValue = {
  selected: string;
  items: string[];

  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setItems: React.Dispatch<React.SetStateAction<string[]>>;

  animate?: boolean;
};

export const TabsContext = React.createContext<TabsContextValue>(
  {} as TabsContextValue
);

export const useTabsContext = () => {
  return React.useContext(TabsContext);
};

export interface ITabsProviderProps {
  selectedTab?: string;
  onChange?: (value: string) => void;
  animate?: boolean;
}

export const TabsProvider: React.FC<
  React.PropsWithChildren<ITabsProviderProps>
> = ({ children, selectedTab = "", onChange, animate = true }) => {
  const [selected, setSelected] = useState<string>(selectedTab);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (items.length && !selected) {
      setSelected(items[0]);
    }
  }, [items, selected]);

  useEffect(() => {
    if (selected && onChange) {
      onChange(selected);
    }
  }, [selected]);

  useEffect(() => {
    setSelected(selectedTab);
  }, [selectedTab]);

  return (
    <TabsContext.Provider
      value={{
        selected,
        items,

        setSelected,
        setItems,

        animate,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
