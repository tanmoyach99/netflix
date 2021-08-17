import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Featured from "../featured/Featured";
import List from "../list/List";
import Navbar from "../Navbar/Navbar";

import "./home.scss";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenres] = useState(null);

  useEffect(() => {
    const getRandomList = async () => {
      try {
        const response = await axios.get(
          `lists${type ? "?type" + type : ""}${genre ? "&genre=" + genre : ""}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDhjODE4YTdlNTcwMmFlODJlZDM2OCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Mjg3MTAzODAsImV4cCI6MTYyOTE0MjM4MH0.nGVCyxB4CrK--nCkD_00EOBiGKeKuK23adVj8aPt7mY",
            },
          }
        );
        // console.log(response);
        setLists(response.data);
      } catch (err) {
        // console.log(err);
      }
    };
    getRandomList();
  }, [genre, type]);
  // console.log(lists);
  return (
    <div className="home">
      <Navbar></Navbar>
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
