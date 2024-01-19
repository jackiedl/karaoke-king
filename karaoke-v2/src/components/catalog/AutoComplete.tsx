import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import { search, handleOnChange } from "../../redux/features/searchSlice";
import AutoCompleteResults from "./AutoCompleteResults";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom"

type Props = {
  show: boolean,
  hero: boolean,
}

const AutoComplete:React.FC<Props>  = ({show, hero}) => {
  const songs = useAppSelector(state => state.songs.songs);
  const text = useAppSelector(state => state.search.text);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const OnChange = (e: any) => {
      const value = e.target.value;
      let  suggestion;
      if (value.length > 0){
          const val = value.replace(/[\][)(\\]/g, "");
          const regex = new RegExp(`^${val}`, "i")
          suggestion = songs.filter( v => regex.test(v.title));
          dispatch(search(suggestion));
      }
      dispatch(handleOnChange(value));
  }

  const handleClick = () => {
    if(hero) navigate("/results");
  }

  return(
      <div className="bg-white border md:w-[90%] w-full input-box-shadow rounded-md flex flex-col">
          <div className="w-full flex items-center">
            <input 
              className="md:w-[90%] w-full h-full p-4 outline-none p-[1.25rem] rounded-md grow"
              value={text} onChange={OnChange} type="text" autoComplete="off">  
            </input>
            <button className="md:w-[5%] w-[10%]" onClick={handleClick}>
              <AiOutlineSearch size={25} className="icon" style={{color: '#000'}}/>
            </button>
          </div>
          {show ? <AutoCompleteResults /> : null}
      </div>
      
  )

}

export default AutoComplete;