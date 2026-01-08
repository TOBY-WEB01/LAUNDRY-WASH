import LogoTwo from "@/components/LogoTwo";
import { Link, Outlet } from "react-router";

export default function ForgetLayout() {
  return (
    <div
      className="bg-cover h-screen"
      style={{ backgroundImage: "url('/image 9.png')" }}
    >
      <div className=" mx-auto flex justify-center pt-10 ">
        <Link>
          <LogoTwo />
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
