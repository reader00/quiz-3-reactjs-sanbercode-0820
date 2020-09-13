import React, { useContext, useEffect } from "react";
import { WebContext } from "./Routes";

const Home = () => {
  const { movie } = useContext(WebContext);
  var default_img =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

  useEffect(() => {
    console.log();
  });

  return (
    <>
      <section>
        <h1>Featured Posts</h1>
        <div id="article-list">
          {movie !== null &&
            movie.map((el) => {
              var image =
                el.image_url !== null &&
                el.image_url !== undefined &&
                el.image_url.includes("http")
                  ? el.image_url
                  : default_img;
              return (
                <div key={el.id}>
                  <h3 style={{ textAlign: "center" }}>{el.title}</h3>
                  <div style={{ float: "left" }}>
                    <img src={image} alt="" className="movie-image" />
                  </div>
                  <p>
                    <b>Durasi:</b> {el.duration}
                  </p>
                  <p>
                    <b>Genre:</b> {el.genre}
                  </p>
                  <p>
                    <b>Tahun:</b> {el.year}
                  </p>
                  <p>
                    <b>Rating:</b> {el.rating}
                  </p>
                  <p style={{ clear: "both" }}>{el.description}</p>
                </div>
              );
            })}
        </div>
      </section>
      <footer>
        <h5>copyright &copy; 2020 by Sanbercode</h5>
      </footer>
    </>
  );
};

export default Home;
