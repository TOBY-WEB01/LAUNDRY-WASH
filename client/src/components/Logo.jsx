import { useNavigate } from "react-router"



export default function Logo() {
    const navigate = useNavigate()
  return (
    <div className="" >
       <img src="./public/Frame 2.png" alt="logo" className=""  onClick={() => navigate("/")}/>
    </div>
  )
}
