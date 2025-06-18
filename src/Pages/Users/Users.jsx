import { ImUsers } from "react-icons/im";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function Users() {
  const {users} = useContext(UserContext);
  

  return (
    <>
      <div className="bg-gray-50  px-8 py-6">
      <h2 className="text-2xl mb-8 flex gap-3">
        <ImUsers className="text-[#B0C3CC] text-[32px]" />
        Users{" "}
      </h2>
      <table className="w-full border-separate border-spacing-y-4">
        <thead>
          <tr className="p-2  bg-white w-full">
            <th className="w-1/4 p-6">Id</th>
            <th className="w-1/4 p-6">Name</th>
            <th className="w-1/4 p-6">Email</th>
            <th className="w-1/4 p-6">Role</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((user) => (
                <tr key={user.email} className={` p-6 bg-white ${user.role === "Admin" ? "text-red-600" : ""} `}>
                  <td className="w-1/4 text-center p-4">{user.id}</td>
                  <td className="w-1/4 text-center p-4">{user.name}</td>
                  <td className="w-1/4 text-center p-4">{user.email}</td>
                  <td className={`w-1/4 text-center p-4  `}>{user.role}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>

      </div>
    </>
  );
}
