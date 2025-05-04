import React, {useEffect, useState} from 'react'

const Rating = ({initialRating, onRate}) => {

  const [rating, setRating] = useState(initialRating || 0); // Example rating value

  const handleRating = (value) => {
    setRating(value);
    if (onRate) {
      onRate(value); 
    }
  }

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating); // Update rating when initialRating changes
    }
  }, [initialRating]);

  return (
    <div>
      {Array.from({length: 5}, (_,index)=> {
        const starValue = index + 1;
        return (
          <span onClick={() => handleRating(starValue)}
           className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
          key={index}>
            &#9733; {/* Unicode for filled star */}
          </span>
        )
      })}
    </div>
  )
}

export default Rating
