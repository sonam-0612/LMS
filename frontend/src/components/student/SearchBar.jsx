import React, {useState} from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : '')

  const onSerachHandler = (e) => {
    e.preventDefault()
    navigate(`/course-list/${input}`)
    // if(input.length === 0) return
    // navigate(`/course-list/${input}`)
  }


  return (
      <form onSubmit={onSerachHandler} action="" className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500 rounded shadow-md shadow-gray-500'>
        <img src={assets.search_icon} alt="search_icon" className='md:w-auto w-10 px-3'/>
        <input onChange={e => setInput(e.target.value)} value={input} 
        type="text" placeholder='Search for the courses' className='w-full h-full outline-none text-gray-500/80'  required/>
        <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1 hover:cursor-pointer hover:bg-blue-500'>Search</button>
      </form>
  )
}

export default SearchBar
