import { AutoComplete } from "..";
import { heroImg } from "../../assets";

const Hero = () =>{
  return(
    <div className="w-full bg-white py-24">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]">
        <div className="flex flex-col justify-start gap-4">

          <p className="py-2 text-2xl text-[#9F2DD3] font-medium">START SINGING</p>

          <h1 className="md:leading-[72px] py-4 md:text-6xl text-5xl font-semibold">
            Access To <span className="text-[#9F2DD3]">100+</span> songs from <span className="text-[#9F2DD3] ">50+</span> Artists & Albums
          </h1>

          <p className="py-2 text-lg text-gray-600">Easy and free to use! </p>
          <AutoComplete show={true} hero={true}/>
        </div>
        <img className="md:order-last order-first" src={heroImg} alt="heroimg" />
      </div>
    </div>
  )
}

export default Hero;