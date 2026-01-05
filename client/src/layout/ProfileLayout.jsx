import { NavLink, Outlet } from "react-router";
import { profileLinks } from "@/utils/Constant";
import Logout from "@/components/Logout";
import UploadAvatar from "@/pages /profile/UploadAvatar";
import Footer from "@/components/Footer";

export default function ProfileLayout() {
  return (
    <>
      <div className="min-h-screen">
        <div className="mt-16 bg-(--bgGrey)  text-white py-8 px-4">
          <UploadAvatar />
        </div>
        <div className="container text-white mx-auto py-10 px-4 md:grid grid-cols-12 gap-4">
          <div className="col-span-3 flex flex-col gap-2">
            {profileLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  `transition-all duration-300 ease-in p-3 flex items-center gap-2 rounded-lg ${
                    isActive ? "bg-(--purple)" : ""
                  }`
                }
                end
              >
                <link.icon />
                {link.label}
              </NavLink>
            ))}
            <Logout />
          </div>
          <div className="mt-10 md:mt-0 col-span-9">
            <Outlet />
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
}
