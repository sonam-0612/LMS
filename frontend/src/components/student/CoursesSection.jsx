import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3 mb-5 md:mb-10'>Discover our top-rated course across various categories. From coding and design to <br /> business and wellnes, our courses are crefted to deliver results.</p>

      <div className='grid grid-cols-2 md:flex px-4 md:px-0 md:my-16 my-10 gap-4 space-y-10 md:space-y-0'>
        {allCourses.slice(0, 4).map((course,index) => <CourseCard key={index} course={course}/>)}
      </div>

      <Link className='text-gray-800 border border-gray-500/30 shadow shadow-gray-400 px-10 py-3 rounded hover:bg-gray-500 hover:text-white'
      to={'/course-list'} onClick={()=> scrollTo(0,0)}>Show all courses</Link>
    </div>
  )
}

export default CoursesSection
