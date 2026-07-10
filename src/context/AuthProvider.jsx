import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
            return null;
        }
    });

    const [version, setVersion] = useState(0);

    useEffect(() => {
        const loadUser = async () => {

            const token = localStorage.getItem("token");

            // 🔴 IMPORTANTE: no pegarle al backend si no hay token
            if (!token) {
                setUser(null);
                return;
            }

            try {
                const res = await fetch("http://127.0.0.1:8000/api/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                // 🔴 SI NO ES OK, limpiar sesión
                if (!res.ok) {
                    setUser(null);
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    return;
                }

                const data = await res.json();

                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));

            } catch (error) {
                console.log("Error cargando perfil:", error);
            }
        };

        loadUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, version, setVersion }}>
            {children}
        </AuthContext.Provider>
    );
}