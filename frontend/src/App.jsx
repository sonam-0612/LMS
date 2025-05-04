import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../src/pages/student/Home'
import CoursesList from '../src/pages/student/CoursesList'
import CourseDetails from '../src/pages/student/CourseDetails'
import MyEnrollments from '../src/pages/student/MyEnrollments'
import Player from '../src/pages/student/Player'
import Loading from '../src/components/student/Loading'
import Educator from '../src/pages/educator/Educator'
import Dashboard from '../src/pages/educator/Dashboard'
import AddCourse from '../src/pages/educator/AddCourse'
import MyCourses from '../src/pages/educator/MyCourses'
import StudentEnrolled from '../src/pages/educator/StudentsEnrolled'
import Navbar from './components/student/Navbar'
import SignIn from './components/auth/student/SignIn'
import SignOut from './components/auth/student/SignOut'
import "quill/dist/quill.snow.css"

const App = () => {
  const location = useLocation();
  const isEducatorRoute = location.pathname.startsWith('/educator');

  return (
    <div className='text-default min-h-screen bg-white text-black'>
      {!isEducatorRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signout' element={<SignOut />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />

        <Route path='/educator' element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-course' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentEnrolled />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
