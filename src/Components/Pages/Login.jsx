import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
function Login() {
  const [formdata, setformdata] = useState({ email: "", password: "" });
  const [userdata, setuserdata] = useState(null);
  const [loading, setloading] = useState(true);
  let data = {};
  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const getuserdata = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-backend-sf4n.onrender.com/api/v1/auth/me",
        {
          withCredentials: true,
        }
      );

      setuserdata(response.data.user);
      setloading(false);
      console.log(response.data);
      toast(response.data.message);
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response.data.message) {
        toast(err.response.data.message);
      } else {
        toast(err.message);
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getuserdata();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ecommerce-backend-sf4n.onrender.com/api/v1/auth/login",
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      data = response.data;
      localStorage.setItem("token", response.data.token);
      toast(response.data.message);
    } catch (err) {
      if (err.response.data.message) {
        toast(err.response.data.message);
      } else {
        toast(err.message);
        console.log(err);
      }
    }
  };

  // const handlelogout=async(e)=>{
  //   e.preventDefault()
  //  try{
  //    const response = await axios.get(
  //       "https://ecommerce-backend-sf4n.onrender.com/api/v1/auth/logout",{},

  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response);

  //     toast(response.data.message);
  //  }catch(err){

  //  }
  // }

  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://ecommerce-backend-sf4n.onrender.com/api/v1/auth/logout",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 🔑 Frontend me user hatao
      setuserdata(null);
      localStorage.removeItem("token");

      console.log(response);
      toast(response.data.message);
    } catch (err) {
      console.log(err);
      toast("Logout failed");
    }
  };

  return (
    <>
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form
          className="bg-white shadow-lg rounded-xl p-6 mb-8"
          onSubmit={handlesubmit}
        >
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              placeholder="Enter email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              placeholder="Enter password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white w-full"
          >
            Login
          </button>
        </form>
        <button
          onClick={handlelogout}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white w-full"
        >
          LogOut
        </button>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : userdata ? (
            <ul>
              <li>Name: {userdata.userName}</li>
              <li>Email: {userdata.email}</li>
              <li>Role: {userdata.role}</li>
            </ul>
          ) : (
            <p>No user logged in</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// function Login() {
//   const [formdata, setformdata] = useState({ email: "", password: "" });
//   const [user, setUser] = useState(null);   // single object
//   const [loading, setLoading] = useState(false);

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setformdata({ ...formdata, [name]: value });
//   };

//   // get logged-in user data
//   const getuserdata = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "https://ecommerce-backend-sf4n.onrender.com/api/v1/auth/me",
//         { withCredentials: true }
//       );
//       setUser(response.data.user);   // API me user aata hai
//       toast(response.data.message);
//     } catch (err) {
//       console.log(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getuserdata();
//   }, []);

//   // login
//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://ecommerce-backend-sf4n.onrender.com/api/v1/auth/login",
//         formdata,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       toast(response.data.message);
//       // login success ke baad user data load karo
//       getuserdata();
//     } catch (err) {
//       toast(err.response?.data?.message || err.message);
//       console.log(err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

//       <form
//         className="bg-white shadow-lg rounded-xl p-6 mb-8"
//         onSubmit={handlesubmit}
//       >
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formdata.email}
//             onChange={handlechange}
//             placeholder="Enter email"
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formdata.password}
//             onChange={handlechange}
//             placeholder="Enter password"
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white w-full"
//         >
//           Login
//         </button>
//       </form>

//       {/* user info */}
//       <div>
//         {loading ? (
//           <p>Loading...</p>
//         ) : user ? (
//           <ul>
//             <li>Name: {user.userName}</li>
//             <li>Email: {user.email}</li>
//             <li>Role: {user.role}</li>
//           </ul>
//         ) : (
//           <p>No user logged in</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;
