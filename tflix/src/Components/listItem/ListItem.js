import React, { useState } from "react";
import "./listItem.scss";
import PlayCircleFilledWhiteOutlinedIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import AddIcon from "@material-ui/icons/Add";
import ReactPlayer from "react-player";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListItem = ({ index, item }) => {
  const [ishovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  // const trailer = "https://youtu.be/Gdzif0Px_qY";

  useEffect(() => {
    const movieItem = async () => {
      try {
        const res = await axios.get(`movies/find/` + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDhjODE4YTdlNTcwMmFlODJlZDM2OCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Mjg3MTAzODAsImV4cCI6MTYyOTE0MjM4MH0.nGVCyxB4CrK--nCkD_00EOBiGKeKuK23adVj8aPt7mY",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    movieItem();
  }, [item]);

  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: ishovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.img} alt="" />
        {ishovered && (
          <>
            {" "}
            <ReactPlayer
              className="video"
              url={movie.trailer}
              playing={true}
              width="100%"
              height="55%"
            />
            ;
            <div className="itemInfo">
              <div className="icons">
                <PlayCircleFilledWhiteOutlinedIcon className="icon" />
                <ThumbUpAltOutlinedIcon className=" icon" />
                <ThumbUpOutlinedIcon className="icon" />
                <AddIcon className=" icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">{movie.limit}</span>
                <span>{movie.createdAt}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
