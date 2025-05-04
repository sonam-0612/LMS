import React, {useContext} from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {

  const { currency, calculateRating } = useContext(AppContext)

  return (
    <Link to={`/course/${course._id}`} onClick={()=> scrollTo(0,0)} 
    className='border bordergray500/30 pb-6 overflow-hidden rounded-lg shadow shadow-gray-400 hover:shadow-lg hover:shadow-gray-500/50 transition duration-300 ease-in-out flex flex-col space-y-3'>
      <img className='w-full' src={course.courseThumbnail} alt="" />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.courseTitle }</h3>
        <p className='text-gray-500'>{course.educator.name }</p>
        <div className='flex items-center space-x-2'>
          <p>{calculateRating(course)}</p>
          <div className='flex items-center space-x-1'>
            {/* Assuming assets.star is the path to the star icon */}
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt="star_icon" 
              className='w-3.5 h-3.5' />
            ))}
          </div>
          <p className='text-gray-500'>{course.courseRatings.length}</p>
        </div>
        <p className='text-base font-semibold text-gray-800'>{currency}{(course.coursePrice - course.discount * course.coursePrice /100).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default CourseCard
