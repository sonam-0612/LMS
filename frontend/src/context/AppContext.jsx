import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext('null')

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(true)
    const [enrolledCourses, setEnrolledCourses] = useState([])

    // fetch all courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    // const fetchAllCourses = async () => {
    //     const updatedCourses = dummyCourses.map(course => ({
    //       ...course,
    //       id: course._id, // normalize _id to id
    //     }));
    //     setAllCourses(updatedCourses);
    //   };

    const calculateRating = (course) => {
        if ( !course || !Array.isArray(course.courseRatings) || course.courseRatings.length === 0 ) {
          return 0;
        }
      
        const validRatings = course.courseRatings
          .map(r => Number(r.rating))
          .filter(r => !isNaN(r));
      
        if (validRatings.length === 0) return 0;
      
        const total = validRatings.reduce((sum, r) => sum + r, 0);
        return (total / validRatings.length).toFixed(1);
    };

    // Function to calculate course chapter time
    const calculateChapterTime = (chapter)=>{
        let time = 0
        chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration )
        return humanizeDuration(time * 60 * 1000, {units: ["h","m"]})
    }

    // Function to calculate course duration
    const calculateCourseDuration = (course)=>{
        let time=0
        course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture) => time += lecture.lectureDuration))
        return humanizeDuration(time * 60 * 1000, {units: ["h","m"]})
    }

 
    // Function to calculate the total number of lectures in the course
    const calculateNoOfLectures = (course)=>{
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)){
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    }


    //fetch user enrolled courses
    const fetchEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllCourses()
        fetchEnrolledCourses()
    }, [])

    const value = {
        currency, allCourses, navigate, calculateRating, isEducator, setIsEducator,
        calculateChapterTime, calculateCourseDuration, calculateNoOfLectures, enrolledCourses,
        fetchEnrolledCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}