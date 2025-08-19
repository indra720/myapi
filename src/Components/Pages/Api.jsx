// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Post() {
//   const [postdata, setpostdata] = useState({
//     id: "",
//     name: "",
//     email: "",
//   });

//   const [userdata, setuserdata] = useState([]);
//   const [loading, setloading] = useState(true);

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setpostdata({
//       ...postdata,
//       [name]: value,
//     });
//   };

//   const handlesubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("https://jsonplaceholder.typicode.com/users", postdata)
//       .then((response) => {
//         console.log("POST Response:", response.data);
//         fetchdata(); 
//       })
//       .catch((error) => {
//         console.error("POST Error:", error);
//       });
//   };

//   const handleupdate = () => {
//     axios
//       .put(`https://jsonplaceholder.typicode.com/users/${postdata.id}`, postdata)
//       .then((response) => {
//         console.log("PUT Response:", response.data);
//         fetchdata(); 
//       })
//       .catch((error) => {
//         console.error("PUT Error:", error);
//       });
//   };

//   const handledelete = () => {
//     axios
//       .delete(`https://jsonplaceholder.typicode.com/users/${postdata.id}`)
//       .then((response) => {
//         console.log("DELETE Response:", response.data);
//         fetchdata(); 
//       })
//       .catch((error) => {
//         console.error("DELETE Error:", error);
//       });
//   };

//   const fetchdata = () => {
//     axios
//       .get("https://jsonplaceholder.typicode.com/users")
//       .then((response) => {
//         setuserdata(response.data);
//         setloading(false);
//       })
//       .catch((error) => {
//         console.error("GET Error:", error);
//         setloading(false);
//       });
//   };

//   useEffect(() => {
//     fetchdata();
//   }, []);

//   return (
//     <div className="m-5">
//       <h2>Fetch Api</h2>
//       <form onSubmit={handlesubmit}>
//         <div>
//           <label>ID:</label>
//           <input
//             type="text"
//             name="id"
//             value={postdata.id}
//             onChange={handlechange}
//             className="border"
//           />
//         </div>
//         <br />
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={postdata.name}
//             onChange={handlechange}
//             className="border"
//           />
//         </div>
//         <br />
//         <div>
//           <label>Email:</label>
//           <input
//             type="text"
//             name="email"
//             value={postdata.email}
//             onChange={handlechange}
//             className="border"
//           />
//         </div>
//         <br />
//         <button type="submit">Submit</button>
//         <button type="button" onClick={handleupdate} className="mx-2">
//           Update
//         </button>
//         <button type="button" onClick={handledelete}>
//           Delete
//         </button>
//       </form>

//       <hr />
//       <h3>Fetched Users</h3>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="border" cellPadding="5">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userdata.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Post;





































// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Api2 = () => {
//   const [userdata, setuserdata] = useState([]);
//   const [loading, setloading] = useState(true);
//   const [editId, setEditId] = useState(null);

//   // GET
//   useEffect(() => {
//     axios.get("http://localhost:3000/users").then((response) => {
//       setuserdata(response.data);
//       setloading(false);
//     });
//   }, []);

//   // FORM DATA
//   const [formdata, setformdata] = useState({ name: "", email: "" });

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setformdata({ ...formdata, [name]: value });
//   };

//   // ADD OR UPDATE
//   const handlesubmit = (e) => {
//     e.preventDefault();
//     if (editId) {
//       axios
//         .put(`http://localhost:3000/users/${editId}`, formdata)
//         .then((response) => {
//           setuserdata(
//             userdata.map((user) =>
//               user.id === editId ? response.data : user
//             )
//           );
//           setformdata({ name: "", email: "" });
//           setEditId(null);
//         });
//     } else {
//       axios.post("http://localhost:3000/users", formdata).then((response) => {
//         setuserdata([...userdata, response.data]);
//         setformdata({ name: "", email: "" });
//       });
//     }
//   };

//   // EDIT
//   const handleedit = (user) => {
//     setformdata({ name: user.name, email: user.email });
//     setEditId(user.id);
//   };

//   // DELETE
//   const handledelete = (id) => {
//     axios.delete(`http://localhost:3000/users/${id}`).then(() => {
//       setuserdata(userdata.filter((user) => user.id !== id));
//     });
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-6">
//         User Management (CRUD)
//       </h1>

//       {/* FORM */}
//       <form
//         onSubmit={handlesubmit}
//         className="bg-white shadow-lg rounded-xl p-6 mb-8"
//       >
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Name</label>
//           <input
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             type="text"
//             name="name"
//             onChange={handlechange}
//             value={formdata.name}
//             placeholder="Enter name"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Email</label>
//           <input
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             type="email"
//             name="email"
//             onChange={handlechange}
//             value={formdata.email}
//             placeholder="Enter email"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className={`px-4 py-2 rounded-lg text-white ${
//             editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           {editId ? "Update User" : "Add User"}
//         </button>
//       </form>

//       {/* TABLE */}
//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : (
//         <div className="overflow-x-auto shadow-md rounded-xl">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-blue-500 text-white text-left">
//                 <th className="p-3">ID</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userdata.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="border-b hover:bg-gray-100 transition"
//                 >
//                   <td className="p-3">{user.id}</td>
//                   <td className="p-3">{user.name}</td>
//                   <td className="p-3">{user.email}</td>
//                   <td className="p-3 flex justify-center space-x-3">
//                     <button
//                       onClick={() => handleedit(user)}
//                       className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handledelete(user.id)}
//                       className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {userdata.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="p-4 text-center text-gray-500"
//                   >
//                     No users found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Api2;
