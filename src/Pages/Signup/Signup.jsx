"use client"
import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"
import { UserContext } from "../../contexts/UserContext"
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi"
import { BiRestaurant } from "react-icons/bi"

export default function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { users } = useContext(UserContext)

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: Yup.string().required("Email is required").email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, including uppercase, lowercase, number and special character",
      ),
  })

  const handleSubmit = async (values) => {
    setIsLoading(true)
    const emailExist = users.some((u) => u.email === values.email)

    if (emailExist) {
      toast.error("Email already exists")
      setIsLoading(false)
      return
    }

    try {
      localStorage.setItem("email", JSON.stringify(values.email))

      if (values.email === "kara@gmail.com" || values.email === "grace@gmail.com") {
        setError("")
        toast.success("Admin account created successfully!")
        navigate("/dashboard")
      } else {
        await addUser(values.name, values.email, values.password)
        localStorage.setItem("currentProfileUser", JSON.stringify(values))
        toast.success("Account created successfully!")
        navigate("/")
      }
    } catch (error) {
      toast.error("Failed to create account")
      setError("Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  })

  async function addUser(name, email, password) {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: "Customer",
      }),
    })

    if (!res.ok) {
      throw new Error("Failed to add user.")
    }

    return await res.json()
  }

  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[@$!%*?&#]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formik.values.password)

  return (
    <div className="min-h-[100%] bg-gradient-to-br  flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Branding */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-12 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <BiRestaurant className="text-4xl" />
              <h1 className="text-3xl font-bold">GOOGFOOD</h1>
            </div>

            <h2 className="text-4xl font-bold mb-6">Join Our Food Community</h2>
            <p className="text-xl mb-8 opacity-90">
              Create your account and discover amazing dishes from the best restaurants in town.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FiCheck className="text-sm" />
                </div>
                <span>Access to exclusive deals and offers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FiCheck className="text-sm" />
                </div>
                <span>Fast and reliable food delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FiCheck className="text-sm" />
                </div>
                <span>Track your orders in real-time</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white opacity-5 rounded-full"></div>
        </div>

        {/* Right Side - Form */}
        <div className="p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
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

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
                    formik.errors.password && formik.touched.password
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-orange-500"
                  }`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formik.values.password && (
                <div className="mt-3">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full ${
                          passwordStrength >= level
                            ? passwordStrength <= 2
                              ? "bg-red-500"
                              : passwordStrength <= 3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Password strength:{" "}
                    <span
                      className={
                        passwordStrength <= 2
                          ? "text-red-600"
                          : passwordStrength <= 3
                            ? "text-yellow-600"
                            : "text-green-600"
                      }
                    >
                      {passwordStrength <= 2 ? "Weak" : passwordStrength <= 3 ? "Medium" : "Strong"}
                    </span>
                  </p>
                </div>
              )}

              {formik.errors.password && formik.touched.password && (
                <p className="mt-2 text-sm text-red-600 flex items-start gap-1">
                  <FiX className="text-xs mt-0.5 flex-shrink-0" />
                  <span>{formik.errors.password}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                 <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                 Login
                </Link>
              </p>
            </div>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-6">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-orange-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
