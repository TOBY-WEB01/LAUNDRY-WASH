import { useAuth } from "@/hooks/useAuth";
import {  Pencil } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import {profileLinks } from "@/utils/Constant";
import Logout from "@/components/Logout";

export default function ProfileLayout() {
  const { user} = useAuth();
  return (
    <>
    <div className="min-h-screen">

   
      <div className="mt-16 bg-(--bgGrey)  text-white py-8 px-4">
        <div className=" container  mx-auto py-10 px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="avatar avatar-placeholder">
              <div className="bg-black text-neutral-content w-24 rounded-full">
                {user?.avatar ? (
                  <img src={user?.avatar} alt={user?.fullname} loading="lazy" />
                ) : (
                  <span className="text-xl ">
                    {user?.fullname
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">
                {user?.fullname}
              </h1>
              <p>{user?.email}</p>
            </div>
          </div>
          <Pencil />
        </div>
      </div>
      <div className="container text-white mx-auto py-10 px-4 md:grid grid-cols-12 gap-4">
        <div className="col-span-3 flex flex-col gap-2">
          {profileLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-lg ${isActive ? "bg-(--purple)" : ""}`
              }
              end
            >
              <link.icon />
              {link.label}
            </NavLink>
          ))}
         <Logout/>
        </div>
        <div className="mt-10 md:mt-0 col-span-9">
          <Outlet />
        </div>
      </div>
       </div>
    </>
  );
}
