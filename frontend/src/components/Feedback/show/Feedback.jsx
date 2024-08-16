import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import "./Feedback.css";
import Review from "../Components/Review";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@chakra-ui/react";

export default function Docc(props) {
  let navigate = useNavigate();
  const Port = "https://expensive-hem-elk.cyclic.app/";
  const [reviews, setreviews] = useState([]);
  function routeChange() {
    let path = "/details/" + props.prescid;
    console.log(path);
    navigate(path);
  }
  useEffect(() => {
    axios.get(Port + "/api/user/rating").then((resp) => {
      console.log(resp.data);
      setreviews(resp.data.reverse());
    });
  }, []);
  return (
    <div>
      {reviews.map((dat) => {
        return (
          
          <Review
            bg='black'
            uid={dat.uid}
            rating={dat.rating.toString()}
            feedback={dat.feedback}
          />
          
        );
      })}
    </div>
  );
}
