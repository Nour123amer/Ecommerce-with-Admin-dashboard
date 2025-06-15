import { ImUsers } from "react-icons/im";
import { useEffect } from "react";
import { useState } from "react";

export default function Users() {
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

  return (
    <>
      <h2 className="text-2xl mb-8 flex gap-3">
        <ImUsers className="text-[#B0C3CC] text-[32px]" />
        Users{" "}
      </h2>
      <table className="w-full">
        <thead>
          <tr className="p-2 border-b-2 border-gray-200 w-full">
            <th className="w-1/4 p-6">Id</th>
            <th className="w-1/4 p-6">Name</th>
            <th className="w-1/4 p-6">Email</th>
            <th className="w-1/4 p-6">Role</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((user) => (
                <tr className={` p-6 border-b-2 border-gray-200  ${user.role === "Admin" ? "text-red-600" : ""} `}>
                  <td className="w-1/4 text-center p-4">{user.id}</td>
                  <td className="w-1/4 text-center p-4">{user.name}</td>
                  <td className="w-1/4 text-center p-4">{user.email}</td>
                  <td className={`w-1/4 text-center p-4  `}>{user.role}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </>
  );
}
