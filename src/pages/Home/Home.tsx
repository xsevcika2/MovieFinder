import SearchBar from "../../components/SearchBar/SearchBar";
import Grid from "../../components/Grid/Grid";
import Box from "../../components/Box/Box";
import Pagination from "../../components/Pagination/Pagination";
import { useState } from "react";
import { ISearchData } from "../../api/generated-api";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";

const Home = () => {
  const [data, setData] = useState<ISearchData[]>([]);
  const [dataCount, setDataCount] = useState<number>(0);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [maxPageNumber, setMaxPageNumber] = useState<number>(1);

  const updateData = (loadedData: ISearchData[]): void => {
    setData(loadedData);
  };

  const updateDataCount = (loadedDataCount: number) => {
    setDataCount(loadedDataCount);
    setMaxPageNumber(Math.ceil(loadedDataCount / 10));
  };

  const updateIsDataLoaded = (isDataLoaded: boolean) => {
    setIsDataLoaded(isDataLoaded);
  };

  const updateLoadingData = (isLoading: boolean) => {
    setLoadingData(isLoading);
  };

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
            <h1>Find Your Movie</h1>
          </Box>
          <Box>
            <SearchBar
              pageNumber={pageNumber}
              dataCount={dataCount}
              updateData={updateData}
              updateDataCount={updateDataCount}
              isDataLoaded={isDataLoaded}
              updateIsDataLoaded={updateIsDataLoaded}
              updateLoadingData={updateLoadingData}
            />
          </Box>

          <Grid justifyContent={"flex-start"} textAlign={"start"}>
            <MovieList movies={data} />
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

export default Home;
