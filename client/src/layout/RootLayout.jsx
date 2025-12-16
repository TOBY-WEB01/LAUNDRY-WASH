import Nav from "../components/Nav";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
