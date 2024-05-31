import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
const RatingCard = ({rate,review}) => {
  return (
    <div className=" flex space-x-5 items-center ">
    <span className="flex text-yellow-400">
      {rate >= 1 ? (
        <AiFillStar />
      ) : rate >= 0.5 ? (
        <BsStarHalf />
      ) : (
        <AiOutlineStar />
      )}
      {rate >= 2 ? (
        <AiFillStar />
      ) : rate >= 1.5 ? (
        <BsStarHalf />
      ) : (
        <AiOutlineStar />
      )}
      {rate >= 3 ? (
        <AiFillStar />
      ) : rate >= 2.5 ? (
               <BsStarHalf />
        ) : (
          <AiOutlineStar />
        )}
        {rate >= 4 ? (
          <AiFillStar />
        ) : rate >= 3.5 ? (
          <BsStarHalf />
        ) : (
          <AiOutlineStar />
        )}
        {rate >= 5 ? (
          <AiFillStar />
        ) : rate >= 4.5 ? (
          <BsStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </span>
      <span className="text-sm">
        {review} views
      </span>
    </div>
  )
}

export default RatingCard