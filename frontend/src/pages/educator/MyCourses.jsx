import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'

const MyCourses = () => {

  const { currency, allCourses, } = useContext(AppContext)
  const [courses, setCourses] = useState(null)


  const fetchEductorCourses = async () => {
    setCourses(allCourses)
  }

  useEffect(() => {
    fetchEductorCourses()
  },[allCourses])


  return courses ? (
    <div className='h-screen flex flex-col items-start justify-between gap-8 md:p-8 mb:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
          <table className='table-fixed md:table-auto w-full overflow-hidden'>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
              <tr className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                <th className='px-4 py-3 font-semibold truncate'>Students</th>
                <th className='px-4 py-3 font-semibold truncate'>Published On</th>
              </tr>
            </thead>
            <tbody className='tetx-sm text-gray-500'>
              {courses.map((course) => (
                <tr key={course._id} className='border-b border-gray-500/20 text-sm text-left'>
                  <td className='flex items-center md:px-4 pl-2 md:pl-4 py-3 space-x-3 truncate'>
                    <img src={course.courseThumbnail} alt="Course Image" className='w-16' />
                    <span className='truncate hidden md:block'>{course.courseTitle}</span>
                  </td>
                  {/* <td className='px-4 py-3'>{currency}{Math.floor(course.enrolledstudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}</td> */}
                  <td className='px-4 py-3'> {currency} {Math.floor( (course?.enrolledstudents?.length || 0) * ((course?.coursePrice || 0) - ((course?.discount || 0) * (course?.coursePrice || 0) / 100))  )}</td>
                  <td className='px-4 py-3'>{course.enrolledstudents?.length}</td>
                  <td className='px-4 py-3'>{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default MyCourses
