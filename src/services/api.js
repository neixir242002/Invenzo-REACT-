const API = "http://127.0.0.1:8000/api";

export const apiFetch = async (url, options = {}) => {

    const token = localStorage.getItem("token");

    const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(options.headers || {})
    };

    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(API + url, {
        ...options,
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Error en la petición"
        );
    }

    return data;
};