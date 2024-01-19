import { useAppDispatch } from "../../redux/app/hooks";
import type { Song } from "../../redux/features/songSlice";
import { addSongToQueue } from "../../redux/features/songSlice";
import { useNavigate } from "react-router-dom"

type Props = {
  song: Song
}

const SongCard: React.FC<Props> = ({song}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(addSongToQueue(song));
    navigate("/karaoke");
  }

  return (
    <div className="bg-white drop-shadow-md overflow-hidden rounded-2xl mr-2 my-4 hover:cursor-pointer" onClick={handleClick}>
      <img className="h-40 w-full object-cover" src={song.albumCover} alt="album-cover" />
      <div className="p-5">
        <h1 className="py-2 truncate">{song.title}</h1>
        <h2>{song.artist}</h2>
      </div>
      <div className="absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold">
        {song.genre}
      </div>
    </div>

  )
}

export default SongCard;