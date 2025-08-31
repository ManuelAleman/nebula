import DashboardLayout from "@/layout/DashboardLayout";
import { File, FileIcon, FileText, Grid, List, Music, Video, Image } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { FileMetadataDTO } from "@/types/files";
import FileCard from "@/components/files/FileCard";
import { useApi } from "@/utils/api";
import { apiEndpoints } from "@/utils/apiEndpoints";
import ConfirmationDialog from "@/components/modals/ConfirmationDialog";
import FileListRow from "@/components/files/FileListRow";
import LinkShareModal from "@/components/modals/LinkShareModal";
const MyFiles = () => {
    const [files, setFiles] = useState<FileMetadataDTO[]>([]);
    const [viewMode, setViewMode] = useState('list');
    const { apiPrivate } = useApi();
    const navigate = useNavigate();
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean, fileId: string | null }>({
        isOpen: false,
        fileId: null,
    });
    const [shareModal, setShareModal] = useState<{ isOpen: boolean, fileId: string | null, link: string }>({
        isOpen: false,
        fileId: null,
        link: ''
    })

    const fetchFiles = useCallback(async () => {
        try {
            const response = await apiPrivate.get(apiEndpoints.FETCH_FILES);
            if (response.status === 200) setFiles(response.data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error("Error fetching files: " + err.message);
            } else {
                toast.error("Unexpected error occurred");
            }
        }
    }, []);

    const togglePublic = async (fileToUpdate: FileMetadataDTO) => {
        try {
            await apiPrivate.patch(apiEndpoints.TOGGLE_PUBLIC(fileToUpdate.id));
            setFiles(
                files.map((file) =>
                    file.id === fileToUpdate.id
                        ? { ...file, isPublic: !file.isPublic }
                        : file
                )
            );
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log('Error toggling file status: ', err);
                toast.error('Error toggling file status: ' + err.message);
            } else {
                console.log('Unexpected error: ', err);
                toast.error('Unexpected error occurred');
            }
        }
    }

    const handleDownload = async (file: FileMetadataDTO) => {
        try {
            const response = await apiPrivate.get(apiEndpoints.DOWNLOAD_FILE(file.id), { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log('Download failed: ', err);
                toast.error('Error while downloading the file: ' + err.message);
            } else {
                console.log('Unexpected error: ', err);
                toast.error('Unexpected error occurred');
            }
        }
    }

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({
            isOpen: false,
            fileId: null
        })
    }

    const openDeleteConfirmation = (fileId: string) => {
        setDeleteConfirmation({
            isOpen: true,
            fileId
        })
    }

    const openShareModal = (fileId: string) => {
        const link = `${window.location.origin}/file/${fileId}`
        setShareModal({
            isOpen: true,
            fileId: fileId,
            link
        })
    }

    const closeShareModal = () => {
        setShareModal({
            isOpen: false,
            fileId: null,
            link: ''
        })
    }

    const handleDelete = async () => {
        const fileId = deleteConfirmation.fileId;
        if (!fileId) return;

        try {
            const response = await apiPrivate.delete(apiEndpoints.DELETE_FILE(fileId));
            if (response.status === 204) {
                setFiles(files.filter((file) => file.id != fileId));
                closeDeleteConfirmation();
            } else {
                toast.error('Error deleting file');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log('Error while deleting the file: ', err);
                toast.error('Error deleting file: ' + err.message);
            } else {
                console.log('Unexpected error: ', err);
                toast.error('Unexpected error occurred');
            }
        }
    }



    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);
    const getFileIcon = (file: FileMetadataDTO) => {
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (!extension) return <FileIcon size={24} className="text-gray-500" />;
        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) return <Image size={24} className="text-blue-500" />;
        if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension)) return <Video size={24} className="text-blue-500" />;
        if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) return <Music size={24} className="text-green-500" />;
        if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) return <FileText size={24} className="text-amber-500" />;

        return <FileIcon size={24} className="text-blue-500" />;
    };

    return (
        <DashboardLayout activeMenu="My Files">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My Files {files.length}</h2>
                    <div className="flex items-center gap-3">
                        <List
                            onClick={() => setViewMode('list')}
                            size={24}
                            className={`cursor-pointer transition-colors ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        />
                        <Grid
                            size={24}
                            onClick={() => setViewMode('grid')}
                            className={`cursor-pointer transition-colors ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        />
                    </div>
                </div>

                {files.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center jusitfy-center">
                        <File
                            size={60}
                            className="text-blue-300 mb-4"
                        />
                        <h3 className="text-xl font-medium text-gray-700 mb-2">
                            No files uploaded yet
                        </h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                            Start uploading files to see them listed here. you can upload
                            documents, images, and other files to share and manage them securely.
                        </p>
                        <button
                            onClick={() => navigate('/upload')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Go to upload
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {files.map((file) => (
                            <FileCard
                                key={file.id}
                                file={file}
                                onDownload={handleDownload}
                                onDelete={openDeleteConfirmation}
                                onTogglePublic={togglePublic}
                                onShareLink={openShareModal}
                                getFileIcon={getFileIcon}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sharing</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions  </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {files.map((file) => (
                                    <FileListRow
                                        key={file.id}
                                        file={file}
                                        onDownload={handleDownload}
                                        onDelete={openDeleteConfirmation}
                                        onTogglePublic={togglePublic}
                                        onShareLink={openShareModal}
                                        getFileIcon={getFileIcon}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <ConfirmationDialog
                    isOpen={deleteConfirmation.isOpen}
                    onClose={closeDeleteConfirmation}
                    title="Delete File"
                    message="Are you sure you want to delete this file? This action cannot be undonde."
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={handleDelete}
                    confirmationButtonClass="bg-red-600 hover:bg-red-700"
                />


                <LinkShareModal
                    isOpen={shareModal.isOpen}
                    onClose={closeShareModal}
                    link={shareModal.link}
                    title="Share File"
                />

            </div>
        </DashboardLayout>
    )
}

export default MyFiles;