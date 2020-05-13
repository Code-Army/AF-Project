import React, {useState} from "react";
import { FaStar } from "react-icons/fa"

const StarRating = (props) =>  {

    const [rating,setRating] = useState(null);
    return <div>
        {[...Array(5)].map((star,j)=> {
            const ratingValue = j+1;
            return(
            <label>
                <input type="radio" name="rating" value={ratingValue} onClick={() => (setRating(ratingValue),props.value)}/>
                <FaStar classname="star" color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'} size={20} value={props.value} />
            </label>
            );
        })}

    </div>
}

export default StarRating;