import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authThunks";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

import {
  Home,
  ShoppingBag,
  ShoppingCart,
  Package,
  History,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

/* ================= HELPERS ================= */
const getUserName = (user) =>
  user?.email ? user.email.split("@")[0] : "";

const getUserInitial = (user) =>
  user?.email ? user.email[0].toUpperCase() : "?";

/* ================= COMPONENT ================= */
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const items = useSelector((state) => state.cart.items);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/");
    setOpen(false);
  };

  /* ================= PROTECTED ROUTE ================= */
  const handleProtectedRoute = (path) => {
    if (!isAuthenticated) {
      toast.warning("Please login to access this page.", {
        icon: "🔒",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      setOpen(false);
      return;
    }

    navigate(path);
    setOpen(false);
  };

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"
          >
            ShopEase
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-6 text-sm text-slate-300 ml-8">
            <Link to="/" className="flex items-center gap-2 hover:text-indigo-400">
              <Home size={18} /> Home
            </Link>

            <Link to="/products" className="flex items-center gap-2 hover:text-indigo-400">
              <ShoppingBag size={18} /> Products
            </Link>

            <button
              onClick={() => handleProtectedRoute("/orders")}
              className="flex items-center gap-2 hover:text-indigo-400"
            >
              <Package size={18} /> Orders
            </button>

            <button
              onClick={() => handleProtectedRoute("/orders-history")}
              className="flex items-center gap-2 hover:text-indigo-400"
            >
              <History size={18} /> History
            </button>
          </nav>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-4">

          {/* CART */}
          <Link to="/cart" className="relative" onClick={closeMenu}>
            <ShoppingCart
              size={22}
              className="text-slate-300 hover:text-indigo-400 transition"
            />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 min-w-[20px] flex items-center justify-center rounded-full px-1">
                {totalQty}
              </span>
            )}
          </Link>

          {/* AUTH */}
          {!isAuthenticated ? (
            <div className="hidden sm:flex gap-3">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>
                Register
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex gap-2 text-slate-200 hover:bg-slate-800"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-indigo-500 text-white">
                      {getUserInitial(user)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block">
                    {getUserName(user)}
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-48 bg-slate-900 border-slate-800 text-slate-200"
              >
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-300"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4">

          <div className="flex flex-col gap-4 text-slate-300 text-base">

            <Link to="/" onClick={closeMenu} className="hover:text-indigo-400">
              Home
            </Link>

            <Link to="/products" onClick={closeMenu} className="hover:text-indigo-400">
              Products
            </Link>

            <Link to="/cart" onClick={closeMenu} className="hover:text-indigo-400">
              Cart ({totalQty})
            </Link>

            <button
              onClick={() => handleProtectedRoute("/orders")}
              className="text-left hover:text-indigo-400"
            >
              Orders
            </button>

            <button
              onClick={() => handleProtectedRoute("/orders-history")}
              className="text-left hover:text-indigo-400"
            >
              History
            </button>

            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={closeMenu} className="hover:text-indigo-400">
                  Login
                </Link>

                <Link to="/register" onClick={closeMenu} className="hover:text-indigo-400">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-left text-red-400"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
