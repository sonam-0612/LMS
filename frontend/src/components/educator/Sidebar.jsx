import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const Sidebar = () => {

  const {isEducator} = useContext(AppContext)

  const menuItems = [
    { id: 1, name: 'Dashboard', path: '/educator', icon: assets.home_icon},
    { id: 2, name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon},
    { id: 3, name: 'My Courses', path: '/educator/my-course', icon: assets.my_course_icon},
    { id: 4, name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon},
  ];


  return isEducator && (
    <div className='flex flex-col w-16 md:w-60 border-r min-h-screen text-base border-gray-500 py-2'>
      {menuItems.map((item)=> (
        <NavLink className={({isActive}) => `flex items-center md:flex-row flex-col md:justify-start py-3.5 md:px-10 gap-3 ${isActive ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90' : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'}`}
        to={item.path} key={item.id} end={item.path === '/educator'} >
          <img src={item.icon} alt="" className='w-6 h-6' />
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
