import Grid from "../Grid/Grid";

interface IPaginationProps {
  currPageNumber: number;
  maxPageNumber: number;
  updatePageNumber(updatedPageNumber: number): void;
}

const Pagination = ({
  currPageNumber,
  maxPageNumber,
  updatePageNumber,
}: IPaginationProps) => {
  const paginationButtons = [];

  for (let i = 2; i < maxPageNumber; i++) {
    if (i >= currPageNumber - 2 && i <= currPageNumber + 2) {
      paginationButtons.push(
        <Grid key={i} item>
          <button key={i} onClick={() => updatePageNumber(i)}>
            {i}
          </button>
        </Grid>
      );
    }
  }

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item>
          <button onClick={() => updatePageNumber(currPageNumber - 1)}>
            &lt;
          </button>
        </Grid>
        <Grid key={1} item>
          <button
            key={1}
            onClick={() => {
              updatePageNumber(1);
            }}
          >
            1
          </button>
        </Grid>
        {paginationButtons.length > 1 ? (
          <>
            {currPageNumber > 4 ? <Grid item>...</Grid> : null}
            {paginationButtons.map((button) => {
              return button;
            })}
            {currPageNumber < maxPageNumber - 2 ? <Grid item>...</Grid> : null}
          </>
        ) : null}
        {maxPageNumber > 1 ? (
          <Grid key={maxPageNumber} item>
            <button
              key={maxPageNumber}
              onClick={() => updatePageNumber(maxPageNumber)}
            >
              {maxPageNumber}
            </button>
          </Grid>
        ) : null}
        <Grid item>
          <button
            onClick={() => {
              updatePageNumber(currPageNumber + 1);
            }}
          >
            &gt;
          </button>
        </Grid>
      </Grid>
    </>
  );
};

export default Pagination;
