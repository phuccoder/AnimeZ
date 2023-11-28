import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import * as Config from "../ultis/config";

export default function AnimeWatch() {
  const { id } = useParams();
  const [animeList, setAnimeList] = useState([]);
  console.log(id);

  useEffect(() => {
    function getData() {
      axios
        .get(`${Config.API_URL}/Film/` + id)
        .then((response) => response.data)
        .then((data) => {
          setAnimeList(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }

    getData();
  }, [id]);

  return (
    <div>
      <div style={{ color: "white", marginTop: "40px", fontSize: "50px" }}>
        HERE IS: {animeList.name}{" "}
      </div>
      <iframe
        width="900"
        height="500"
        src={animeList.clip}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
