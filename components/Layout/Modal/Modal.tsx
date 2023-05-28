import { useModal } from "@providers";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = () => {
  const { componentToRender, isModalClosing } = useModal();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    let animationContext: (() => gsap.core.Timeline) | undefined;

    if (!isModalClosing) {
      animationContext = () => {
        const timeline = gsap.timeline();

        timeline
          .fromTo(
            containerElement,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
          )
          .fromTo(
            containerElement.children as HTMLCollectionOf<HTMLElement>,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
            0.2
          );

        return timeline;
      };
    } else {
      animationContext = () => {
        const timeline = gsap.timeline();

        timeline
          .to(containerElement.children as HTMLCollectionOf<HTMLElement>, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: "power2.in",
          })
          .to(
            containerElement,
            { opacity: 0, duration: 0.3, ease: "power2.in" },
            0.1
          );

        return timeline;
      };
    }

    const animation = animationContext();

    return () => {
      animation.kill();
    };
  }, [isModalClosing]);

  const modalPortalRoot = document.getElementById("modal-portal-root");
  if (modalPortalRoot == null) {
    return null;
  }

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full z-50  backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
      <div className="fixed inset-0 opacity-25 blur-lg" />
      <div className="modal-content" ref={containerRef}>
        {componentToRender}
      </div>
    </div>,
    modalPortalRoot
  );
};

export default Modal;
