import { useUserCredits } from "@/context/useUserCredits";
import DashboardLayout from "@/layout/DashboardLayout";
import { AlertCircle } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import UploadBox from "@/components/ui/UploadBox";
import { useApi } from "@/utils/api";
import { apiEndpoints } from "@/utils/apiEndpoints";

const Upload= () => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<'error' | 'success' | 'info' | ''>('');
    const { credits, setCredits } = useUserCredits();
    const MAX_FILES = 5;

    const { apiPrivate } = useApi();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length + files.length > MAX_FILES) {
            setMessage(`You can upload up to ${MAX_FILES} files.`);
            setMessageType('error');
            return;
        }

        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        setMessage('');
        setMessageType('')
    };

    const handleRemoveFile = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setMessage('');
        setMessageType('');
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setMessage('Please selet at least one file to upload');
            setMessageType('error');
            return;
        }

        if (files.length > MAX_FILES) {
            setMessage(`You can only upload a maximun of ${MAX_FILES} files at once`);
            setMessageType('error');
            return;
        }

        setUploading(true);
        setMessage('Uploading files...');
        setMessageType('info');

        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        try {
            const response = await apiPrivate.post(apiEndpoints.UPLOAD_FILE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data && response.data.remainingCredits !== undefined) {
                setCredits(response.data.remainingCredits);
            }

            setMessage('Files uploaded successfully');
            setMessageType('success');
            setFiles([]);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log('Error while deleting the file: ', err);
                setMessage('Error uploading files. Please try again');;
                setMessageType('error');
            } else {
                console.log('Unexpected error: ', err);
                setMessage('Error uploading files. Please try again');;
                setMessageType('error');
            }
        }finally{
            setUploading(false);
        }
    };

    const isUploadDisabled = files.length === 0 || files.length > MAX_FILES || credits <= 0 || files.length > credits;

    return (
        <DashboardLayout activeMenu="Upload">
            <div className="p-6">
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === 'error'
                            ? 'bg-red-50 text-red-700'
                            : messageType === 'success'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-blue-50 text-blue-700'
                            }`}
                    >
                        {messageType === 'error' && <AlertCircle size={20} />}
                        {message}
                    </div>
                )}

                <UploadBox
                    files={files}
                    onFileChange={handleFileChange}
                    onUpload={handleUpload}
                    onRemoveFile={handleRemoveFile}
                    uploading={uploading}
                    remainingCredits={credits}
                    isUploadDisabled={isUploadDisabled}
                />
            </div>
        </DashboardLayout>
    );
};

export default Upload;
