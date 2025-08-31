import Navbar from "@/components/ui/Navbar";
import SideMenu from "@/components/ui/SideMenu";
import { useUser } from "@clerk/clerk-react";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode
    activeMenu: string
}
const DashboardLayout = ({children, activeMenu} : DashboardLayoutProps) => {
    const {user} = useUser();

    return (
        <div>
            <Navbar activeMenu={activeMenu}/>
            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        {/* Sidemenu*/}
                        <SideMenu activeMenu={activeMenu}/>
                    </div>
                    <div className="grow mx-5">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout;