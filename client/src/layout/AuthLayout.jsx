import LogoTwo from "@/components/LogoTwo";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <section className="lg:grid  grid-cols-12 items-center justify-center min-h-screen auth-background auth-layout">
      <div
        className="col-span-6 h-full "
        style={{ backgroundImage: "url('/image 9.png')" }}
      >
        <div className="flex flex-col h-full justify-between py-4 px-6">
          <div className="flex justify-center">
            <Link>
          
              <LogoTwo />
            </Link>
          </div>
          <div className="backdrop-blur-xs bg-white/0 border border-white/30 rounded-xl py-6 px-6 hidden lg:flex items-center gap-5">
            <div className="flex w-[24%] text-white">
              <div className="flex items-center gap-2">
                <img src="/Ellipse 5.png" alt="" />
                <div className="flex flex-col text-xs space-y-1">
                  <p className="font-semibold">Zoe Saldana</p>
                  <p>Galazy Guardian</p>
                </div>
              </div>
            </div>
            <div className="w-[70%] text-white">
              <h1 className="font-semibold">
                A lifesaver for my busy schedule
              </h1>
              <p className="text-xs mt-2 w-full">
                I drop my clothes in the moning and pick them up perfectly
                folded by evening. Everything smells fresh, and not a single
                sock goes missing. Honestly, this service has saved me hours
                every week.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 p-4">
        <div>
          <Outlet />
        </div>
      </div>
    </section>
  );
}
