import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import keys from "../secret/key";
import { useEffect, useState } from "react";

type Movie = {
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
};

const MovieDetailPage = () => {
  //
  const [castAndCrew, setCastAndCrew] = useState<any>();
  const [movieDetails, setMovieDetails] = useState<any>();
  const { id } = useParams<{ id: string | any }>();

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(keys.BASE_URL + `movie/${id}/credits`, {
          params: {
            api_key: keys.API_KEY,
          },
        });
        setCastAndCrew(response.data);
        response = await axios.get(keys.BASE_URL + `movie/${id}`, {
          params: {
            api_key: keys.API_KEY,
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        alert("Something went wrong please try again later");
        
      }
    })();
  }, []);

  const movies = useSelector(
    (state: { upcomingMovies: { value: [] } }) => state.upcomingMovies.value
  );

  const movieId = parseInt(id);

  //   const selectedMovie: Movie = movies.find((movie: { id: number }) => movie.id === movieId ) as undefined as unknown as Movie

  const selectedMovie = movies.find(
    (movie: { id: number }) => movie.id === movieId
  )!;

  // Now you can directly use `selectedMovie` without type assertions
  const movie: Movie = selectedMovie;

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const getCast = () => {
    return castAndCrew?.cast?.map((actor: any) => actor.name).join(", ");
  };

  const getMovieLengthYearDirector = () => {
    const runtime = movieDetails?.runtime;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    const releaseYear = new Date(movieDetails?.release_date).getFullYear();

    const directorDetails = castAndCrew?.crew?.find(
      (member: any) => member.job === "Director"
    );

    return (
      hours +
      " Hr " +
      minutes +
      " min  | " +
      releaseYear +
      " | " +
      directorDetails?.name
    );
  };
  return (
    <div className="movie-detail-container">
      <img className="img" src={keys.IMAGE_URL + movie?.poster_path} alt={movie?.title} />

      <div className="movie-details">
        <div className="movie-title-rating">
          <h1 className="movie-title">{movie?.title}</h1>
          <div className="movie-rating">Rating: {movie?.vote_average}</div>
        </div>
        <div>
          <div> {getMovieLengthYearDirector()}</div>
          <br></br>
          <div>
            {" "}
            <b>Cast : </b>
            {getCast()}
          </div>
        </div>
        <p className="movie-overview">
          {" "}
          <b>Description : </b>
          {movie?.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieDetailPage;
