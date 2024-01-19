import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import {logo} from "../../assets";

const Footer = () => {
  return(
    <div className='w-full bg-white py-16'>
      <div className='md:max-w-[1480px] m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2  gap-8 max-w-[600px]  px-4 md:px-0'>
        <div className='col-span-2'>
          <img src={logo} alt="logo" className="h-[25px]" />
          <h3 className='text-2xl font-bold mt-10'>Contact Us</h3>
          <h3 className='py-2 text-[#6D737A]'>Call : 123 456 7890</h3>
          <h3 className='py-2 text-[#363A3D]'>Email: example@mail.com</h3>
          <div className='flex gap-4 py-4'>
            <div className='p-4 bg-[#edd5f7] rounded-xl hover:cursor-pointer'><FaGithub size={25} style={{color:'#9F2DD3'}} /></div>
            <div className='p-4 bg-[#edd5f7] rounded-xl hover:cursor-pointer'><FaInstagram size={25} style={{color:'#9F2DD3'}} /></div>
            <div className='p-4 bg-[#edd5f7] rounded-xl hover:cursor-pointer'><FaLinkedin size={25} style={{color:'#9F2DD3'}} /></div>
            <div className='p-4 bg-[#edd5f7] rounded-xl hover:cursor-pointer'><FaInstagram size={25} style={{color:'#9F2DD3'}} /></div>
            <div className='p-4 bg-[#edd5f7] rounded-xl hover:cursor-pointer'><FaFacebook size={25} style={{color:'#9F2DD3'}} /></div>
          </div>
        </div>
        <div>
          <h3 className='text-2xl font-bold'>Explore</h3>
          <ul className='py-6 text-[#6D737A]'>
            <li className='py-2 hover:cursor-pointer'>Home</li>
            <li className='py-2 hover:cursor-pointer'>About</li>
            <li className='py-2 hover:cursor-pointer'>Catalog</li>
            <li className='py-2 hover:cursor-pointer'>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className='text-2xl font-bold'>Genres</h3>
            <ul className='py-6 text-[#6D737A]'>
              <li className='py-2 hover:cursor-pointer'>Alternative</li>
              <li className='py-2 hover:cursor-pointer'>C-Pop</li>
              <li className='py-2 hover:cursor-pointer'>Hip-Hop</li>
              <li className='py-2 hover:cursor-pointer'>Holiday</li>
              <li className='py-2 hover:cursor-pointer'>K-Pop</li>
              <li className='py-2 hover:cursor-pointer'>Rock</li>
              <li className='py-2 hover:cursor-pointer'>Pop</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer;