import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
    }, []);

    const signup = async (userData) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, userData);
            console.log("Signup API Response:", data);

            if (data?.user && data?.token) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                setUser(data.user);
                setToken(data.token);
                toast.success("Signup successful! 🎉");
            } else {
                toast.error("Signup failed. Invalid response!");
            }
        } catch (error) {
            console.error("Signup failed:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Signup failed. ❌");
        }
    };

    const login = async (credentials) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, credentials);
            console.log("Login API Response:", data);

            if (data?.user && data?.token) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                setUser(data.user);
                setToken(data.token);
                toast.success("Login successful! 🎉");
            } else {
                toast.error("Login failed. Invalid response!");
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Login failed. ❌");
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Logout successful! 🎉");
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, axiosInstance }}>
            {children}
        </AuthContext.Provider>
    );
}
