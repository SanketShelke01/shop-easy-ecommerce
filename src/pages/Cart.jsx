// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
//   clearCart,
// } from "../features/cart/cartSlice";
// import { toast } from "react-toastify";
// import { Link, Navigate } from "react-router-dom";

// const Cart = () => {
//   const dispatch = useDispatch();

//   const cartItems = useSelector((state) => state.cart.items);
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   // 🔐 NOT LOGGED IN → REDIRECT TO LOGIN
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   // 🛒 LOGGED IN BUT CART EMPTY
//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//         <p className="text-xl mb-4">Your cart is empty 🛒</p>
//         <Link
//           to="/products"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   // ✅ LOGGED IN + CART HAS ITEMS
//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
//         <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

//         {/* CART ITEMS */}
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center border-b pb-4"
//             >
//               {/* PRODUCT INFO */}
//               <div className="flex items-center gap-4 sm:col-span-2">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-20 h-20 object-contain"
//                 />
//                 <div>
//                   <h2 className="font-semibold text-sm sm:text-base line-clamp-2">
//                     {item.title}
//                   </h2>
//                   <p className="text-gray-600 text-sm">${item.price}</p>
//                 </div>
//               </div>

//               {/* QUANTITY */}
//               <div className="flex items-center justify-center gap-3">
//                 <button
//                   onClick={() => dispatch(decreaseQuantity(item.id))}
//                   className="px-3 py-1 bg-gray-200 rounded"
//                 >
//                   −
//                 </button>

//                 <span className="font-semibold">{item.quantity}</span>

//                 <button
//                   onClick={() => dispatch(increaseQuantity(item.id))}
//                   className="px-3 py-1 bg-gray-200 rounded"
//                 >
//                   +
//                 </button>
//               </div>

//               {/* ITEM TOTAL */}
//               <div className="text-center font-semibold">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </div>

//               {/* REMOVE */}
//               <div className="text-center">
//                 <button
//                   onClick={() => {
//                     dispatch(removeFromCart(item.id));
//                     toast.error("Item removed from cart");
//                   }}
//                   className="text-red-500 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* SUMMARY */}
//         <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//           <h2 className="text-xl font-bold">
//             Total: ${totalPrice.toFixed(2)}
//           </h2>

//           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//             <button
//               onClick={() => {
//                 dispatch(clearCart());
//                 toast.success("Cart cleared");
//               }}
//               className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded"
//             >
//               Clear Cart
//             </button>

//            <Link
//              to="/checkout"
//              className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded text-center hover:bg-green-700"
//             >
//              Checkout
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 🛒 CART EMPTY
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className="text-xl mb-4">Your cart is empty 🛒</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {/* CART ITEMS */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center border-b pb-4"
            >
              {/* PRODUCT INFO */}
              <div className="flex items-center gap-4 sm:col-span-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h2 className="font-semibold text-sm sm:text-base line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm">${item.price}</p>
                </div>
              </div>

              {/* QUANTITY */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  −
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              {/* ITEM TOTAL */}
              <div className="text-center font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              {/* REMOVE */}
              <div className="text-center">
                <button
                  onClick={() => {
                    dispatch(removeFromCart(item.id));
                    toast.error("Item removed from cart");
                  }}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                dispatch(clearCart());
                toast.success("Cart cleared");
              }}
              className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded"
            >
              Clear Cart
            </button>

            <Link
              to="/checkout"
              className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded text-center hover:bg-green-700"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
