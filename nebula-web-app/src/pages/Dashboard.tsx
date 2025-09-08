
import DashboardLayout from "@/layout/DashboardLayout";
import RecentFiles from "@/components/dashboard/RecentFiles";
import { useApi } from "@/utils/api";
import { apiEndpoints } from "@/utils/apiEndpoints";
import { useEffect, useState } from "react";
import type { FileMetadataDTO } from "@/types/files";

const Dashboard = () => {
    const { apiPrivate, token } = useApi();
    const [recentFiles, setRecentFiles] = useState<FileMetadataDTO[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await apiPrivate.get(apiEndpoints.FETCH_FILES);
                if (response.status === 200) {
                    setRecentFiles(response.data.slice(0, 5));
                }
            } catch (err) {}
        };
        fetchFiles();
    }, [token]);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="max-w-3xl mx-auto py-10 px-4 md:px-0">
                <div className="flex items-center gap-3 mb-8">
                    <span className="inline-flex items-center justify-center rounded-full bg-blue-100 p-2">
                        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 15V7a5 5 0 0110 0v8" /></svg>
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-500 to-amber-500 bg-clip-text text-transparent animate-gradient-x">
                        Welcome to your Nebula
                    </h1>
                </div>
                <h2 className="text-xl font-bold mb-6 text-gray-900">Recent Files</h2>
                <RecentFiles files={recentFiles} />
            </div>
            <style>{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 4s ease-in-out infinite; }
            `}</style>
        </DashboardLayout>
    );
};

export default Dashboard;
