export default class TmdbService {
  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGYyZTFjMzk0ZjI4NGNlNmI4NTkwNjRhNDVhYzZhMCIsInN1YiI6IjY1YTEyM2FhMTk2OTBjMDEzMThhYzY0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMoCg9yFO9XBL_LKXVC_Nb4J4mbjbqQBduC4RzS7pdc",
    },
  };

  optionsRated = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  optionsPost = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGYyZTFjMzk0ZjI4NGNlNmI4NTkwNjRhNDVhYzZhMCIsInN1YiI6IjY1YTEyM2FhMTk2OTBjMDEzMThhYzY0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMoCg9yFO9XBL_LKXVC_Nb4J4mbjbqQBduC4RzS7pdc",
    },
    // body: JSON.stringify({ value }),
  };

  async getNewSessionId() {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new",
      this.options,
    );
    if (!response.ok) throw new Error();
    else return response.json();
  }

  async getGenres() {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      this.options,
    );
    if (!response.ok) throw new Error();
    else return response.json();
  }

  async getSearchMovie(value, page) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=80f2e1c394f284ce6b859064a45ac6a0&page=${page}&query=${value}`,
      this.options,
    );
    if (!response.ok) throw new Error();
    else return response.json();
  }

  async getRatedMovies(id, page) {
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${id}/rated/movies?api_key=80f2e1c394f284ce6b859064a45ac6a0&page=${page}`,
      this.optionsRated,
    );
    if (!response.ok) throw new Error();
    else return response.json();
  }

  async setRatingMovie(id, guestSessionId, value) {
    this.optionsPost.body = JSON.stringify({ value });
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=80f2e1c394f284ce6b859064a45ac6a0&guest_session_id=${guestSessionId}&page=1`,
      this.optionsPost,
    );
    if (!response.ok) throw new Error();
    else return response.json();
  }
}
