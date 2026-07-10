import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, roles }) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!roles.includes(user.rol)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}