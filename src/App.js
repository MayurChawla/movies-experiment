import React, {useEffect, useState} from 'react';
import GetMovie from './components/GetMovies';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API =  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies_array, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [sortVariable, setSortVarialble] = useState("desc");
  useEffect(() => {
    GetMovies(FEATURED_API);
  }, []);
  
  const GetMovies = (API) => {
    fetch(API).then(res => res.json()).then(data => {
      setMovies(data.results);
    })
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(searchTerm)
    {
      GetMovies(SEARCH_API+searchTerm);
      // setSearchTerm("");
      setPageNumber(1);
    }
  };
  const onSearchHandler = (e) => {
    setSearchTerm(e.target.value);
  }
  const prevPage = () => {
    if(pageNumber >1)
    {
      const pg = pageNumber-1;
      console.log("search : " +searchTerm);
      setPageNumber(pg);
      if(searchTerm)
      {
        GetMovies(SEARCH_API+searchTerm+"&page="+pg);
      }
      else
      {
        GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page="+pg);
      }
    }
  }
  const nextPage = () => {
    const pg = pageNumber+1;
    console.log("search : " +searchTerm);
    setPageNumber(pg);
      if(searchTerm)
      {
        GetMovies(SEARCH_API+searchTerm+"&page="+pg);
      }
      else
      {
        GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page="+pg);
      }
  }
  const siteClicked = () => {
    GetMovies(FEATURED_API);
    setSearchTerm("");
    setPageNumber(1);
  }
  const dropDownChange = (e) => {
    console.log(e.target.value);
    GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by="+e.target.value+".aesc&api_key=04c35731a5ee918f014970082a0088b1&page=1");
  }
   const sortChangeHandler = () => {
     //console.log("sortVariable : " + sortVariable);
     if(sortVariable === "desc")
     {
        setSortVarialble("aesc");
        console.log("sortVariable : " + sortVariable);
        GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.aesc&api_key=04c35731a5ee918f014970082a0088b1&page=1");
     }
     else{
        setSortVarialble("desc");
        console.log("sortVariable : " + sortVariable);
        GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1");
     }
   }
  return (
    <>
    <header>
        <h2 className="site-name"><span onClick={siteClicked}>My Movies</span></h2>
        <div className="sort-by-div">
          <select className="sort-by-dropdown" onChange={dropDownChange}>
            <option value="popularity">popularity</option>
            <option value="yearrelease">year release</option>
            <option value="runtime">runtime</option>
            <option value="alphabetical">alphabetical</option>
            <option value="numberofvotes">number of votes</option>
            <option value="releasedate">release date</option>
          </select>
          <button className="sort-by-button" onClick={sortChangeHandler}>&#8693;</button>
        </div>
        
        <form action="" onSubmit={onSubmitHandler}>
          <input type="search" placeholder="search..." className="searchbar"
            value={searchTerm} onChange={onSearchHandler}
          ></input>
        </form>
      </header>
    <div className="movie-container">
      
      {movies_array.length>0 && movies_array.map((movie)=>(
        <GetMovies key={movie.id} {...movie}/>
      ))}
    </div>
    <div className="bars-to-pages">
      <div className="movie-pages">
        <button className="page-change" onClick={prevPage}>&lt;&nbsp;&lt;&nbsp;</button>
            <span className="pgnumber">{pageNumber}</span>
        <button className="page-change" onClick={nextPage}>&nbsp;&gt;&nbsp;&gt;</button>
      </div>
    </div>
    <footer className="footer">
      © 2021 All rights reserved
    </footer>
    </>
  );
}

export default App;
