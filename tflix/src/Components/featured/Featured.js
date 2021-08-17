import React, { useState } from "react";
import "./featured.scss";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useEffect } from "react";
import axios from "axios";

const Featured = ({ type }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContents = async () => {
      try {
        const res = await axios.get(`/movies/random/?type=${type}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDhjODE4YTdlNTcwMmFlODJlZDM2OCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Mjg3MTAzODAsImV4cCI6MTYyOTE0MjM4MH0.nGVCyxB4CrK--nCkD_00EOBiGKeKuK23adVj8aPt7mY",
          },
        });
        setContent(res.data[0]);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContents();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span> {type === "movies" ? "Movies" : "Series"} </span>
          <select name="genre" id="genre">
            <option>genre </option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">horror</option>
            <option value="romance">romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="animation">Animation</option>
            <option value="western">Western</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/95/Matrix_logo.svg"
          alt=""
        />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon /> <span>play</span>
          </button>
          <button className="more">
            <InfoOutlinedIcon />
            <span>more</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
