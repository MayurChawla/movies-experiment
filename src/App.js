import React, {useEffect, useState} from 'react';
import GetMovie from './components/GetMovies';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API =  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies_array, setMovies] = useState([]);
  //const [URL_API, setURL_API] = useState(""+FEATURED_API);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [dropDownValue, setDropDownValue] = useState("popularity");
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
      setPageNumber(1);
      setDropDownValue("popularity");
      setSortVarialble("desc");
    }
  };
  const siteClicked = () => {
    GetMovies(FEATURED_API);
    setSearchTerm("");
    setPageNumber(1);
    setDropDownValue("popularity");
    setSortVarialble("desc");
  }

  const onSearchHandler = (e) => {
    setSearchTerm(e.target.value);
  }
  const prevPage = () => {
    if(pageNumber >1)
    {
      const pg = pageNumber-1;
      setPageNumber(pg);
      if(sortVariable==="desc")
      {
        if(searchTerm)
        {
          GetMovies("https://api.themoviedb.org/3/search/movie?sort_by="+dropDownValue+".desc&api_key=04c35731a5ee918f014970082a0088b1&page="+pg+"&query="+searchTerm);
        }
        else {
          GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by="+dropDownValue+".desc&api_key=04c35731a5ee918f014970082a0088b1&page="+pg);
        }
      }
      else if(sortVariable==="asce")
      {
        if(searchTerm)
        {
          GetMovies("https://api.themoviedb.org/3/search/movie?sort_by="+dropDownValue+".asce&api_key=04c35731a5ee918f014970082a0088b1&page="+pg+"&query="+searchTerm);
        }
        else {
          GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by="+dropDownValue+".asce&api_key=04c35731a5ee918f014970082a0088b1&page="+pg);
        }
      }
    }
  }
  const nextPage = () => {
    const pg = pageNumber+1;
    setPageNumber(pg);
    if(sortVariable==="desc")
      {
        if(searchTerm)
        {
          GetMovies("https://api.themoviedb.org/3/search/movie?sort_by="+dropDownValue+".desc&api_key=04c35731a5ee918f014970082a0088b1&page="+pg+"&query="+searchTerm);
        }
        else {
          GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by="+dropDownValue+".desc&api_key=04c35731a5ee918f014970082a0088b1&page="+pg);
        }
      }
      else if(sortVariable==="asce")
      {
        if(searchTerm)
        {
          GetMovies("https://api.themoviedb.org/3/search/movie?sort_by="+dropDownValue+".asce&api_key=04c35731a5ee918f014970082a0088b1&page="+pg+"&query="+searchTerm);
        }
        else {
          GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by="+dropDownValue+".asce&api_key=04c35731a5ee918f014970082a0088b1&page="+pg);
        }
      }
  }
  const dropDownChange = (e) => {
    setDropDownValue(""+e.target.value);
    if(searchTerm)
    {
      GetMovies("https://api.themoviedb.org/3/search/movie?sort_by="+e.target.value+".desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&query="+searchTerm);
    }
    else {
      GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by="+e.target.value+".desc&api_key=04c35731a5ee918f014970082a0088b1&page=1");
    }
    setSearchTerm(searchTerm);
    setPageNumber(1);
    setSortVarialble("desc");
    console.log("search term : " + searchTerm + " Dropdown_value : " +  e.target.value + " pageNumber : " + 1 + " sortVariable : desc");
  }
  const sortChangeHandler = () => {
    setDropDownValue(dropDownValue);
    setPageNumber(1);
    //setSearchTerm(searchTerm);
    if(sortVariable === "desc")
    {
      setSortVarialble("aesc");
      if(searchTerm)
      {
        //SEARCH URL
        GetMovies("https://api.themoviedb.org/3/search/movie?sort_by="+searchTerm+".asce&api_key=04c35731a5ee918f014970082a0088b1&page=1&query="+searchTerm);
      }
      else{
        //DISCOVER URL
        GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by="+dropDownValue+".asce&api_key=04c35731a5ee918f014970082a0088b1&page=1");
      }
      console.log("search term : " + searchTerm + " Dropdown_value : " +  dropDownValue + " pageNumber : "+ 1 +" sortVariable : asce");
    }
    else{
      setSortVarialble("desc");
      if(searchTerm)
      {
        GetMovies("https://api.themoviedb.org/3/search/movie?sort_by="+searchTerm+".desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&query="+searchTerm);
      }
      else{
        GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by="+dropDownValue+".desc&api_key=04c35731a5ee918f014970082a0088b1&page=1");
      }
      console.log("search term : " + searchTerm + " Dropdown_value : " +  dropDownValue + " pageNumber : "+ 1 +" sortVariable : desc");
    }
  }
  return (
    <>
    <header>
        <h2 className="site-name"><span onClick={siteClicked}>My Movies</span></h2>
        <div className="sort-by-div">
          <select className="sort-by-dropdown" onChange={dropDownChange}>
            <option value="popularity">popularity</option>
            <option value="title">alphabetical</option>
            <option value="vote_average">average rating</option>
            <option value="vote_count">number of votes</option>
            <option value="release_date">release date</option>
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
        <GetMovie key={movie.id} {...movie}/>
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
