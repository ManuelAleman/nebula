import Modal from "./Modal";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    confirmationButtonClass?: string;
}

const ConfirmationDialog = ({
    isOpen,
    onClose,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    confirmationButtonClass = "bg-red-600 hover:bg-red-700",
}: ConfirmationDialogProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            confirmText={confirmText}
            cancelText={cancelText}
            onConfirm={onConfirm}
            confirmButtonClass={confirmationButtonClass}
            size="sm"
        >
            <p className="text-gray-600">{message}</p>
        </Modal>
    );
}

export default ConfirmationDialog;