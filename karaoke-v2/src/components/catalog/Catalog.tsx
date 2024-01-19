import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import { useInView } from "react-intersection-observer";
import { addSongToQueue } from "../../redux/features/songSlice";
import type { Song } from "../../redux/features/songSlice";
import { useNavigate } from "react-router-dom"

const Catalog = () => {
  const {ref: myRef, inView: myElementIsVisble} = useInView();

  const [page, setPage] = useState(1);
  const songs = useAppSelector(state => state.songs.songs);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (e: Song) => {
    dispatch(addSongToQueue(e));
    navigate("/karaoke");
    window.scrollTo(0, 0);
  }

  useEffect(() =>{
    if (!myElementIsVisble) return ()=>{};
    const interval = setInterval(()=>{
      setPage(page+1)
    }, 1000);
    return () => clearInterval(interval);
  },[myElementIsVisble, page])

  return (
    <div className="w-full bg-white py-24">
      <div className="md:max-w-[1480px] m-auto max-w-[600px] gap-2">
        <h1 className="py-4 md:text-3xl text-2xl font-semibold"> Check out other songs</h1>
        {
            songs.slice(0, 10*page).map((s, id) => {
              return(
                <div className="drop-shadow-md text-black rounded-xl grid grid-cols-7 py-3 hover:cursor-pointer" key={id} onClick={() => handleClick(s)}>
                  <img className="h-40 w-40 py-2 md:col-span-1 col-span-3" src={s.albumCover} alt="cover"/>
                  <div className="md:col-span-5 col-span-4">
                    <p className="py-2 px-2 font-bold text-xl">{s.title}</p>
                    <p className="px-2 text-sm text-[#aaa]">{s.artist}</p>
                  </div>
                </div>
              )
            })
          }
      </div>
      <div ref={myRef}></div>
    </div>
  )
}

export default Catalog;