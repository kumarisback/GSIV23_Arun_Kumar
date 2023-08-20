import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import keys from "./secret/key";
import NavBar from "./component/NavBar";
import List from "./component/List";
import MovieDetailPage from "./component/MovieDetailPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "./store/dataslice";

function App() {
  const upcomingMovies = useSelector(
    (state: { upcomingMovies: { value: [] } }) => state.upcomingMovies.value
  );

  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(keys.BASE_URL + "/movie/upcoming", {
        params: {
          api_key: keys.API_KEY,
          page: page + 1,
        },
      });
      let temp: any = [];
      if (upcomingMovies.length > 0) {
        temp = [...upcomingMovies];
      }

      dispatch(addMovie(response.data.results));
      temp.push(...response.data.results);
      // setData(temp);
      setPage(page + 1);
      setTotalPage(response.data.total_pages);
    } catch (error) {
      alert("Something went wrong please try again later");
    }
  };
  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  const filterHandler = (e: { target: { value: string } }) => {
    if (e.target.value.length > 0) {
      setFlag(true);
      const temp = upcomingMovies.filter((movieDetail: any) =>
        movieDetail.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilterData(temp);
    } else {
      setFlag(false);
    }
  };
  return (
    <>
      <Router>
        <NavBar onSearch={filterHandler} />
        <Routes>
          <Route
            path="/"
            element={
              <List
                currentPage={page}
                pages={totalPage}
                fetchMoreData={fetchUpcomingMovies}
                data={flag ? filterData : upcomingMovies}
              />
            }
          />
          <Route path="/details/:id" element={<MovieDetailPage />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
