import React from "react";
import { History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrdersHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <History className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        {/* MESSAGE */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          No Order History Available
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed">
          Your order history will be displayed here once your orders
          have been successfully placed and processed.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate("/products")}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Browse Products
        </button>
      </div>
    </div>
  );
};

export default OrdersHistory;
