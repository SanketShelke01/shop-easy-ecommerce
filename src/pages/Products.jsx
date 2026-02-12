import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productThunks";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Fetch products + scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProducts());
  }, [dispatch]);

  const isInCart = (id) =>
    cartItems.some((item) => item.id === id);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart 🛒");
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* ✅ FIXED TYPO */}
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Our Products
      </h1>

      {/* ✅ CENTERED & RESPONSIVE GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => {
          const added = isInCart(product.id);

          return (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2 capitalize">
                    {product.category}
                  </span>

                  <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                    {product.title}
                  </h2>

                  <p className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </Link>

              <div className="p-5 pt-0 mt-auto">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={added}
                  className={`w-full py-2 rounded-lg font-semibold
                    transition-all duration-200 active:scale-95
                    ${
                      added
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  {added ? "Already in Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
