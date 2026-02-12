// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { clearCart } from "../features/cart/cartSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Success = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Clear cart after successful payment
//     dispatch(clearCart());
//     toast.success("Payment successful 🎉");

//     // Optional: auto redirect after 5 seconds
//     const timer = setTimeout(() => {
//       navigate("/products");
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [dispatch, navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
//         {/* SUCCESS ICON */}
//         <div className="text-green-500 text-6xl mb-4">✔</div>

//         <h1 className="text-2xl font-bold mb-2">
//           Payment Successful!
//         </h1>

//         <p className="text-gray-600 mb-6">
//           Thank you for your purchase. Your order has been placed successfully.
//         </p>

//         <div className="flex flex-col gap-4">
//           <Link
//             to="/products"
//             className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Continue Shopping
//           </Link>

//           <Link
//             to="/orders"
//             className="border border-gray-300 py-2 rounded hover:bg-gray-100"
//           >
//             View Orders
//           </Link>
//         </div>

//         <p className="text-sm text-gray-400 mt-4">
//           You will be redirected automatically...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Success;


import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ FRONTEND-ONLY FINALIZATION
    dispatch(clearCart());
    toast.success("Payment successful 🎉");

    const timer = setTimeout(() => {
      navigate("/products");
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <div className="text-green-500 text-6xl mb-4">✔</div>

        <h1 className="text-2xl font-bold mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/products"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="border border-gray-300 py-2 rounded hover:bg-gray-100"
          >
            View Orders
          </Link>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          You will be redirected automatically...
        </p>
      </div>
    </div>
  );
};

export default Success;
