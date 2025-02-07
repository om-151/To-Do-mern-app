import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function Home() {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [btnloading, setBtnLoading] = useState(false);

    const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/todos`;

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        fetchTodos();
    }, [user]);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${user._id}`);
            setTodos(response.data);
        } catch (error) {
            toast.error("Failed to fetch tasks.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login or signup first to add task");
            return;
        }

        if (!title || !description) {
            toast.error("Both fields are required!");
            return;
        }
        const todoData = { user: user._id, title, description };

        try {
            if (isEditing) {
                setBtnLoading(true)
                const updatedTodo = await axios.put(`${API_BASE_URL}/${isEditing}`, todoData);
                // Update the task in the state
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === isEditing ? updatedTodo.data : todo
                    )
                );
                setBtnLoading(false)
                toast.success("Task updated successfully!");
            } else {
                setBtnLoading(true)
                const response = await axios.post(API_BASE_URL, todoData);
                setTodos([...todos, response.data]);
                setBtnLoading(false)
                toast.success("Task added successfully!");
            }
            setTitle("");
            setDescription("");
            setIsEditing(null);
        } catch {
            toast.error("Failed to save task!");
        } finally {
            setBtnLoading(false)
        }
    };

    const handleToggleComplete = async (id, completed) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, { completed: !completed });
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id ? { ...todo, completed: response.data.completed } : todo
                )
            );
            toast.success("Task status updated!");
        } catch {
            toast.error("Failed to toggle task status!");
        }
    };

    const handleEdit = (todo) => {
        setTitle(todo.title);
        setDescription(todo.description);
        setIsEditing(todo._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            setTodos(todos.filter((todo) => todo._id !== id));
            toast.success("Task deleted successfully!");
        } catch {
            toast.error("Failed to delete task!");
        }
    };

    if (loading) {
        return <p className="text-center text-gray-600 mt-10">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
                    {isEditing ? "Edit Task" : "Manage your daily tasks"}
                </h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 font-semibold">Title</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-semibold">Description</label>
                            <textarea
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                placeholder="Enter task description"
                                rows="1"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    {/* <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        {btnloading ? (
                            <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            isEditing ? "Update Task" : "Add Task"
                        )}
                    </button> */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
                        disabled={btnloading} // Disable button when loading
                    >
                        {btnloading ? (
                            <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            isEditing ? "Update Task" : "Add Task"
                        )}
                    </button>
                </form>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
                    {todos.length === 0 ? (
                        <p className="text-gray-600">No tasks found. Start adding some!</p>
                    ) : (
                        <div className="space-y-4">
                            {todos.map((todo) => (
                                <div
                                    key={todo._id}
                                    className={`flex flex-col md:flex-row items-center justify-between bg-white shadow-md p-4 rounded-lg ${todo.completed ? "opacity-70 line-through" : ""
                                        }`}
                                >
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{todo.title}</h3>
                                        <p className="text-gray-600">{todo.description}</p>
                                    </div>
                                    <div className="flex space-x-2 mt-4 md:mt-0">
                                        <button
                                            onClick={() => handleToggleComplete(todo._id, todo.completed)}
                                            className={`px-3 py-1 rounded text-white ${todo.completed ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                                                }`}
                                        >
                                            {todo.completed ? "Undo" : "Complete"}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(todo)}
                                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(todo._id)}
                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
