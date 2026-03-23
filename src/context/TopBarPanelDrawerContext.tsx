import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type TopBarPanelDrawerContextValue = {
  /** True when STATUS / FUGLENE / OM panel drawer is open (not the mobile nav list). */
  isTopBarPanelOpen: boolean;
  setTopBarPanelOpen: (open: boolean) => void;
};

const TopBarPanelDrawerContext =
  createContext<TopBarPanelDrawerContextValue | null>(null);

export function TopBarPanelDrawerProvider({ children }: { children: ReactNode }) {
  const [isTopBarPanelOpen, setTopBarPanelOpen] = useState(false);
  const value = useMemo(
    () => ({ isTopBarPanelOpen, setTopBarPanelOpen }),
    [isTopBarPanelOpen, setTopBarPanelOpen],
  );
  return (
    <TopBarPanelDrawerContext.Provider value={value}>
      {children}
    </TopBarPanelDrawerContext.Provider>
  );
}

export function useTopBarPanelDrawer() {
  const ctx = useContext(TopBarPanelDrawerContext);
  if (!ctx) {
    throw new Error(
      "useTopBarPanelDrawer must be used within TopBarPanelDrawerProvider",
    );
  }
  return ctx;
}
