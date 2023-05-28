import ReactDOM from "react-dom";
import { useLoadingOverlay } from "@providers";
import React from "react";

const LoadingOverlay = (): JSX.Element | null => {
  const { componentToRender } = useLoadingOverlay();

  const loadingOverlayPortalRoot = document.getElementById(
    "loading-overlay-portal-root"
  );

  if (loadingOverlayPortalRoot == null) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center flex-col z-130">
      <div>{componentToRender}</div>
    </div>,
    loadingOverlayPortalRoot
  );
};

export default LoadingOverlay;
