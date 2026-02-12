// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../services/api";

// const STRIPE_PAYMENT_LINK =
//   "https://buy.stripe.com/test_aFa8wOdlL61S7tteng0Ba00";

// const CheckOut = () => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   if (cartItems.length === 0) return <Navigate to="/cart" replace />;

//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleCheckOut = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Login expired. Please login again.");
//         return;
//       }

//       const orderPayload = cartItems.map((item) => ({
//         productName: item.title,
//         price: item.price,
//         quantity: item.quantity,
//       }));

//       // ✅ Save order BEFORE Stripe
//       await api.post(
//         "/api/orders",
//         orderPayload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("Redirecting to payment...");

//       setTimeout(() => {
//         window.location.href = STRIPE_PAYMENT_LINK;
//       }, 1200);

//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to place order");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
//         <h2 className="text-2xl font-bold mb-6">Checkout</h2>

//         {cartItems.map((item) => (
//           <div key={item.id} className="flex justify-between border-b py-3">
//             <div>
//               <h3 className="font-semibold">{item.title}</h3>
//               <p className="text-sm text-gray-600">
//                 Qty: {item.quantity}
//               </p>
//             </div>
//             <p className="font-semibold">
//               ${(item.price * item.quantity).toFixed(2)}
//             </p>
//           </div>
//         ))}

//         <div className="flex justify-between mt-6 text-lg font-bold">
//           <span>Total</span>
//           <span>${totalAmount.toFixed(2)}</span>
//         </div>

//         <button
//           onClick={handleCheckOut}
//           className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
//         >
//           Pay with Stripe
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckOut;


import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const STRIPE_PAYMENT_LINK =
  "https://buy.stripe.com/test_aFa8wOdlL61S7tteng0Ba00";

const CheckOut = () => {
  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems.length === 0) return <Navigate to="/cart" replace />;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckOut = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to continue.");
        return;
      }

      const orderPayload = cartItems.map((item) => ({
        productName: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      await api.post("/api/orders", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Redirecting to payment...");

      setTimeout(() => {
        window.location.href = STRIPE_PAYMENT_LINK;
      }, 1200);

    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-3">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="flex justify-between mt-6 text-lg font-bold">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckOut}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Pay with Stripe
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
