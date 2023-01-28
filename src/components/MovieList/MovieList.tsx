import { Link } from "react-router-dom";
import { ISearchData } from "../../api/generated-api";
import Grid from "../Grid/Grid";
import MoviePreview from "../MoviePreview/MoviePreview";
import styles from "./MovieList.module.scss";

interface IMovieList {
  movies: ISearchData[];
}

const MovieList = ({ movies }: IMovieList) => {
  return (
    <Grid>
      {movies
        ? movies.map((movie: ISearchData) => {
            return (
              <Grid item className={styles.preview} key={movie.imdbID}>
                <Link className={styles.link} to={`/movie/${movie.imdbID}`}>
                  <MoviePreview searchData={movie} />
                </Link>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default MovieList;
