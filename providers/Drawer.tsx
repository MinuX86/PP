import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type DrawerState = "open" | "closing" | "closed";
type DrawerContainer = {
  drawerState: DrawerState;
  componentToRender: ReactNode;
  drawerName: string | undefined;
  openDrawer: (
    componentToRender: React.ReactNode,
    nameToLog?: string,
    shouldForceOpen?: boolean
  ) => void;
  closeDrawer: () => void;
  unmountDrawer: () => void;
};

const DrawerContext = createContext<DrawerContainer | null>(null);

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [drawerState, setDrawerState] = useState<DrawerState>("closed");
  const [drawerName, setDrawerName] = useState<string>();
  const [componentToRender, setComponentToRender] = useState<ReactNode>();

  const isDrawerOpen = useRef(false);

  const openDrawer = useCallback(
    /** shouldForceOpen flag allows for opening a Drawer from within another Drawer.
     * Use this to circumvent isDrawerOpen ref which is used to prevent Drawers
     * unintentionally overriding each other.
     */
    (c: ReactNode, nameToLog?: string, shouldForceOpen?: boolean) => {
      if (!isDrawerOpen.current || shouldForceOpen) {
        if (nameToLog) {
          setDrawerName(nameToLog);
        }
        setDrawerState("open");
        setComponentToRender(c);

        isDrawerOpen.current = true;
      }
    },
    []
  );

  const closeDrawer = useCallback(() => {
    if (isDrawerOpen.current) {
      setDrawerState("closing");
      isDrawerOpen.current = false;
    }
  }, []);

  const unmountDrawer = useCallback(() => {
    setDrawerState("closed");
    setComponentToRender(undefined);

    if (drawerName) {
      setDrawerName(undefined);
    }
  }, [drawerName]);

  return (
    <DrawerContext.Provider
      value={{
        drawerState,
        componentToRender,
        drawerName,
        openDrawer,
        closeDrawer,
        unmountDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const value = useContext(DrawerContext);
  if (value == null) {
    throw new Error("it should be wrapped with DrawerProvider");
  }
  return value;
};
