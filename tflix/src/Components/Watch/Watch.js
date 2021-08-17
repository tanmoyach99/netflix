import React from "react";
import ReactPlayer from "react-player";
import "./watch.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const movie = location.movie;

  return (
    <div className="watch">
      <Link to="/home">
        <div className="back">
          <ArrowBackIcon />
          home
        </div>
      </Link>
      <ReactPlayer
        className="video"
        url={movie?.video}
        playing={false}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Watch;
