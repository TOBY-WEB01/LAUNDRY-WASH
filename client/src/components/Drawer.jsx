import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Logo from "./Logo";
import { NavLink } from "react-router";

export default function Drawer({ handleLogout}) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  return (
    <>
      <Menu onClick={() => setIsOpen(true)} className="lg:hidden text-white" />
      <div
        className={`drawer fixed top-0 bg-(--darkgrey) left-0 z-40 ${
          isOpen ? "drawer-open" : ""
        }`}
      >
        <input
          id="my-drawer-1"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsOpen(false)}
          ></label>
          <div className="menu bg-(--navBg) text-base-content min-h-full w-90 p-4">
            <Logo />
            <button
              className="absolute right-3 top-8 btn btn-circle btn-sm btn-ghost"
              onClick={() => setIsOpen(false)}
            >
              <X className="text-white" />
            </button>
            {user ? (
              <div className="mt-6">
                <h1 className="text-xl text-white font-semibold capitalize">
                  Hi, {user.fullname}
                </h1>
                <div className="flex flex-col text-white  mt-4 gap-3">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="font-medium text-xl"
                  >
                    Profile
                  </Link>

                  <div className="flex flex-col  gap-3 text-xl text-white">
                    {/* <a>Services</a>
                    <a>About Us</a>
                    <a>Contact Us</a> */}
                    {user && (
                      <NavLink
                        to="/book-laundry"
                        style={({ isActive }) => ({
                          color: isActive ? "rgb(98, 85, 236)" : "white",
                          textDecoration: "none",
                        })}
                      >
                        Book Laundry
                      </NavLink>
                    )}
                  </div>
                  <div className="text-xl">
                    <Link to="/admin">Admin</Link>
                  </div>
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="font-medium text-xl text-white mt-5"
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col mt-10 gap-4 text-white ">
                {" "}
                <Link to="/auth/createAccount" className="font-medium text-xl">
                  Sign Up
                </Link>
                <Link to="/auth/login" className="font-medium text-xl">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
