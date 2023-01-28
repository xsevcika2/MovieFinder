import styles from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ISearchData, titleSearch } from "../../api/generated-api";
import { useEffect, useState } from "react";

interface ISearchBar {
  dataCount: number;
  pageNumber: number;
  updateData(data: ISearchData[]): void;
  updateDataCount(count: number): void;
  isDataLoaded: boolean;
  updateIsDataLoaded(isLoaded: boolean): void;
  updateLoadingData(loading: boolean): void;
}

const searchByTitle = async (
  movie: string,
  page: number,
  signal: AbortSignal
) => {
  try {
    const res = await titleSearch(movie, { page }, { signal: signal });
    return res;
  } catch (err) {
    console.error(err);
  }
};

const SearchBar = ({
  dataCount,
  pageNumber,
  isDataLoaded,
  updateData,
  updateDataCount,
  updateIsDataLoaded,
  updateLoadingData,
}: ISearchBar) => {
  const [searchMovie, setSearchMovie] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    if (searchMovie !== "") {
      updateLoadingData(true);
      searchByTitle(searchMovie, pageNumber, controller.signal)
        .then((res) => {
          if (res) {
            updateData(res.data.Search);
            updateDataCount(res.data.totalResults);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          updateIsDataLoaded(true);
          updateLoadingData(false);
        });
    }

    return () => {
      controller.abort();
      updateIsDataLoaded(false);
      updateData([]);
    };
  }, [searchMovie, pageNumber]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSearchMovie(inputValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          id="input"
          className={styles.input}
          type="text"
          name="movie-name"
          placeholder="Type movie name"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className={styles.button} onClick={handleSubmit} type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      {isDataLoaded ? (
        dataCount > 0 ? (
          <h3>Total count of found movies: {dataCount}</h3>
        ) : (
          <h3>Movie with name: "{searchMovie}" was not found!</h3>
        )
      ) : null}
    </>
  );
};

export default SearchBar;
