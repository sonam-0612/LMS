import React, { useRef, useEffect, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'

const AddCourse = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [Image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

  const handleChapetr = (action, chapterId)=> {
    if (action === 'add') {
      const title = prompt('Enter chapter title');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: true,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) => chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter)
      )
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent = chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  }

  const addLecture = () => {
    setChapters(prevChapters =>
      prevChapters.map(chapter => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent[chapter.chapterContent.length - 1].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture], // immutably add
          };
        }
        return chapter;
      })
    );
  
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    // initiate quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])



  return (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 mb:pb-0 p-4 pt-8 pb-0 overflow-scroll'>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4 max-w-full text-gray-500'
        action="">
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input className='outline-none md:py-2.5 py-2 px-3 border border-gray-500/20 rounded-md'
            onChange={(e) => setCourseTitle(e.target.value)} value={courseTitle}
            placeholder='Course Title' type="text" required />
        </div>
        <div className='flex flex-col gap-1'>
          <p>Course description</p>
          <div ref={editorRef}></div>
        </div>

        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500'
              onChange={e => setCoursePrice(e.target.value)} value={coursePrice} type="number" placeholder='0' required />
          </div>

          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
              <img className='p-3 bg-blue-500 rounded'
                src={assets.file_upload_icon} alt="" />
              <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden />
              <img src={Image ? URL.createObjectURL(Image) : `` } alt="" />
            </label>
          </div>
        </div>

        <div>
          <p>Discount %</p>
          <input onChange={e => setDiscount(e.target.value)} value={discount}
            className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500'
            type="number" placeholder='0' min={0} max={100} required />
        </div>

        {/* adding chapters and lectures */}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div className='bg-white border rounded-lg mb-4'
              key={chapterIndex}>
              <div className='flex justify-between items-center p-4 border-b'>
                <div className='flex items-center'>
                  <img onClick={() => handleChapetr('toggle', chapter.chapterId)}  className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`} 
                    src={assets.dropdown_icon} width={14} alt="" />
                  <span className='font-semibold'>{chapterIndex + 1} {chapter.chapterTitle}</span>
                </div>
                <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
                <img src={assets.cross_icon} onClick={() => handleChapetr('remove', chapter.chapterId)} alt="" className='cursor-pointer' />
              </div>
              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                      <span>
                        {lectureIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank' className='text-blue-500'>Link</a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                      </span>
                      <img src={assets.cross_icon} onClick={()=> handleLecture('remove', chapter.chapterId, lectureIndex)} alt="" className='cursor-pointer' />
                    </div>
                  ))}
                  <div className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2' onClick={()=>handleLecture('add', chapter.chapterId)}>+ Add Lecture</div>
                </div>
              )}
            </div>
          ))}
          <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer' onClick={()=>handleChapetr('add')}>+ Add Chapter</div>

          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
              <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
                <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>

                <div className='mb-2'>
                  <p>Lecture Title</p>
                  <input onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                    value={lectureDetails.lectureTitle}
                    className='mt-1 block w-full border rounded py-1 px-2'
                    type="text" />
                </div>

                <div className='mb-2'>
                  <p>Duration (minutes)</p>
                  <input onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                    value={lectureDetails.lectureDuration}
                    className='mt-1 block w-full border rounded py-1 px-2'
                    type="number" />
                </div>

                <div className='mb-2'>
                  <p>Lecture URL</p>
                  <input onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                    value={lectureDetails.lectureUrl}
                    className='mt-1 block w-full border rounded py-1 px-2'
                    type="text" />
                </div>

                <div className='flex gap-2 my-4'>
                  <p>Is Preview Free?</p>
                  <input type="checkbox" onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                    checked={lectureDetails.isPreviewFree} className='mt-1 scale-125' />
                </div>
                <button className='w-full bg-blue-400 text-white px-2 py-2 rounded' type='button' onClick={addLecture} >Add</button>
                <img onClick={() => setShowPopup(false)} className='absolute top-4 right-4 w-4 cursor-pointer'
                src={assets.cross_icon} alt="" />
              </div>
            </div>
          )}
        </div>

        <button className='bg-black text-white w-max py-2.5 px-8 rounded my-4' 
        type='submit'>ADD</button>
      </form>
    </div>
  )
}

export default AddCourse
