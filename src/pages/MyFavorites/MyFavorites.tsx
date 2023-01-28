import Grid from "../../components/Grid/Grid";
import Box from "../../components/Box/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { IDetail, getId } from "../../api/generated-api";
import { likedMoviesIDsFromLocalStorage } from "../../utils/helpers";

const searchByID = async (likedMoviesIDs: string[], signal: AbortSignal) => {
  try {
    const promises: IDetail[] = likedMoviesIDs.map((id: string): any => {
      return getId(id, {}, { signal: signal }).then((res) => {
        return res.data;
      });
    });

    const data = await Promise.all(promises);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const MyFavorites = () => {
  const [data, setData] = useState<IDetail[]>([]);
  const [dataSlice, setDataSlice] = useState<IDetail[]>([]);
  const [dataCount, setDataCount] = useState<number>(0);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [maxPageNumber, setMaxPageNumber] = useState<number>(1);

  const createDataSlice = (currPage: number, data: IDetail[]) => {
    return data.slice(currPage * 10 - 10, currPage * 10 - 1);
  };

  useEffect(() => {
    const controller = new AbortController();

    const likedMoviesIDs = likedMoviesIDsFromLocalStorage();
    setMaxPageNumber(Math.ceil(likedMoviesIDs.length / 10));
    setDataCount(likedMoviesIDs.length);

    setIsDataLoaded(false);
    setLoadingData(true);
    searchByID(likedMoviesIDs, controller.signal)
      .then((res) => {
        if (res) {
          setData(res);
          setIsDataLoaded(true);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }, []);

  useEffect(() => {
    setDataSlice(createDataSlice(pageNumber, data));
  }, [data, pageNumber]);

  const updatePageNumber = (updatedPageNumber: number) => {
    if (updatedPageNumber >= 1 && updatedPageNumber <= maxPageNumber)
      setPageNumber(updatedPageNumber);
  };

  return (
    <>
      <Grid
        container
        spacing="sm"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"center"}>
          <Box>
            <h1>
              Liked Movies <FontAwesomeIcon icon={faHeart} />
            </h1>
          </Box>

          <Grid justifyContent={"flex-start"} textAlign={"start"}>
            <MovieList movies={dataSlice} />
          </Grid>
          <Grid textAlign={"-webkit-center"}>
            <Box>
              {loadingData ? (
                <Spinner />
              ) : isDataLoaded ? (
                dataCount > 0 ? (
                  <Pagination
                    currPageNumber={pageNumber}
                    maxPageNumber={maxPageNumber}
                    updatePageNumber={updatePageNumber}
                  />
                ) : null
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MyFavorites;
