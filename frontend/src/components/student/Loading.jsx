import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      {/* Background Gradient */}
      {/* <div className='absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-cyan-100/70 to-transparent'></div> */}
      {/* Loading Spinner */}
      <div className='w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin'></div>
    </div>
  )
}

export default Loading
