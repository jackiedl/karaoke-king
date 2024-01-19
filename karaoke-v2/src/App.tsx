import { useEffect } from "react";
import { useAppDispatch } from "./redux/app/hooks";
import { Navbar, Footer, Home, Karaoke, Layout, Form, Results }from "./components"
import "./App.css";
import { getSongs } from "./redux/features/songSlice";
import { Route, Routes, useLocation } from "react-router-dom";

function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

const App = () => {
  const dispatch = useAppDispatch();
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
            <Route path="/special" element={<Form />}></Route>
          </Route>
        </Routes>
      <Footer />
    </>
  )
}

export default App
