import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";

interface AppModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}
export default function AppModal({
  onClose,
  isOpen,
  children,
  className,
}: AppModalProps) {
  return (
    <React.Fragment>
      <Modal
        className={className}
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isOpen}
        onClose={onClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          {children}
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
