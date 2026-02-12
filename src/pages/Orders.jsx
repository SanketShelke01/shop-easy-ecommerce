

// import React, { useEffect, useState } from "react";
// import { ShoppingBag, Package } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../services/api";

// const Orders = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await api.get("/api/orders");
//         console.log("ORDERS:", res.data);
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Fetch orders failed:", err);

//         if (err.response?.status === 401) {
//           toast.error("Session expired. Login again.");
//           navigate("/login");
//         } else {
//           toast.error("Failed to load orders");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading orders...
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <ShoppingBag className="h-10 w-10 text-blue-600" />
//         <p className="mt-4">No orders yet</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {orders.map((order) => (
//           <div key={order.id} className="bg-white p-6 rounded-xl shadow">
//             <div className="flex justify-between mb-4">
//               <div>
//                 <p className="text-sm text-gray-500">Order #{order.id}</p>
//                 <p className="text-sm text-gray-500">
//                   {new Date(order.createdAt).toLocaleString()}
//                 </p>
//               </div>
//               <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
//                 {order.status}
//               </span>
//             </div>

//             <div className="divide-y">
//               {order.orderItems.map((item, idx) => (
//                 <div key={idx} className="flex justify-between py-3">
//                   <div className="flex gap-2 items-center">
//                     <Package className="h-4 w-4 text-gray-400" />
//                     <div>
//                       <p className="font-medium">{item.productName}</p>
//                       <p className="text-sm text-gray-500">
//                         Qty: {item.quantity}
//                       </p>
//                     </div>
//                   </div>
//                   <p className="font-semibold">
//                     ₹{(item.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-between border-t pt-4 mt-4 font-bold">
//               <span>Total</span>
//               <span>₹{order.totalAmount.toFixed(2)}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React, { useEffect, useState } from "react";
import { ShoppingBag, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders");
        console.log("ORDERS:", res.data);

        // ✅ ALWAYS ENSURE ARRAY
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Fetch orders failed:", err);

        if (err.response?.status === 401) {
          toast.error("Session expired. Login again.");
          navigate("/login");
        } else {
          toast.error("Failed to load orders");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <ShoppingBag className="h-10 w-10 text-blue-600" />
        <p className="mt-4">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white p-6 rounded-xl shadow"
          >
            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order #{order.orderId}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                {order.status ?? "PENDING"}
              </span>
            </div>

            {/* ITEMS */}
            <div className="divide-y">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="flex justify-between py-3">
                  <div className="flex gap-2 items-center">
                    <Package className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex justify-between border-t pt-4 mt-4 font-bold">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
