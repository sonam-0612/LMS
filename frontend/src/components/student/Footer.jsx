import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start justify-center py-10 px-8 md:px-0 gap-10 md:gap-32 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'>
          <img src={assets.logo_dark} alt="logo" />
          <p className='mt-6 text-center md:text-left text-sm text-white/80'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa cumque aut accusantium molestiae? Esse maxime, mollitia, architecto obcaecati amet cumque eos et velit voluptatum hic vel excepturi rerum non repellat.</p>
        </div>
        <div className='flex flex-col items-center md:items-start w-full'>
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
          <p className='text-sm text-white/80'>The latest news, articles and resources sent to your inbox weekly.</p>
          <div className='flex items-center gap-2 pt-4'>
            <input type="email" placeholder='Enter your email' className='border border-gray-500/30 bg-gray-800 text-sm text-gray-500 placeholder-gray-500 outline-none w-64 h-9 px-2 py-2 rounded-md mt-4' />
            <button className='bg-blue-600 text-white rounded-md mt-4 w-24 h-9 hover:bg-blue-800 hover:cursor-pointer'>Subscribe</button>
          </div>
        </div>
      </div>
      <p className='py-4 text-center text-xs md:text-sm text-white/60'>Copyright 2025 @Derrick_Vision. All right reserved.</p>
    </footer>
  )
}

export default Footer
