import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import UserAvatar from "./UserAvatar";
import Drawer from "./Drawer";

export default function Nav() {
  const { user, handleLogout } = useAuth();

  return (
    <div className="w-full  fixed z-10 top-0 bg-[#262626] md:px-8">
      <div className="container  mx-auto  flex  items-center justify-between gap-20 md:gap-5  py-2 px-2.5 md:px-0 lg:py-4">
        <div className="">
          <Link>
            <Logo />
          </Link>
        </div>
        <div className="text-white space-x-10 lg:space-x-10 md:space-x-3    hidden lg:block ">
          <Link>Services</Link>
          <Link>About Us</Link>
          <Link>Contact Us</Link>
          {user ? (
            <NavLink
              to="/book-laundry"
              className={({ isActive }) =>
                isActive ? "text-(--purple) font-semibold " : "text-white"
              }
            >
              Book Laundry
            </NavLink>
          ) : null}
        </div>
        <div className="flex items-center  justify-between gap-2">
          <div className="  lg:block">
            {user ? (
              <UserAvatar />
            ) : (
              <div className="hidden  md:flex gap-4   md:gap-0  md:space-x-3   ">
                <Link
                  to="/auth/createAccount"
                  className="text-white border-0 rounded-3xl  md:px-6 md:py-2 bg-(--purple)"
                >
                  Sign Up
                </Link>
                <Link
                  to="/auth/login"
                  className="text-(--purple) border rounded-3xl md:px-6 md:py-2"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
          <Drawer handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}
