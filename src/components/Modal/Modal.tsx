import React from "react";
import { ModalOverlay, ModalContent,CloseButton } from "./styles.ts";
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <ModalOverlay className="modal-overlay">
      <ModalContent className="modal-content">
        <div className="btn-close">
          <CloseButton onClick={onClose} className="close-button">
            X
          </CloseButton>
        </div>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
