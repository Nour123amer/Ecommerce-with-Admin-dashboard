import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {users} = useContext(UserContext);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(8, "Name must be at most 8 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password should start with uppercase letter followed by lowercase, number and underscore."
      ),
  });

 

  const handleSubmit = async (values) => {
     const emailExist = users.some((u)=>u.email === values.email);
    if(emailExist){
      toast.error("Email already exist");
      return
    }
    try {
      localStorage.setItem("email", JSON.stringify(values.email));
      if (
        values.email === "kara@gmail.com" ||
        values.email === "grace@gmail.com"
      ) {
        setError("");
        navigate("/dashboard");
      } else {
        addUser(values.name, values.email, values.password);
        localStorage.setItem("curnentUser", JSON.stringify(values));
        navigate("/");
      }
    } catch (error) {
      toast.error("failed to create an account");
      setError("failed to create an account");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      // numOfOrders: 0,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function addUser(name, email, password) {
    let res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: "Customer",
        // numOfOrders,
      }),
    });

    if (!res.ok) {
      throw error("Failed to add user.");
    }

    const data = await res.json();
  }

  return (
    <>
      <div className="flex justify-center items-center min-w-screenpn ">
        <div className="bg-[url('https://i.pinimg.com/736x/70/34/99/7034992fa1528ac59db02382f6c70478.jpg')] bg-center bg-no-repeat bg-cover text-white rounded-2xl shadow-xl  w-[800px] h-[550px] mx-auto mt-22 ">
          <h2 className="text-center text-white pt-8 text-2xl">Sign up</h2>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <form
            onSubmit={formik.handleSubmit}
            className=" pt-14 px-6  text-center flex flex-col rounded-2xl "
          >
            <div className="w-full mb-4">
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 px-5 py-3  mb-3 rounded-full w-10/12 "
                type="text"
                name="name"
                placeholder="username"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="text-red-500">{formik.errors.name} </div>
              ) : (
                ""
              )}
            </div>
            <div className="w-full mb-4">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 px-5 py-3  mb-3 rounded-full w-10/12 "
                type="email"
                name="email"
                placeholder="email"
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500"> {formik.errors.email}</div>
              ) : (
                ""
              )}
            </div>
            <div className="w-full mb-4">
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 px-5 py-3  mb-3 rounded-full w-10/12 "
                type="password"
                name="password"
                placeholder="password"
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : (
                ""
              )}
            </div>

            <button
              type="submit"
              className="text-blue-950  px-5 py-3 bg-white font-bold rounded-full  border-2 border-blue-950  w-10/12 mx-auto  hover:shadow-lg transition-colors duration-300"
            >
              Sign up
            </button>
          </form>
          <div className="text-center  italic font-semibold my-8 text-white">
            Aleardy have an account ?{" "}
            <Link to="/login" className="">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
