import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const passwordRef = useRef();

  const validationSchema = Yup.object({
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

  const [users, setUsers] = useState([]);
  async function getUsers() {
    let res = await fetch("http://localhost:3000/users");
    let data = await res.json();
    console.log(data);
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const availableUsers = users.map((user) => {
    return {
      email: user.email,
      password: user.password,
    };
  });
  console.log(availableUsers);
  const handleSubmit = async (values) => {
    try {
      if (
        !availableUsers.some(
          (user) =>
            user.email === values.email && user.password === values.password
        )
      ) {
        setError("You Don't have an account ,please signup.");
        toast.error("Email or Password is incorrect.");
      } else if (
        values.email === "kara@gmail.com" ||
        values.email === "grace@gmail.com"
      ) {
        setError("");
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("failed to create an account");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="flex justify-center items-center min-w-screenpn ">
        <div className="bg-[url('https://i.pinimg.com/736x/70/34/99/7034992fa1528ac59db02382f6c70478.jpg')] bg-center  mt-22 bg-no-repeat bg-cover text-white rounded-2xl shadow-xl  w-[800px] h-[550px] mx-auto ">
          <h2 className="text-center text-white py-8 text-2xl">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form
            onSubmit={formik.handleSubmit}
            className=" pt-14 px-6  text-center flex flex-col rounded-2xl "
          >
            <div className="w-full mb-4">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-white px-5 py-3  mb-3 rounded-full w-10/12 "
                type="email"
                name="email"
                placeholder="email"
              />

              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-600 font-semibold mt-2">
                  {" "}
                  *{formik.errors.email}{" "}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="w-full mb-4">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-white px-5 py-3  mb-3 rounded-full w-10/12 "
                type="password"
                name="password"
                placeholder="password"
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-600 font-semibold mt-2">
                  {" "}
                  *{formik.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>

            <button
              type="submit"
              className="text-blue-950  px-5 py-3 bg-white font-bold rounded-full  border-2 border-blue-950    hover:shadow-lg transition-colors duration-300 w-10/12 mx-auto"
            >
              Log in
            </button>
          </form>
          <div className="text-center text-white italic font-semibold my-8">
            Don't have an account ?{" "}
            <Link to="/signup" className="">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
