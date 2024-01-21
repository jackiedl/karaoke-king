import { useState } from "react";
import { logo, lock, menu, close} from "../../assets";
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { logout } from "../../redux/features/authSlice";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const isLogged = useAppSelector(state => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = () => {
    setToggle(!toggle);
  }

  const handleToHome = () => {
    navigate("/");
  }

  const handleToCatalog = () => {
    navigate("/results")
  }

  const handleToLogin = () => {
    navigate("/auth/login")
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login")
  }

  return(
    <div className="w-full h-[80px] bg-white border-b">
      <div className="md:max-w-[1480px] max-w-[500px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        <img className="h-[25px] hover:cursor-pointer" src={logo} alt="logo" onClick={handleToHome}/>
        
        <div className="hidden md:flex">
          <div className="hidden md:flex items-center">
            <ul className="flex gap-4"> 
              <li className="hover:cursor-pointer" onClick={handleToHome}>Home</li>
              <li className="hover:cursor-pointer">About</li>
              <li className="hover:cursor-pointer" onClick={handleToCatalog}>Catalog</li>
              <li className="hover:cursor-pointer">Contact</li>
            </ul>
          </div>
          {
            !isLogged ? 
            <button className="flex justify-between items-center bg-transparent px-6 gap-2" onClick={handleToLogin}>
              <img src={lock} alt="lock"/>
              Login
            </button> :
            <button className="flex justify-between items-center bg-transparent px-6 gap-2" onClick={handleLogout}>
              <img src={lock} alt="lock"/>
              Logout
            </button>
          }
          {/* <button className="px-8 py-3 rounded-md bg-[#9F2DD3] text-white font-bold">Register</button> */}
        </div>

        <div className="md:hidden hover:cursor-pointer" onClick={handleClick}>
          <img src={toggle ? close : menu} alt="menu"/>
        </div>

      </div>

      <div className={toggle ? "absolute z-10 p-4 bg-white w-full px-8 md:hidden" : "hidden"}>
        <ul>
            <li className="p-4 hover:bg-gray-100 hover:cursor-pointer" onClick={handleToHome}>Home</li>
            <li className="p-4 hover:bg-gray-100 hover:cursor-pointer">About</li>
            <li className="p-4 hover:bg-gray-100 hover:cursor-pointer" onClick={handleToCatalog}>Catalog</li>
            <li className="p-4 hover:bg-gray-100 hover:cursor-pointer">Contact</li>
            <div className="flex flex-col my-4 gap-4">
              <button className="border border-[#9F2DD3] flex justify-center items-center bg-transparent px-6 py-4 gap-2" onClick={handleToLogin}>
                <img src={lock} alt="lock"/>
                Login
              </button>
              {/* <button className="px-8 py-5 rounded-md bg-[#9F2DD3] text-white font-bold">Register</button> */}
            </div>
        </ul>
      </div>
    
    </div>
  )
}

export default Navbar;