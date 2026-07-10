import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import {
    User, Save
} from "../icons";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../conmponents/Modals/ConfirmModal";
export function ProfileSettings({ addFlash }) {
    const { user, setUser, version } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const isMyProfile = !id || id == user?.id;
    const [image, setImage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        rol: ""
    });
    const [imgError, setImgError] = useState(false);

    const rolesLabel = {
        administrador_principal: "Administrador Principal",
        administrador: "Administrador",
        auxiliar: "Auxiliar"
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const url = id
                    ? `http://127.0.0.1:8000/api/usuarios/${id}`
                    : `http://127.0.0.1:8000/api/profile`;

                const res = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Accept": "application/json"
                    }
                });

                const data = await res.json();

                const usuario = data.user || data;

                if (!usuario) return;

                setForm({
                    nombre: usuario.nombre || "",
                    email: usuario.email || "",
                    rol: usuario.rol || "",
                    empresa: usuario.empresa || null
                });

            } catch (err) {
                console.log(err);
            }
        };

        loadData();
    }, [id]);

    const uploadPhoto = async () => {
        if (!image) {
            addFlash("Selecciona una imagen primero", "error");
            return;
        }

        if (image.size > 2 * 1024 * 1024) {
            addFlash("La imagen supera el límite de 2 MB", "error");
            return;
        }

        const formData = new FormData();
        formData.append("foto", image);

        const res = await fetch("http://127.0.0.1:8000/api/profile/photo", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Accept": "application/json"
            },
            body: formData
        });

        if (res.ok) {
            await res.json().catch(() => ({}));

            const profileRes = await fetch("http://127.0.0.1:8000/api/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
            });

            const profileData = await profileRes.json();

            if (isMyProfile) {
                setUser(profileData.user);
                localStorage.setItem("user", JSON.stringify(profileData.user));
            }

            addFlash("Foto actualizada");
            setImage(null);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!form.nombre.trim() || !form.email.trim()) {
            addFlash("Nombre y correo son obligatorios", "error");
            return;
        }

        const payload = {
            nombre: form.nombre,
            email: form.email,
            ...(user?.rol === "administrador_principal" && !isMyProfile
                ? { rol: form.rol }
                : {})
        };

        try {
            const url = id
                ? `http://127.0.0.1:8000/api/usuarios/${id}`
                : "http://127.0.0.1:8000/api/profile";

            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Error actualizando perfil"
                );
            }

            if (isMyProfile) {
                setUser(prev => {
                    const updatedUser = {
                        ...prev,
                        ...data.user
                    };

                    localStorage.setItem("user", JSON.stringify(updatedUser));

                    return updatedUser;
                });
            }

            addFlash("Perfil actualizado correctamente");

        } catch (err) {
            console.log(err);
            addFlash(
                err.message || "Error al actualizar perfil",
                "error"
            );
        }
    };

    const handleDeleteCompany = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/empresa", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }

            setShowDeleteModal(false);

            addFlash("Empresa eliminada completamente");

            localStorage.clear();

            navigate("/login");

        } catch (err) {
            console.log(err);
            addFlash(err.message || "Error al eliminar empresa", "error");
        }
    };

    if (id && !form.nombre && !form.email) {
        return <p>Cargando usuario...</p>;
    }

    const avatarUrl = image
    ? URL.createObjectURL(image)
    : user?.foto && !imgError
        ? `http://127.0.0.1:8000/storage/${user.foto}?v=${version}`
        : null;

    return (
        <div className="page">
            <div className="page-header"><h1>Configuración de Perfil</h1></div>
            <div className="profile-grid">
                {isMyProfile && (
                    <div className="card">
                        <h3>Foto de Perfil</h3>
                        <div className="profile-avatar-box">
                            <div className="profile-avatar-big">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="avatar"
                                        className="avatar-img"
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <User size={60} color="#0077B6" />
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="custom-file-upload">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />

                                <span>Seleccionar imagen</span>
                            </label>
                        </div>
                        <div className="photo-actions">
                            {image && (
                                <button className="btn-primary" onClick={uploadPhoto}>
                                    Guardar Foto
                                </button>
                            )}

                            {user?.foto && (
                                <button
                                    className="btn-secondary"
                                    onClick={async () => {
                                        try {
                                            const res = await fetch("http://127.0.0.1:8000/api/profile/photo", {
                                                method: "DELETE",
                                                headers: {
                                                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                                                    "Accept": "application/json"
                                                }
                                            });

                                            if (!res.ok) throw new Error();

                                            const profileRes = await fetch("http://127.0.0.1:8000/api/profile", {
                                                headers: {
                                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                    Accept: "application/json",
                                                },
                                            });

                                            const profileData = await profileRes.json();

                                            if (isMyProfile) {
                                                setUser(profileData.user);
                                                localStorage.setItem("user", JSON.stringify(profileData.user));
                                            }

                                            addFlash("Foto eliminada correctamente");
                                        } catch (err) {
                                            console.log(err);
                                            addFlash("Error al eliminar la foto", "error");
                                        }
                                    }}
                                >
                                    Eliminar foto
                                </button>
                            )}
                        </div>
                    </div>

                )}
                <div className="card">
                    <h3>Información Personal</h3>
                    <form onSubmit={handleSave}>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input value={form.nombre || ""} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                        </div>
                        <div className="form-group"
                        ><label>Email</label><input type="email" value={form.email || ""} onChange={e => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Empresa</label>
                            <input
                                type="text"
                                value={user?.empresa?.nombre || ""}
                                disabled
                            />
                        </div>
                        {user?.rol === "administrador_principal" && !isMyProfile ? (
                            <div className="form-group">
                                <label>Rol</label>
                                <select
                                    value={form.rol || ""}
                                    onChange={e => setForm({ ...form, rol: e.target.value })}
                                >
                                    <option value="auxiliar">Auxiliar</option>
                                    <option value="administrador">Administrador</option>
                                </select>
                            </div>
                        ) : (
                            <div className="form-group">
                                <label>Rol</label>
                                <input value={rolesLabel[form.rol] || form.rol} disabled />
                            </div>
                        )}
                        <div className="profile-actions">
                            <button type="submit" className="btn-primary">
                                <Save size={18} />
                                Guardar Cambios
                            </button>

                            {isMyProfile && (
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => navigate("/change-password")}
                                >
                                    Cambiar contraseña
                                </button>
                            )}
                            {isMyProfile && user?.rol === "administrador_principal" && (
                                <button
                                    type="button"
                                    className="btn-danger audit-btn"
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    Eliminar empresa
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <ConfirmModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteCompany}
                title="Eliminar empresa"
                message="Se eliminará permanentemente la empresa junto con todos los usuarios, productos, categorías, movimientos, auditorías y demás información asociada. Esta acción no se puede deshacer."
                confirmText="Eliminar empresa"
                cancelText="Cancelar"
                danger
            />
        </div>
    );
}
