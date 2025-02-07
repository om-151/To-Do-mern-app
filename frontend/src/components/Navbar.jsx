import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Menu } from "lucide-react";
import logo from "../assets/Logo.png";
import { AuthContext } from "../context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [formType, setFormType] = useState("login");
    const { user, signup, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClickOutside = (e) => {
        if (e.target.id === "modal-overlay") {
            setIsOpen(false);
        }
    };

    // Handle Signup
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        const name = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await signup({ name, email, password });
            setIsOpen(false);
            navigate("/");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await login({ email, password });
            setIsOpen(false);
            navigate("/");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    // Handle Logout
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="relative">
            <Toaster position="top-center" reverseOrder={false} />
            <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
                <Link to='/'>
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="logo" className="w-10 rounded-full" />
                        <span className="text-xl font-semibold">To-Do's</span>
                    </div>
                </Link>

                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <ul className="hidden md:flex space-x-6 text-lg">
                    <li className="hover:underline cursor-pointer"><Link to='/'>Home</Link></li>
                    <li className="hover:underline cursor-pointer"><Link to='/about'>About</Link></li>
                    <li className="hover:underline cursor-pointer"><Link to='/contact'>Contact</Link></li>
                </ul>

                <div className="hidden md:flex space-x-4">
                    {!user ? (
                        <>
                            <button
                                className="border border-white text-white px-4 py-2 rounded"
                                onClick={() => { setIsOpen(true); setFormType("login"); }}
                            >
                                Login
                            </button>
                            <button
                                className="bg-white text-blue-600 px-4 py-2 rounded"
                                onClick={() => { setIsOpen(true); setFormType("signup"); }}
                            >
                                Signup
                            </button>
                        </>
                    ) : (
                        <button
                            className="border border-white text-white px-4 py-2 rounded"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile Nav Menu */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-full bg-blue-600 text-white flex flex-col items-center space-y-6 pt-20 transition-transform duration-300 z-50 ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <button
                    className="absolute top-5 right-5 text-white"
                    onClick={() => setMenuOpen(false)}
                >
                    <X size={28} />
                </button>
                <Link to="/" className="text-lg" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/about" className="text-lg" onClick={() => setMenuOpen(false)}>About</Link>
                <Link to="/contact" className="text-lg" onClick={() => setMenuOpen(false)}>Contact</Link>
                {!user ? (
                    <>
                        <button
                            className="border border-white px-4 py-2 rounded w-32"
                            onClick={() => { setIsOpen(true); setFormType("login"); setMenuOpen(false); }}
                        >
                            Login
                        </button>
                        <button
                            className="bg-white text-blue-600 px-4 py-2 rounded w-32"
                            onClick={() => { setIsOpen(true); setFormType("signup"); setMenuOpen(false); }}
                        >
                            Signup
                        </button>
                    </>
                ) : (
                    <button
                        className="border border-white px-4 py-2 rounded w-32"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    id="modal-overlay"
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    onClick={handleClickOutside}
                >
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-600"
                        >
                            <X size={24} />
                        </button>

                        {/* Form Content */}
                        {formType === "login" ? (
                            <>
                                <h2 className="text-2xl font-bold text-center mb-4">Welcome Back!</h2>
                                <div className="flex flex-col justify-center items-center gap-1">
                                    <img src={logo} alt="logo" className="w-14" />
                                    <h1 className="m-3 text-2xl font-medium">To-Do's</h1>
                                </div>
                                <form onSubmit={handleLogin}>
                                    <input type="email" placeholder="Email" name="email" className="w-full mb-3 p-3 border rounded" />
                                    <input type="password" placeholder="Password" name="password" className="w-full mb-3 p-3 border rounded" />
                                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded flex justify-center items-center">
                                        {loading ? <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span> : "Login"}
                                    </button>
                                </form>

                                <p className="text-center text-sm text-gray-600 mt-4">
                                    Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setFormType("signup")}>Sign up</span>
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
                                <div className="flex flex-col justify-center items-center gap-1">
                                    <img src={logo} alt="logo" className="w-14" />
                                    <h1 className="m-3 text-2xl font-medium">To-Do's</h1>
                                </div>
                                <form onSubmit={handleSignup}>
                                    <input type="text" placeholder="Full Name" name="fullName" className="w-full mb-3 p-3 border rounded" />
                                    <input type="email" placeholder="Email" name="email" className="w-full mb-3 p-3 border rounded" />
                                    <input type="password" placeholder="Password" name="password" className="w-full mb-3 p-3 border rounded" />
                                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded flex justify-center items-center">
                                        {loading ? <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span> : "Sign Up"}
                                    </button>
                                </form>

                                <p className="text-center text-sm text-gray-600 mt-4">
                                    Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => setFormType("login")}>Login</span>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
