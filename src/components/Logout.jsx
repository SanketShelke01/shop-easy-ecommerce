// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authThunks";
import { Button } from "../components/ui/button";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 text-center">
        <h2 className="text-2xl font-bold text-white">Logout</h2>
        <p className="text-slate-400 mt-3">
          Are you sure you want to logout?
        </p>

        <Button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Logout;
