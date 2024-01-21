import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/app/hooks";
import { Navbar, Footer, Home, Karaoke, Layout, Form, Results, Login }from "./components"
import "./App.css";
import { getSongs } from "./redux/features/songSlice";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { add } from "./assets";

function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);


  const handleOnClick = () => {
    navigate("/addSong")
  }

  useEffect(() => {
    dispatch(getSongs());
  },[dispatch])

  useScrollToTop();
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/karaoke" element={<Karaoke />}></Route>
            <Route path="/results" element={<Results />}></Route>
            <Route path="/addSong" element={<Form />}></Route>
            <Route path="/auth/login" element={<Login />}></Route>
          </Route>
        </Routes>
      <Footer />
      {isLoggedIn && location.pathname !== "/addSong" ?
        <div className="fixed bottom-[10vh] right-[15vw] hover:cursor-pointer "
            onClick={handleOnClick}>
        <img className="w-[50px] bg-[rgba(0,0,0,0.08)] rounded-full" src={add} alt="add icon"/>
      </div> : null
      }
    </>
  )
}

export default App
