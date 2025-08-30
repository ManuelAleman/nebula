import type { FileMetadataDTO } from "@/types/files";
import { useState, type ReactNode } from "react";
import { Copy, Download, Eye, Globe, Lock, Trash2 } from 'lucide-react'
interface FileCardProps {
    file: FileMetadataDTO
    onDownload: (file: FileMetadataDTO) => void;
    onDelete: (fileId: string) => void;
    onTogglePublic: (file: FileMetadataDTO) => void;
    onShareLink: (fileId: string) => void;
    getFileIcon: (file: FileMetadataDTO) => ReactNode;
}
const FileCard = ({ file, onDownload, onDelete, onTogglePublic, onShareLink, getFileIcon }: FileCardProps) => {
    const [showActions, setShowActions] = useState(false);

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }
    return (
        <div
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            {/* File preview area */}
            <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                {getFileIcon(file)}
            </div>
            {/* Public/private badge */}
            <div className="absolute top-2 right-2">
                <div className={`rounded-full p-1.5 ${file.isPublic ? 'bg-green-100' : 'bg-gray-100'}`} title={file.isPublic ? 'Public' : 'Private'}>
                    {file.isPublic ? (
                        <Globe size={14} className="text-green-600" />
                    ) : (
                        <Lock size={14} className="text-gray-600" />
                    )}
                </div>
            </div>
            {/* File info */}
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div className="overflow-hidden">
                        <h3 title={file.name} className="font-medium text-gray-900 truncate">
                            {file.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {formatFileSize(file.size)} . {formatDate(file.uploadedAt)}
                        </p>
                    </div>
                </div>
            </div>
            {/* Action buttons */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end justify-center p-4 transition-opacity duration-300 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex gap-3 w-full justify-center">
                    {file.isPublic && (
                        <button
                            onClick={() => onShareLink(file.id)}
                            title="Share Link"
                            className="p-2 cursor-pointer bg-white/90 rounded-full hover:bg-white transition-colors text-blue-500 hover:text-blue-600">
                            <Copy size={18} />
                        </button>
                    )}

                    {file.isPublic && (
                        <a href={`/files/${file.id}`} title='View File' target="_blank" rel="noreferrer" className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-gray-700 hover:text-gray-900">
                            <Eye size={18} />
                        </a>
                    )}
                    <button
                        onClick={() => onDownload(file)}
                        title="Download"
                        className="p-2 bg-white/90 rounded-full hover:bg-white cursor-pointer transition-colors text-green-600 hover:text-green-700">
                        <Download size={18} />
                    </button>

                    <button
                        onClick={() => onTogglePublic(file)}
                        title={file.isPublic ? 'Make Private' : 'Make Public'}
                        className="p-2 bg-white/90 rounded-full hover:bg-white cursor-pointer transition-colors text-amber-600 hover:text-amber-700">
                        {file.isPublic ? <Lock size={18} /> : <Globe size={18} />}
                    </button>

                    <button
                        onClick={() => onDelete(file.id)}
                        title="Delete"
                        className="p-2 bg-white/90 rounded-full hover:bg-white cursor-pointer transition-colors text-red-600 hover:text-red-700">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FileCard;