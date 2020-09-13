import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { WebContext } from "./Routes";

const Edit = () => {
  const { movie, setMovie } = useContext(WebContext);
  const [dataShowed, setDataShowed] = useState(null);
  const [search, setSearch] = useState({
    value: "",
    data: [],
  });
  const [input, setInput] = useState({
    title: "",
    decription: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0,
    image_url: "",
    id: -1,
  });

  useEffect(() => {
    if (movie !== null) {
      setDataShowed(movie);
    }
  }, [movie]);

  const searchHandler = (event) => {
    event.preventDefault();
    if (
      search.value !== null ||
      search.value !== undefined ||
      search.value !== ""
    ) {
      var data = movie.filter((el) =>
        el.title.toLowerCase().includes(search.value.toLowerCase().trim())
      );
      if (data !== null || data !== undefined) {
        console.log(movie);
        console.log(data);
        setSearch({ ...search, data });
        setDataShowed(data);
      }
    } else {
      setDataShowed(movie);
      setSearch({
        value: "",
        data: [],
      });
    }
  };

  const searchInputHandler = (event) => {
    var value = event.target.value;
    setSearch({ ...search, value });
  };

  const editHandler = (event) => {
    var id = parseInt(event.target.value);
    var data = movie.filter((el) => el.id === id)[0];
    console.log(id);
    var title = data.title;
    var description = data.description;
    var year = data.year;
    var duration = data.duration;
    var genre = data.genre;
    var rating = data.rating;
    var image_url = data.image_url;
    setInput({
      title,
      description,
      year,
      duration,
      genre,
      rating,
      image_url,
      id,
    });
    console.log(input);
  };

  const deleteHandler = (event) => {
    var id = parseInt(event.target.value);
    var data = movie.filter((el) => el.id !== id);
    console.log(data);
    setMovie([...data]);
    axios
      .delete(`http://backendexample.sanbercloud.com/api/movies/${id}`)
      .then((res) => {
        console.log(res.status);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    var id = input.id;
    var title = input.title;
    var description = input.description;
    var year = input.year;
    var duration = input.duration;
    var genre = input.genre;
    var rating = input.rating;
    var image_url = input.image_url;
    var data = [
      {
        title,
        description,
        year,
        duration,
        genre,
        rating,
        image_url,
      },
    ];
    console.log("data:" + data[0]);
    if (id === -1) {
      axios
        .post("http://backendexample.sanbercloud.com/api/movies", {
          ...data[0],
        })
        .then((result) => {
          data = [{ ...data[0], id: result.data.id }];
          setMovie([...movie, ...data]);
          console.log(result);
        });
    } else {
      var newMovie = movie.map((el) => {
        if (id === el.id) {
          el = { ...data[0], id };
        }
        return el;
      });
      setMovie([...newMovie]);
      axios
        .put(`http://backendexample.sanbercloud.com/api/movies/${id}`, {
          ...data[0],
        })
        .then((result) => {
          console.log(result);
          console.log(movie);
        });
    }
    setInput({
      title: "",
      description: "",
      year: 2020,
      duration: 120,
      genre: "",
      rating: 0,
      image_url: "",
      id: -1,
    });
  };

  const editTitle = (event) => {
    const title = event.target.value;
    setInput({ ...input, title });
  };

  const editDescription = (event) => {
    const description = event.target.value;
    setInput({ ...input, description });
  };

  const editYear = (event) => {
    const year = parseInt(event.target.value);
    setInput({ ...input, year });
  };

  const editDuration = (event) => {
    const duration = parseInt(event.target.value);
    setInput({ ...input, duration });
  };

  const editGenre = (event) => {
    const genre = event.target.value;
    setInput({ ...input, genre });
  };

  const editRating = (event) => {
    const rating = parseInt(event.target.value);
    setInput({ ...input, rating });
  };

  const editImage = (event) => {
    const image_url = event.target.value;
    setInput({ ...input, image_url });
  };

  return (
    <>
      <div className="container center">
        <section>
          <div className="search-wrapper">
            <form onSubmit={searchHandler}>
              <input
                type="text"
                onChange={searchInputHandler}
                value={search.value}
                style={{ marginRight: "10px" }}
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <h1 className="center">Daftar Film</h1>
          <table className="center table-edit">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Year</th>
                <th>Duration</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataShowed !== null &&
                dataShowed.map((el, index) => {
                  var desc;
                  if (el.description !== undefined && el.description !== null) {
                    desc =
                      el.description.length > 20
                        ? el.description.substr(0, 20).concat("...")
                        : el.description;
                  }

                  return (
                    <tr key={el.id}>
                      <td>{++index}</td>

                      <td>{el.title}</td>
                      <td>{desc}</td>
                      <td>{el.year}</td>
                      <td>{el.duration}</td>
                      <td>{el.genre}</td>
                      <td>{el.rating}</td>
                      <td>
                        <button value={el.id} onClick={editHandler}>
                          Edit
                        </button>
                        <button value={el.id} onClick={deleteHandler}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
        <section>
          <h1 className="center">Movies Form</h1>
          <form onSubmit={submitHandler} style={{ width: "80%" }}>
            <table className="center">
              <tbody>
                <tr>
                  <td>Title :</td>
                  <td>
                    <input
                      type="text"
                      value={input.title !== null ? input.title : undefined}
                      onChange={editTitle}
                      required="required"
                      className="fl-right w-70"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Description :</td>
                  <td>
                    <textarea
                      type="text"
                      row="30"
                      value={input.description}
                      onChange={editDescription}
                      className="fl-right w-70"
                      required="required"
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>Year :</td>
                  <td>
                    <input
                      min="1980"
                      type="number"
                      value={input.year !== null ? input.year : 2020}
                      onChange={editYear}
                      required="required"
                      className="fl-right w-30"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Duration :</td>
                  <td>
                    <input
                      type="number"
                      value={input.duration !== null ? input.duration : 0}
                      onChange={editDuration}
                      required="required"
                      className="fl-right w-30"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Genre :</td>
                  <td>
                    <input
                      type="text"
                      value={input.genre !== null ? input.genre : undefined}
                      onChange={editGenre}
                      required="required"
                      className="fl-right w-70"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Rating :</td>
                  <td>
                    <input
                      type="number"
                      max="10"
                      min="0"
                      value={input.rating !== null ? input.rating : 0}
                      onChange={editRating}
                      required="required"
                      className="fl-right w-30"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Image Url :</td>
                  <td>
                    <textarea
                      name=""
                      id=""
                      rows="5"
                      value={
                        input.image_url !== null ? input.image_url : undefined
                      }
                      onChange={editImage}
                      required="required"
                      className="fl-right w-70"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Edit;
