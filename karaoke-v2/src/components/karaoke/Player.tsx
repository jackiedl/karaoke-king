import ReactPlayer from "react-player";
import { PlayerCard } from "..";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { playNextSong } from "../../redux/features/songSlice";

const Player = () =>{
  const current = useAppSelector(state => state.songs.current);
  const queue = useAppSelector(state => state.songs.queue);
  
  const dispatch = useAppDispatch();

  const playNext = () => {
    dispatch(playNextSong());
  }

  return(
    <div className="w-full bg-white py-24">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-3 max-w-[600px] gap-2">
        <div className="col-span-2">
          <ReactPlayer 
            className="react-player"
            url={current ? current.videoLink : ""}
            playing={true}
            controls
            onEnded={playNext}
            width="100%"
            height="41vh"
          />
        </div>
        <div className="bg-black rounded-xl md:col-span-1 col-span-2">
          <div className="bg-[#212121] rounded-xl">
            <h1 className="text-2xl px-2 py-3 text-white">Playing Next</h1>
          </div>
          <div className="max-h-[37vh] overflow-x-hidden overflow-y-scroll scroll">
            {queue.map((s, id)=>{
              return(
                <PlayerCard song={s} queueId={id+1} key={id}/>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player;