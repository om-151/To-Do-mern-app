import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/form/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Form Submitted");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error("Form not submitted");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <div className="relative w-full h-96 bg-cover bg-center flex items-center justify-center text-center px-6"
        style={{ backgroundImage: "url('https://www.thedestinycalls.com/images/image-11.jpg')" }}>
      </div>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Get in Touch</h2>
            <p className="mt-2 text-xl text-gray-600">We'd love to hear your thoughts, feedback, or questions. Reach out to us anytime!</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {['name', 'email', 'message'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-gray-800 capitalize">Your {field}</label>
                  {field !== 'message' ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <textarea
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                      rows="6"
                    />
                  )}
                  {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                </div>
              ))}
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-800">Contact Info</h2>
            <p className="text-gray-600">You can also reach us through the following channels:</p>
            {[
              { icon: FaPhoneAlt, text: "+91 985 428 5632" },
              { icon: FaEnvelope, text: "contact@todos.com" },
              { icon: FaMapMarkerAlt, text: "B401, Pavitra point, Varachha" },
            ].map(({ icon: Icon, text }, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Icon size={28} className="text-blue-600" />
                <span className="text-lg text-gray-800">{text}</span>
              </div>
            ))}
            <div className="flex space-x-6">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <a key={index} href="#" className="text-blue-600 hover:text-blue-800">
                  <Icon size={28} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
