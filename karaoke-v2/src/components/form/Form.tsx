import { useState } from "react";
import { useAppDispatch } from "../../redux/app/hooks";
import { addSong } from "../../redux/features/songSlice";

const Form = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [genre, setGenre] = useState("");

  const dispatch = useAppDispatch();

  const handleOnChangeTitle = (e:any) => {
    const value = e.target.value;
    setTitle(value);
  }
  const handleOnChangeArtist = (e:any) => {
    const value = e.target.value;
    setArtist(value);
  }
  const handleOnChangeVideo = (e:any) => {
    const value = e.target.value;
    setVideoLink(value);
  }
  const handleOnChangeAlbum = (e:any) => {
    const value = e.target.value;
    setAlbumCover(value);
  }
  const handleOnChangeGenre = (e:any) => {
    const value = e.target.value;
    setGenre(value);
  }

  const handleOnAdd = () => {
    const song = {
      title: title,
      artist: artist,
      videoLink: videoLink,
      albumCover: albumCover,
      genre: genre,
      views: 0
    }
    dispatch(addSong(song));
  }

  return(
    <div className="w-full bg-white py-12">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]">
        <form action="" className="form">
          <h1 className="md:text-6xl text-5xl pb-12 text-[#9F2DD3]">Add Song</h1>
          <div className="form-group">
            <input className="form-input" type="text" id="title" placeholder=" " value={title} onChange={handleOnChangeTitle}/>
            <label className="form-label">Title</label>
          </div>
          <div className="form-group">
            <input className="form-input" type="text" id="artist" placeholder=" " value={artist} onChange={handleOnChangeArtist}/>
            <label className="form-label">Artist</label>
          </div>
          <div className="form-group">
            <input className="form-input" type="text" id="video-link" placeholder=" " value={videoLink} onChange={handleOnChangeVideo}/>
            <label className="form-label">Video Link</label>
          </div>
          <div className="form-group">
            <input className="form-input" type="text" id="album-cover" placeholder=" " value={albumCover} onChange={handleOnChangeAlbum}/>
            <label className="form-label">Album Cover</label>
          </div>
          <div className="form-group">
            <input className="form-input" type="text" id="genre" placeholder=" " value={genre} onChange={handleOnChangeGenre}/>
            <label className="form-label">Genre</label>
          </div>
          <button className="px-8 py-3 rounded-md bg-[#9F2DD3] text-white font-bold hover:bg-[#6c1097] transition ease-in duration-200" onClick={handleOnAdd}>Submit</button> 
        </form>
      </div>
    </div>
  )
}

export default Form;

