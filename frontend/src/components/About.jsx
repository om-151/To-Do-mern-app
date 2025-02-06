import { FaCheckCircle, FaReact, FaDatabase, FaPaintBrush, FaRocket, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  { icon: FaCheckCircle, title: "Effortless Task Management", desc: "Quickly add, edit, and remove tasks with ease." },
  { icon: FaReact, title: "Lightning Fast", desc: "Built with React and Vite for an ultra-smooth experience." },
  { icon: FaDatabase, title: "Cloud Storage", desc: "Your tasks are saved securely in the database." },
  { icon: FaPaintBrush, title: "Beautiful UI", desc: "A modern and visually appealing design." },
  { icon: FaRocket, title: "Boost Productivity", desc: "Stay on top of your tasks and improve efficiency." },
  { icon: FaLightbulb, title: "Smart Task Management", desc: "Organize tasks seamlessly with intuitive tools and reminders." }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/office-work-flat-lay-girl-writing-list-clip-board-computer-supplies-coffee_73169-58.jpg?w=740')" }}
      >
        <div className="relative max-w-2xl">
          <h1 className="text-5xl font-extrabold">Stay Organized, Stay Productive</h1>
          <p className="text-lg mt-3">A powerful task management tool designed to keep your life on track.</p>
        </div>
      </div>

      <div className="px-6 md:px-16 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose Our To-Do App?</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Our app helps you efficiently manage your daily tasks with an intuitive interface and powerful features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map(({ icon: Icon, title, desc }, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center transform hover:scale-105 transition">
              <Icon className="text-5xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-10">
        <h2 className="text-3xl font-semibold text-gray-800">Get Started Today!</h2>
        <p className="text-lg text-gray-600 mt-2 mb-6">Start managing your tasks more efficiently with our intuitive To-Do app.</p>
        <Link to="/">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Try Now
          </button>
        </Link>
      </div>
    </div>
  );
}
