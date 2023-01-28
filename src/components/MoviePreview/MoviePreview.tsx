import Grid from "../Grid/Grid";
import { ISearchData } from "../../api/generated-api";
import styles from "./MoviePreview.module.scss";
import Box from "../Box/Box";
import PreviewImage from "../PreviewImage/PreviewImage";

interface IMoviePreview {
  searchData: ISearchData;
}

const MoviePreview = ({ searchData }: IMoviePreview) => {
  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid item xs={4} sm={4} md={4} lg={4} textAlign={"end"}>
          {searchData.Poster !== "N/A" ? (
            <PreviewImage
              src={searchData.Poster}
              alt={"Not Avaliable"}
              width={50}
              height={50}
              className={styles.roundedImage}
            />
          ) : (
            <PreviewImage
              src="/movie-clip.png"
              alt={"Default"}
              width={50}
              height={50}
              className={styles.roundedImage}
            />
          )}
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Box>
            <span className={styles.info}>{searchData.Title}</span>
          </Box>
          <Box>
            <span className={styles.info}>{searchData.Year}</span>
          </Box>
        </Grid>
      </Grid>
      <hr className={styles.devider} />
    </>
  );
};

export default MoviePreview;
