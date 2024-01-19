import { SongCard } from ".."
import Slider from "react-slick";
import { useAppSelector } from "../../redux/app/hooks";

const PopularSongs = () => {

  const songs = useAppSelector(state => state.songs.songs);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    }
  ]
  };

  return(
    <div className="w-full bg-[#dfabf5] py-32">
      <div className="md:max-w-[1480px] m-auto max-w-[600px]">
        <h1 className="text-3xl py-3 font-bold ">Most Popular <span className="text-[#9F2DD3]">Songs</span></h1>
        <Slider {...settings}>
          {
            songs.slice(0, 10).map((s, id) => {
              return(
                <SongCard song={s} key={id}/>
              )
            })
          }
        </Slider>
      </div>
    </div>
  )
}

export default PopularSongs