import React, { useRef, useEffect } from 'react';
import Modal from '@/components/modals/Modal';
import { Check, Copy } from 'lucide-react';

interface LinkShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    link: string;
    title?: string;
}

const LinkShareModal = ({
    isOpen,
    onClose,
    link,
    title = "Share Link"
}: LinkShareModalProps) => {
    const [copied, setCopied] = React.useState(false);
    const linkInputRef = useRef<HTMLInputElement>(null);

    // Reset copied state when modal is opened or closed
    useEffect(() => {
        setCopied(false);

        // Focus and select the link input when the modal is opened
        if (isOpen && linkInputRef.current) {
            setTimeout(() => {
                linkInputRef.current!.focus();
                linkInputRef.current!.select();
            }, 100);
        }
    }, [isOpen]);

    const handleCopyLink = () => {
        if (linkInputRef.current) {
            linkInputRef.current.select();
            navigator.clipboard.writeText(link).then(() => {
                setCopied(true);
                // Reset copied state after 2 seconds
                setTimeout(() => setCopied(false), 2000);
            }).catch(err => {
                console.error('Failed to copy link: ', err);
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            confirmText={copied ? "Copied!" : "Copy"}
            cancelText="Close"
            onConfirm={handleCopyLink}
            confirmButtonClass={copied ? "bg-green-600 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-600"}
            size="md"
        >
            <div className="space-y-4">
                <p className="text-gray-600">
                    Share this link with others to give them access to this file:
                </p>
                <div className="flex items-center gap-2">
                    <input
                        ref={linkInputRef}
                        type="text"
                        value={link}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        onClick={handleCopyLink}
                        className={`p-2 rounded-md ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        title={copied ? "Copied!" : "Copy to clipboard"}
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                </div>
                {copied && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                        <Check size={16} />
                        Link copied to clipboard!
                    </p>
                )}
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Anyone with this link can access this file.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default LinkShareModal;
