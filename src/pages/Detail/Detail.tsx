import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IDetail, IRating, getId } from "../../api/generated-api";
import Spinner from "../../components/Spinner/Spinner";
import Grid from "../../components/Grid/Grid";
import PreviewImage from "../../components/PreviewImage/PreviewImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import styles from "./Detail.module.scss";
import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/helpers";

const searchByID = async (id: string, signal: AbortSignal) => {
  try {
    const res = await getId(id, {}, { signal: signal });
    return res;
  } catch (err) {
    console.error(err);
  }
};

const Detail = () => {
  const { id } = useParams();
  const [likedMovie, setLikedMovie] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<IDetail | null>(null);
  const [loadingDetail, setloadingDetail] = useState<boolean>(false);

  useEffect(() => {
    const likedMovies = loadFromLocalStorage();
    if (likedMovies && id) {
      if (likedMovies.includes(id)) {
        setLikedMovie(true);
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    if (id) {
      setloadingDetail(true);
      searchByID(id, controller.signal)
        .then((res) => {
          if (res) {
            setMovieDetails(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setloadingDetail(false);
        });
    }

    return () => {
      controller.abort();
      setloadingDetail(false);
    };
  }, [id]);

  return (
    <>
      <Grid textAlign={"-webkit-center"}>
        {loadingDetail ? (
          <Spinner />
        ) : movieDetails ? (
          <>
            <Grid
              container
              textAlign={"start"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Grid item xs={6} sm={6} md={6} lg={6} textAlign={"end"}>
                <h1>{movieDetails.Title}</h1>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} textAlign={"end"}>
                <FontAwesomeIcon
                  size={"3x"}
                  icon={likedMovie ? faHeart : faHeartBroken}
                  className={likedMovie ? styles.liked : styles.notLiked}
                  onClick={() => {
                    if (likedMovie) {
                      removeFromLocalStorage(movieDetails.imdbID);
                      setLikedMovie(false);
                    } else {
                      saveToLocalStorage(movieDetails.imdbID);
                      setLikedMovie(true);
                    }
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4} sm={4} md={4} lg={4} textAlign={"end"}>
                {movieDetails.Poster !== "N/A" ? (
                  <PreviewImage
                    src={movieDetails.Poster}
                    alt={"Not Avaliable"}
                  />
                ) : (
                  <>
                    <PreviewImage
                      src="/movie-clip.png"
                      alt={"Default"}
                      width={400}
                    />
                  </>
                )}
              </Grid>
              <Grid item textAlign={"end"} className={styles.list}>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Actors:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Actors}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Awards:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Awards}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>BoxOffice:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.BoxOffice}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Country:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Country}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>DVD:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Dvd}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Director:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Director}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Genre:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Genre}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Language:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Language}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Metascore:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Metascore}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Plot:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Plot}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Production:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Production}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Rated:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Rated}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Ratinngs:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    {movieDetails.Ratings.map((rating: IRating) => {
                      return (
                        <div key={rating.Source}>
                          {rating.Source} ==&gt; {rating.Value}
                        </div>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Released:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Released}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Runtime:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Runtime}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Type:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Type}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Website:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Website}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>Year:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.Year}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>IMDB ID:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.imdbID}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>IMDB Rating:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.imdbRating}</div>
                  </Grid>
                </Grid>
                <Grid container textAlign={"start"}>
                  <Grid item className={styles.key}>
                    <div>IMDB Votes:</div>
                  </Grid>
                  <Grid item className={styles.detail}>
                    <div>{movieDetails.imdbVotes}</div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : null}
      </Grid>
    </>
  );
};

export default Detail;
