// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import MainLayout from "../layouts/MainLayout";
// import ProtectedRoutes from "./ProtectedRoutes";

// // 🔓 Public Pages
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Products from "../pages/Products";
// import ProductsDetails from "../pages/ProductsDetails";
// import Cart from "../pages/Cart";
// import Success from "../pages/Success";

// // 🔐 Protected Pages
// import CheckOut from "../pages/CheckOut";
// import Orders from "../pages/Orders";
// import OrdersHistory from "../pages/OrdersHistory";
// import Logout from "../components/Logout";

// const AppRoutes = () => {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* ================= PUBLIC ROUTES (No Navbar) ================= */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Stripe Success Page – Public */}
//         <Route path="/success" element={<Success />} />

//         {/* ================= ROUTES WITH NAVBAR ================= */}
//         <Route element={<MainLayout />}>

//           {/* Public */}
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/product/:id" element={<ProductsDetails />} />
//           <Route path="/cart" element={<Cart />} />  {/* 🛒 Public */}

//           {/* ================= PROTECTED ROUTES ================= */}
//           <Route
//             path="/checkout"
//             element={
//               <ProtectedRoutes>
//                 <CheckOut />
//               </ProtectedRoutes>
//             }
//           />

//           <Route
//             path="/orders"
//             element={
//               <ProtectedRoutes>
//                 <Orders />
//               </ProtectedRoutes>
//             }
//           />

//           <Route
//             path="/orders-history"
//             element={
//               <ProtectedRoutes>
//                 <OrdersHistory />
//               </ProtectedRoutes>
//             }
//           />

//           <Route
//             path="/logout"
//             element={
//               <ProtectedRoutes>
//                 <Logout />
//               </ProtectedRoutes>
//             }
//           />

//         </Route>

//         {/* ================= 404 PAGE ================= */}
//         <Route
//           path="*"
//           element={
//             <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
//               404 - Page Not Found
//             </div>
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRoutes;


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";

// 🔓 Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductsDetails from "../pages/ProductsDetails";
import Cart from "../pages/Cart";
import Success from "../pages/Success";

// 🔐 Protected Pages
import CheckOut from "../pages/CheckOut";
import Orders from "../pages/Orders";
import OrdersHistory from "../pages/OrdersHistory";
import Logout from "../components/Logout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= ALL ROUTES WITH NAVBAR ================= */}
        <Route element={<MainLayout />}>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductsDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />

          {/* ================= PROTECTED ROUTES ================= */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoutes>
                <CheckOut />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoutes>
                <Orders />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/orders-history"
            element={
              <ProtectedRoutes>
                <OrdersHistory />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/logout"
            element={
              <ProtectedRoutes>
                <Logout />
              </ProtectedRoutes>
            }
          />

        </Route>

        {/* ================= 404 PAGE ================= */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
              404 - Page Not Found
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
