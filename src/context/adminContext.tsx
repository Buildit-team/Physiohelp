import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "react-query";
import { getAdmin } from "../admin/services/api-service";

interface AdminContextType {
    adminData: any;
    isLoading: boolean;
    error: any;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, error } = useQuery("user", () => getAdmin());

    return (
        <AdminContext.Provider value={{ adminData: data?.data, isLoading, error }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdminContext must be used within an AdminProvider");
    }
    return context;
};