import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import type { ReactElement } from "react";

interface RequireAuthProps {
    children: ReactElement;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !user) {
        navigate("/login");
        }
    }, [isLoaded, user, navigate]);

    return user ? children : null;
};
export default RequireAuth;