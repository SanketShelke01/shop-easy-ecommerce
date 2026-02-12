import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Men's Fashion",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Women's Fashion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Electronics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Accessories",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
  },
];

const reviews = [
  {
    name: "Amit Sharma",
    text: "Amazing quality products and super fast delivery!",
  },
  {
    name: "Neha Patil",
    text: "Loved the UI and checkout experience. Very smooth.",
  },
  {
    name: "Rahul Verma",
    text: "Best prices compared to other sites. Highly recommended.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-slate-950 text-slate-100">
      {/* HERO / SHOPPING BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Discover Your Style with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              ShopEase
            </span>
          </h1>

          <p className="mt-6 text-slate-400 max-w-lg">
            Premium shopping experience with modern design, trusted brands,
            and secure checkout.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 transition"
            >
              Explore Deals
            </button>
          </div>
        </div>

        {/* ✅ BANNER IMAGE (ALWAYS VISIBLE) */}
       
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center md:text-left">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => navigate("/products")}
              className="relative group overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="h-64 w-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-xl font-semibold">{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">
          What Our Customers Say
        </h2>

        <div className="max-w-xl mx-auto bg-slate-900 p-8 rounded-xl">
          <p className="text-slate-300 italic">
            “{reviews[reviewIndex].text}”
          </p>
          <h4 className="mt-4 font-semibold text-indigo-400">
            — {reviews[reviewIndex].name}
          </h4>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold">🚚 Free Delivery</h3>
            <p className="text-slate-400 mt-2">
              Free shipping on orders above ₹999
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">🔒 Secure Payments</h3>
            <p className="text-slate-400 mt-2">
              100% secure & trusted payment gateways
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">↩ Easy Returns</h3>
            <p className="text-slate-400 mt-2">
              7-day hassle-free returns
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

