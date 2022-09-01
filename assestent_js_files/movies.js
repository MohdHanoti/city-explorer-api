let axios =require('axios');
let savedData={};
async function getMovieHandler(req, res) {
  let queryName = req.query.city;
  const URL2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.key2}&query=${queryName}`;

  if(savedData[queryName])//if there is any data here will enter the if. also we can use has own property
  {
    console.log("i have the data of movies");
    res.status(200).send(savedData[queryName]);
  }
  else
  {

    console.log("i don't have the data of movies");
    
    axios
      .get(URL2)
      .then((result) => {
        let moviesData = result.data.results.map((item) => {
          
          return new Movie(item);
        });
        savedData[queryName]=moviesData; //save the data that stored in (moviesData as array) inside a property [queryName] as object  

        res.status(200).send(moviesData);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  }}
  class Movie {
    constructor(item) {
      this.Title = item.title;
      this.overview = item.overview;
      this.release_date = item.release_date;
      this.vote_average = item.vote_average;
      this.poster_path = "https://image.tmdb.org/t/p/w500/"+item.poster_path;
    }
  }
  module.exports=getMovieHandler;
