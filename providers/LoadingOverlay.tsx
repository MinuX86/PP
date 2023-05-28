import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type LoadingOverlay = {
  isLoading: boolean;
  componentToRender: ReactNode;
  openOverlay: <T extends ReactNode>(
    c: T,
    size?: T extends string ? number | undefined : never,
    color?: T extends string ? string : never,
    nameToLog?: string
  ) => void;
  closeOverlay: () => void;
};

const LoadingOverlayContext = createContext<LoadingOverlay | null>(null);

export const LoadingOverlayProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState<string>();
  const [componentToRender, setComponentToRender] = useState<ReactNode>();

  const openOverlay = useCallback(
    <T extends ReactNode>(
      c: T,
      size?: T extends string ? number | undefined : never,
      color?: T extends string ? string : never,
      nameToLog?: string
    ) => {
      setIsLoading(true);
      if (nameToLog != null) {
        setLoadingLabel(nameToLog);
      }
      if (typeof c === "string") {
        setComponentToRender(
          //TODO: update defualt overlay UI
          <></>
        );
      } else {
        setComponentToRender(c);
      }
    },
    []
  );

  const closeOverlay = useCallback(() => {
    setIsLoading(false);
    setComponentToRender(undefined);
    if (loadingLabel) {
      setLoadingLabel(undefined);
    }
  }, [loadingLabel]);

  return (
    <LoadingOverlayContext.Provider
      value={{
        isLoading,
        componentToRender,
        openOverlay,
        closeOverlay,
      }}
    >
      {children}
    </LoadingOverlayContext.Provider>
  );
};

export const useLoadingOverlay = () => {
  const value = useContext(LoadingOverlayContext);
  if (value == null) {
    throw new Error("it should be wrapped with LoadingOverlayProvider");
  }
  return value;
};
