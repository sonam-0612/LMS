import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='flex md:flex-row flex-col-reverse items-center justify-center md:justify-between text-left w-full px-8 border-t'>
      {/* left section */}
      <div className='flex items-center py-4 gap-6 md:ml-13.5'>
        <img className='hidden md:block w-28 lg:w-32'
          src={assets.logo} alt="logo" />
        <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
        <p className='py-4 text-center text-xs md:text-lg text-gray-500'>
          &copy; 2023 EduTech. All rights reserved.
        </p>
      </div>

      {/* right section */}
      <div className='flex items-center gap-3 max-md:mt-4 md:mr-13.5'>
        
          <a href="facebook.com" target='_blank'><img src={assets.facebook_icon} alt="facebook_icon" /></a>
          <a href="twitter.com" target='_blank'><img src={assets.twitter_icon} alt="twitter_icon" /></a>
          <a href="instagram.com" target='_blank'><img src={assets.instagram_icon} alt="instagram_icon" /></a>
        
      </div>
    </footer>
  )
}

export default Footer
