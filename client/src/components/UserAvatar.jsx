import { useAuth } from "@/hooks/useAuth";
import { ChevronDown, Lock, LogOut, Notebook, User } from "lucide-react";
import { Link } from "react-router";


export default function UserAvatar() {
const {user, handleLogout}=useAuth()
  return (

          <div className="flex gap-2 items-center">
            <div className="avatar avatar-placeholder">
              <div className="bg-black text-neutral-content w-10 rounded-full">
                {user?.avatar ? (
                  <img src={user?.avatar} alt={user?.fullname} loading="lazy" />
                ) : (
                  <span className="text-xl text-white">
                    {user?.fullname
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()}{" "}
                  </span>
                )}
              </div>
            </div>
            <div className="hidden  md:block dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost capitalize  p-1 text-white"
              >
                {user?.fullname} <ChevronDown />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-(--darkgrey) rounded-box z-1 w-52 p-2 shadow-sm  text-white"
              >
                <li>
                  <Link to="/profile">
                    <div className="flex gap-2 items-center">
                      <User />
                      <span>Profile</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/book-laundry">
                    <div className="flex gap-2 items-center">
                      <Notebook />
                      <span>Book Laundry</span>
                    </div>
                  </Link>
                </li>
                {user?.role === "admin" && (
                  <li>
                    <Link to="/admin">
                      <div className="flex gap-2 items-center">
                        <Lock />
                        <span>Admin</span>
                      </div>
                    </Link>
                  </li>
                )}
                <li>
                  <div
                    className="flex gap-2 items-center"
                    role="button"
                    aria-label="logout button"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
  )
}
