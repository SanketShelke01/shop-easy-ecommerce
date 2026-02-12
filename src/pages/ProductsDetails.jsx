// import React from 'react'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom';
// import { fetchProductById } from '../features/products/productThunks';
// import { clearSelectedProduct } from '../features/products/productSlice';
// import { Link } from "react-router-dom";
// import { addToCart } from '../features/cart/cartSlice';
// import { toast } from 'react-toastify';


// const ProductsDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
  
//   const { selectedProduct, loading, error } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchProductById(id));
    
//     return () => {
//       dispatch(clearSelectedProduct());
//     };
//   }, [dispatch, id]
//   );

//   if(loading || !selectedProduct){
//     return <div className='min-h-screen flex justify-center items-center'>Loading...</div>
    
//   }

//   if(error){
//     return <div className='min-h-screen flex justify-center items-center text-red-500'>Error: {error}</div>
//   }

//   const handleAddToCart = () => {
//     dispatch(addToCart({
//       id: selectedProduct.id,
//       title: selectedProduct.title,
//       price: selectedProduct.price,
//       image: selectedProduct.image,
    
//   }));
//     toast.success("Product added to cart!");

//   }
// return (
//   <div className="min-h-screen bg-gray-100 py-8 px-4">

//     {/* PRODUCT CARD */}
//     <div className="
//       max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden
//       flex flex-col md:flex-row mb-10
//     ">

//       {/* IMAGE */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
//         <img
//           src={selectedProduct.image}
//           alt={selectedProduct.title}
//           className="w-64 h-64 sm:w-72 sm:h-72 object-contain"
//         />
//       </div>

//       {/* CONTENT */}
//       <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col">

//         {/* Category */}
//         <span className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-2">
//           {selectedProduct.category}
//         </span>

//         {/* Title */}
//         <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
//           {selectedProduct.title}
//         </h1>

//         {/* RATING + REVIEW COUNT (FETCHED DATA ONLY) */}
//         <div className="flex items-center gap-2 mb-4">
//           <div className="flex text-yellow-400">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <svg
//                 key={star}
//                 className={`w-5 h-5 ${
//                   star <= Math.round(selectedProduct.rating?.rate)
//                     ? "fill-current"
//                     : "fill-gray-300"
//                 }`}
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.049 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
//               </svg>
//             ))}
//           </div>

//           <span className="text-sm text-gray-600">
//             {selectedProduct.rating?.rate} out of 5
//           </span>

//           <span className="text-sm text-gray-500">
//             ({selectedProduct.rating?.count} reviews)
//           </span>
//         </div>

//         {/* Description */}
//         <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
//           {selectedProduct.description}
//         </p>

//         {/* Price */}
//         <div className="mb-6">
//           <span className="text-2xl sm:text-3xl font-bold text-gray-900">
//             ${selectedProduct.price}
//           </span>
//         </div>

//         {/* ACTIONS */}
//         <div className="mt-auto flex flex-col sm:flex-row gap-4">
//           <button onClick={handleAddToCart} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition">
//             Add to Cart
//           </button>

//           <Link
//             to="/products"
//             className="text-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
//           >
//             Back to Products
//           </Link>
//         </div>
//       </div>
//     </div>

//     {/* REVIEWS SUMMARY (API-BASED) */}
//     <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
//       <h2 className="text-xl font-bold text-gray-900 mb-4">
//         Customer Reviews
//       </h2>

//       <p className="text-gray-600">
//         ⭐ {selectedProduct.rating?.rate} average rating based on{" "}
//         <span className="font-semibold">
//           {selectedProduct.rating?.count}
//         </span>{" "}
//         customer reviews.
//       </p>

//       <p className="text-sm text-gray-500 mt-2">
//         Individual customer reviews are not available.
//       </p>
//     </div>
//   </div>
// );


// }

// export default ProductsDetails

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchProductById } from '../features/products/productThunks'
import { clearSelectedProduct } from '../features/products/productSlice'
import { addToCart } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'

const ProductsDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  )

  const cartItems = useSelector((state) => state.cart.items)

  useEffect(() => {
    dispatch(fetchProductById(id))

    return () => {
      dispatch(clearSelectedProduct())
    }
  }, [dispatch, id])

  if (loading || !selectedProduct) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Error: {error}
      </div>
    )
  }

  const isInCart = cartItems.some(
    (item) => item.id === selectedProduct.id
  )

  const handleAddToCart = () => {
    if (isInCart) {
      toast.info("Product already in cart 🛒")
      return
    }

    dispatch(
      addToCart({
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
      })
    )

    toast.success("Product added to cart!")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* PRODUCT CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row mb-10">
        {/* IMAGE */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="w-64 h-64 sm:w-72 sm:h-72 object-contain"
          />
        </div>

        {/* CONTENT */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col">
          <span className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-2">
            {selectedProduct.category}
          </span>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            {selectedProduct.title}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(selectedProduct.rating?.rate)
                      ? 'fill-current'
                      : 'fill-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.049 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
                </svg>
              ))}
            </div>

            <span className="text-sm text-gray-600">
              {selectedProduct.rating?.rate} out of 5
            </span>

            <span className="text-sm text-gray-500">
              ({selectedProduct.rating?.count} reviews)
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            {selectedProduct.description}
          </p>

          {/* PRICE */}
          <div className="mb-6">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              ${selectedProduct.price}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`px-6 py-3 rounded-lg transition active:scale-95
                ${
                  isInCart
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              {isInCart ? 'Already in Cart' : 'Add to Cart'}
            </button>

            <Link
              to="/products"
              className="text-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>

      {/* REVIEWS SUMMARY */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Customer Reviews
        </h2>

        <p className="text-gray-600">
          ⭐ {selectedProduct.rating?.rate} average rating based on{' '}
          <span className="font-semibold">
            {selectedProduct.rating?.count}
          </span>{' '}
          customer reviews.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Individual customer reviews are not available.
        </p>
      </div>
    </div>
  )
}

export default ProductsDetails
