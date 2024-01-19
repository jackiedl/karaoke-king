import type { Song } from "../../redux/features/songSlice";
import { useAppDispatch } from "../../redux/app/hooks";
import { playThisSong } from "../../redux/features/songSlice";

type Props = {
  song: Song
  queueId: number
}

const PlayerCard: React.FC<Props> = ({song, queueId}) => {
  const dispatch = useAppDispatch();

  const playSong = () => {
    dispatch(playThisSong(queueId-1))
  }

  return (
    <div className="text-white rounded-xl grid grid-cols-7" onClick={playSong}>
      <div className="col-span-2 grid grid-cols-3">
        <p className="text-base text-center py-6 px-2">{queueId}</p>
        <img className="h-20 py-2 col-span-2" src={song.albumCover} alt="cover"/>
      </div>
      <div className="col-span-5">
        <p className="py-2 px-2 font-bold text-xl">{song.title}</p>
        <p className="px-2 text-sm text-[#aaa]">{song.artist}</p>
      </div>
    </div>
  )
}

export default PlayerCard;