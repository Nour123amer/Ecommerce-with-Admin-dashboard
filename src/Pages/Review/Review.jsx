import { useFormik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiMail, FiUser, FiX } from "react-icons/fi";
import * as Yup from "yup";
import { FeedbackContext } from "../../contexts/FeedbackContext";

export default function FeedbackPage() {
  const { reviews, setReviews } = useContext(FeedbackContext);
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    feedback: Yup.string()
      .required("feedback is required")
      .min(
        20,
        "Feedback should be at least 20 characters and give an evaluation"
      ),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const res = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          feedback: values.feedback,
        }),
      });
      const newFeedback = await res.json();
     
      if (res.ok) { 
          console.log("reeeeeview")
        setReviews([...reviews, newFeedback]);
        toast.success("Feedback added successfully.");
        actions.resetForm();
      }

      else {
        toast.error("Failed to add a feedback.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      feedback: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="sm:w-full md:w-3/4 lg:w-1/3 rounded-lg bg-white shadow-2xl px-6 py-8 mx-auto ">
        <h2 className="text-gray-500 text-2xl text-center mb-8">
          Feedback Form
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-7 transform -translate-y-1/2 text-gray-400" />
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-colors  mb-6 ${
                  formik.errors.name && formik.touched.name
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-orange-500"
                }`}
                type="text"
                name="name"
                placeholder="Enter your full name"
              />
              {formik.values.name && !formik.errors.name && (
                <FiCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
              )}
            </div>
            {formik.errors.name && formik.touched.name && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <FiX className="text-xs" />
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-7 transform -translate-y-1/2 text-gray-400" />
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-colors mb-6 ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-orange-500"
                }`}
                type="email"
                name="email"
                placeholder="Enter your email address"
              />
              {formik.values.email && !formik.errors.email && (
                <FiCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
              )}
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <FiX className="text-xs" />
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* feedback  */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              enter your feedback
            </label>
            <div className="relative">
              <textarea
                value={formik.values.feedback}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl resize-none focus:outline-none transition-colors mb-6 ${
                  formik.errors.feedback && formik.touched.feedback
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-orange-500"
                }`}
                name="feedback"
                placeholder="Enter your feedback"
              ></textarea>
            </div>
            {formik.errors.feedback && formik.touched.feedback && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <FiX className="text-xs" />
                {formik.errors.feedback}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Feedback
          </button>
        </form>
      </div>
    </>
  );
}
