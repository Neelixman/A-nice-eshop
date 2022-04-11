import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars, reviews}) => {
  const [starsArr, setStarsArr] = useState([])

  
  useEffect(() => {
    // const tempStars = Array.from({length:5}, (_, index) => {
    //   return (
    //     <span key={index}>{stars >= index + 1 ? <BsStarFill  /> : stars >= index + 0.5 ? <BsStarHalf  /> : <BsStar  />}</span>
    //   )
    // })

    const tempStars = []
    for(let i = 0; i < 5; i++) {
      const star = <span key={i}>{stars >= i + 1 ? <BsStarFill  /> : stars >= i + 0.5 ? <BsStarHalf  /> : <BsStar  />}</span>;
      tempStars.push(star)
    }
    
    setStarsArr(tempStars);
  }, [stars])


  return <Wrapper>
    <div className="stars">
      {starsArr}
    </div>
    <p className="reviews">
      ({reviews} customer reviews)
    </p>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
