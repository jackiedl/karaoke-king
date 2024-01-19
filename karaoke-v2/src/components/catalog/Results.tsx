import { AutoComplete, Catalog } from "..";
import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import { addSongToQueue } from "../../redux/features/songSlice";
import { handleOnChange } from "../../redux/features/searchSlice";
import type { Song } from "../../redux/features/songSlice";
import { useNavigate } from "react-router-dom"

const Results = () => {
  const text = useAppSelector(state => state.search.text);
  const result = useAppSelector(state => state.search.results);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (e: Song) => {
    dispatch(handleOnChange(""));
    dispatch(addSongToQueue(e));
    navigate("/karaoke");
    window.scrollTo(0, 0);
  }

  return(
    <div className="w-full bg-white py-24">
      <div className="md:max-w-[1480px] m-auto max-w-[600px]">
        <AutoComplete show={false} hero={false}/>
        {
          result.length === 0 || text.length === 0 ? <></> :
          result.slice(0,5).map((s, id) => {
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
        <Catalog />
      </div>
    </div>
  )
}

export default Results;