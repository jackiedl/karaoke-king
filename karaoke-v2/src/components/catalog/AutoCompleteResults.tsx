import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import { handleOnChange } from "../../redux/features/searchSlice";
import { addSongToQueue } from "../../redux/features/songSlice";
import { useNavigate } from "react-router-dom"

const AutoCompleteResults = () => {
  const text = useAppSelector(state => state.search.text);
  const result = useAppSelector(state => state.search.results);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const suggestionSelected = (value: any) => {
      dispatch(handleOnChange(""));
      dispatch(addSongToQueue(value));
      navigate("/karaoke");
  }

  const renderResults  = () => {
      return (
          <ul className="m-0 whitespace-nowrap">
          {result.slice(0, 5).map((item: any, i: any) => 
              <li className="px-[1.25rem] text-[1.2rem] text-[#222] text-2xl hover:bg-[rgba(0,0,0,0.05)] cursor-pointer" 
                  onClick={() => suggestionSelected(item)}  key={i + item.title}>
                  {item.title}
              </li>)}
          </ul>
      )
  }

  if (result.length === 0 || text.length === 0){
      return <></>;
  }

  return(
      <div className="bg-[#ffffff] outline-none border-none text-[1rem] rounded-xl">
          {renderResults()}
      </div>
  )
}

export default AutoCompleteResults;