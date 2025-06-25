import { HiXMark } from "react-icons/hi2";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";

export default function Profile() {
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

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const user = localStorage.getItem("currentProfileUser");
    console.log(user);
    setCurrentUser(JSON.parse(user));
  }, []);

  const currentUserId = users.find((u) => u.email === currentUser.email);
  localStorage.setItem("useData", JSON.stringify(currentUserId));
  async function updateUser(name, phone, address, role, email) {
    const res = await fetch(`http://localhost:3000/users/${currentUserId.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        address,
        role,
        email,
      }),
    });
    const data = await res.json();
    setCurrentUser(data);
    localStorage.setItem("curnentUser", JSON.stringify(data));
  }

  const handleSubmit = async (values) => {
    updateUser(
      values.name,
      values.phone,
      values.address,
      currentUser.role,
      currentUser.email
    );
    toast.success("User data updated!");
  };

  const formik = useFormik({
    initialValues: {
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  console.log(users);
  console.log(currentUserId);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between ">
          <div className="flex gap-8 mb-6 items-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-[100px] h-[100px] rounded-full"
              alt=""
            />
            <div>
              <h2 className="text-xl">{currentUser?.name}</h2>
              <p className="text-xl">{currentUser?.email}</p>
            </div>
          </div>
          <HiXMark className="text-2xl" />
        </div>
        <hr className="text-gray-300" />
        <div className="py-6 flex justify-between items-center">
          <p className="text-gray-600 text-lg">Name</p>
          <input
            disabled
            onChange={formik.handleChange}
            name="name"
            className="w-1/5 text-gray-500 "
            type="text"
            value={formik.values?.name}
            placeholder={currentUser?.name}
          />
        </div>
        <hr className="text-gray-300" />

        <div className="py-6 flex justify-between items-center">
          <p className="text-gray-600 text-lg">Email Account</p>
          <input
            disabled
            name="email"
            className="w-1/5 text-gray-500 "
            type="text"
            value={currentUser?.email}
          />
        </div>
        <hr className="text-gray-300" />

        <div className="py-6 flex justify-between items-center">
          <p className="text-gray-600 text-lg">Mobile Number</p>
          <input
            disabled
            onChange={formik.handleChange}
            className="w-1/5 text-gray-500"
            type="tel"
            name="phone"
            placeholder={formik.values?.phone || "No Phone Number"}
          />
        </div>
        <hr className="text-gray-300" />

        <div className="py-6 flex justify-between items-center">
          <p className="text-gray-600 text-lg">Role</p>
          <input
            disabled
            name="role"
            className="w-1/5 text-gray-500"
            type="text"
            value={
              currentUser?.email === "grace@gmail.com" ||
              currentUser?.email === "kara@gmail.com"
                ? "Admin"
                : "Customer"
            }
          />
        </div>
        <hr className="text-gray-300" />

        <div className="py-6 flex justify-between items-center mb-8">
          <p className="text-gray-600 text-lg">Location</p>
          <input
            disabled
            onChange={formik.handleChange}
            className="w-1/5 text-gray-500 "
            name="address"
            type="text"
            value={
              formik.values?.address ? formik.values?.address : "not provided"
            }
          />
        </div>
      </form>
    </>
  );
}
