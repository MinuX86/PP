import {
  PropsWithChildren,
  ReactNode,
  useState,
  createContext,
  useCallback,
  useContext,
} from "react";

type Modal = {
  isModalOpen: boolean;
  isModalClosing: boolean;
  componentToRender: ReactNode;
  openModal: (componentToRender: ReactNode, nameToLog?: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<Modal | null>(null);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [modalName, setModalName] = useState<string>();
  const [componentToRender, setComponentToRender] = useState<ReactNode>();

  const openModal = useCallback((c: ReactNode, nameToLog?: string) => {
    if (nameToLog) {
      setModalName(nameToLog);
    }
    setIsModalClosing(false);
    setIsModalOpen(true);
    setComponentToRender(c);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalClosing(true);

    setIsModalOpen(false);
    setComponentToRender(undefined);

    if (modalName) {
      setModalName(undefined);
    }
  }, [modalName]);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        isModalClosing,
        componentToRender,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const value = useContext(ModalContext);
  if (value == null) {
    throw new Error("it should be wrapped with ModalProvider");
  }
  return value;
};
