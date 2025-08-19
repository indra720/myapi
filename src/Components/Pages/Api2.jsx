// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Api2 = () => {
//   const [userdata, setuserdata] = useState([]);
//   const [loading, setloading] = useState(true);
//   const [editId, setEditId] = useState(null); //  kis user ko edit karna hai

//   // GET
//   useEffect(() => {
//     axios.get("http://localhost:3000/users").then((response) => {
//       setuserdata(response.data);
//       setloading(false);
//     });
//   }, []);

//   // FORM
//   const [formdata, setformdata] = useState({
//     name: "",
//     email: "",
//   });

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setformdata({
//       ...formdata,
//       [name]: value,
//     });
//   };

//   //  Add or Update
//   const handlesubmit = (e) => {
//     e.preventDefault();

//     if (editId) {
//       // 🔹 Update existing user
//       axios
//         .put(`http://localhost:3000/users/${editId}`, formdata)
//         .then((response) => {
//           console.log("Updated:", response.data);
//           setuserdata(
//             userdata.map((user) =>
//               user.id === editId ? response.data : user
//             )
//           );
//           setformdata({ name: "", email: "" });
//           setEditId(null);
//         });
//     } else {
//       // 🔹 Add new user
//       axios.post("http://localhost:3000/users", formdata).then((response) => {
//         console.log("Added:", response.data);
//         setuserdata([...userdata, response.data]);
//         setformdata({ name: "", email: "" });
//       });
//     }
//   };

//   //  Load data in form for edit
//   const handleedit = (user) => {
//     setformdata({ name: user.name, email: user.email });
//     setEditId(user.id);
//   };

//   //  Delete user
//   const handledelete = (id) => {
//     axios.delete(`http://localhost:3000/users/${id}`).then(() => {
//       console.log("Deleted:", id);
//       setuserdata(userdata.filter((user) => user.id !== id));
//     });
//   };

//   return (
//     <>
//       <div>
//         <form onSubmit={handlesubmit}>
//           <label>Name:</label>
//           <input
//             className="border"
//             type="text"
//             name="name"
//             onChange={handlechange}
//             value={formdata.name}
//           />
//           <br />
//           <label>Email:</label>
//           <input
//             className="border"
//             type="email"
//             name="email"
//             onChange={handlechange}
//             value={formdata.email}
//           />
//           <br />
//           <button type="submit">
//             {editId ? "Update User" : "Add User"}
//           </button>
//         </form>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <table border="1" cellPadding="8">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>NAME</th>
//                 <th>EMAIL</th>
//                 <th>ACTION</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userdata.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <button onClick={() => handleedit(user)}>Edit</button>
//                     <button
//                       onClick={() => handledelete(user.id)}
//                       style={{ marginLeft: "10px", color: "red" }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// };

// export default Api2;














import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Extra from "./ExtraFile";

const Api2 = () => {
  const [userdata, setuserdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [editId, setEditId] = useState(null);

  // GET
  const getuserdata = async()=>{

    try{
     const response = await Extra
      .get("/auth/me")
      
        setuserdata(response.data);
        console.log(response.data);
        toast(response.data.message)
        setloading(false);
    }catch(err){
      toast(err.message)
          console.log(err)
    }
  }

  useEffect(() => {
    
     getuserdata()
  }, []);

  // FORM DATA
  const [formdata, setformdata] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  // ADD OR UPDATE
  const handlesubmit =async(e) => {
    e.preventDefault();
      try{
    if (editId) {
      const response = await axios
        .put(`https://ecommerce-backend-sf4n.onrender.com/api/v1/auth/update`, formdata)
        
          setuserdata(
            userdata.map((user) => (user.id === editId ? response.data : user))
          );
          setformdata({
            userName: "",
            email: "",
            password: "",
            phoneNumber: "",
          });
          setEditId(null);
      
    } else {
      // REGISTER USER
      const response = await axios
        .post(
          "https://ecommerce-backend-sf4n.onrender.com/api/v1/auth/register",
          formdata,
          {
            headers: { "Content-Type": "application/json" }, //  important
            // withCredentials: true,
          }
        )
        
     
           console.log("User Registered:", response.data);
          setuserdata([...userdata, response.data]);
          localStorage.setItem("user", JSON.stringify(response.data));
          toast(response.data.message)
          setformdata({
            userName: "",
            email: "",
            password: "",
            phoneNumber: "",
          });
          
        
       }
        
    }
    catch(err){
          toast(err.message)
          console.error("Register Error:", err.response?.data || err.message);
        }
  };

  // EDIT
  const handleedit = (user) => {
    setformdata({
      userName: user.userName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    });
    setEditId(user.id);
  };

  // DELETE
  const handledelete = (id) => {
    axios
      .delete(`https://ecommerce-backend-sf4n.onrender.com/${id}`)
      .then(() => {
        setuserdata(userdata.filter((user) => user.id !== id));
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">SignUp</h1>

      {/* FORM */}
      <form
        onSubmit={handlesubmit}
        className="bg-white shadow-lg rounded-xl p-6 mb-8"
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="userName"
            onChange={handlechange}
            value={formdata.userName}
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            name="email"
            onChange={handlechange}
            value={formdata.email}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Password</label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            name="password"
            onChange={handlechange}
            value={formdata.password}
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">PhoneNo</label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            name="phoneNumber"
            onChange={handlechange}
            value={formdata.phoneNumber}
            placeholder="Enter phone number"
            required
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg text-white ${
            editId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      {/* TABLE */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {userdata.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 flex justify-center space-x-3">
                    <button
                      onClick={() => handleedit(user)}
                      className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handledelete(user.id)}
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))} */}
              {userdata.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Api2;
