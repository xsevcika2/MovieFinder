export const saveToLocalStorage = (id: string) => {
  const saved = localStorage.getItem("likedMovies");
  if (saved) {
    const likedMovies: string = JSON.parse(saved);
    localStorage.setItem(
      "likedMovies",
      JSON.stringify(likedMovies.concat(id, "-"))
    );
  } else {
    localStorage.setItem("likedMovies", JSON.stringify(id.concat("-")));
  }
};

export const loadFromLocalStorage = () => {
  return localStorage.getItem("likedMovies");
};

export const likedMoviesIDsFromLocalStorage = (): string[] => {
  const saved = localStorage.getItem("likedMovies");
  if (saved) {
    const likedMoviesIDs: string[] = JSON.parse(saved).split("-");
    likedMoviesIDs.pop(); // :-(
    return likedMoviesIDs;
  } else {
    return [];
  }
};

export const removeFromLocalStorage = (id: string) => {
  const saved = localStorage.getItem("likedMovies");
  if (saved) {
    const likedMovies: string = JSON.parse(saved);
    localStorage.setItem(
      "likedMovies",
      JSON.stringify(likedMovies.replaceAll(`${id}-`, ""))
    );
  }
};
