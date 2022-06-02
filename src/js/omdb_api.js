document.querySelector("#translate-search-btn").addEventListener("click", () => {
  let omdbRequestUrl = "";
  const omdbSearch = document.querySelector("#search-phrase").value;
  
  if(location.pathname == "/index.html" || location.pathname == "/" || 
     location.pathname == "/polyglot_search/src/"  || location.pathname == "/polyglot_search/src/index.html" ||
     location.pathname == "/polyglot_search/build/"  || location.pathname == "/polyglot_search/build/index.html") {
    omdbRequestUrl = "https://www.omdbapi.com/?apikey=7f7fde0a&s=" + omdbSearch;
  } else {
    omdbRequestUrl = "https://www.omdbapi.com/?apikey=7f7fde0a&t=" + omdbSearch;
  }
  
  fetch(omdbRequestUrl)
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      return response.json();
    })
    .then((jsonObject) => {
      /* process your data further */
      // console.table(jsonObject); // temporary checking for valid response and data parsing

      if(location.pathname == "/index.html" || location.pathname == "/" || 
         location.pathname == "/polyglot_search/src/"  || location.pathname == "/polyglot_search/src/index.html" ||
         location.pathname == "/polyglot_search/build/"  || location.pathname == "/polyglot_search/build/index.html") {
        createBanner();
        loadMovies(jsonObject);
        
      } else {
        createBanner();
        loadMovie(jsonObject);
      }
    })
    .catch((error) => console.error(error));
});

// document.querySelector("#search-detail").addEventListener("click", () => {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   let omdbRequestUrl = "https://www.omdbapi.com/?apikey=7f7fde0a&t=" + urlParams.get("detailsUrl");
  
//   fetch(omdbRequestUrl)
//     .then((response) => {
//       const contentType = response.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new TypeError("Oops, we haven't got JSON!");
//       }
//       return response.json();
//     })
//     .then((jsonObject) => {
//       /* process your data further */
//       console.table(jsonObject); // temporary checking for valid response and data parsing
//       createBanner();
//       loadMovie(jsonObject);
//     })
//     .catch((error) => console.error(error));
// });

function loadMovies(jsonObject) {
  if(jsonObject.Response == "False"){
    let card = document.createElement("section");

    // h2 Title
    let h2 = document.createElement("h2");
    h2.textContent = "Sorry..! Movie not found!";
    card.appendChild(h2);
    document.querySelector(".cards").appendChild(card);
  } else {
    const movies = jsonObject["Search"];

    for (let i = 0; i < movies.length; i++) {
      //<a href=""><section>...</section></a>
      // Anchored
      let anchored = document.createElement("a");
      anchored.id = movies[i].imdbID; //"search-detail" + [i];
      anchored.href = "page1/index.html?detailsUrl=https://www.omdbapi.com/?apikey=7f7fde0a&t=" + movies[i].Title;

      // Create card (section element)
      let card = document.createElement("section");
      anchored.appendChild(card);
      // h2 Title
      let h2 = document.createElement("h2");
      h2.textContent = movies[i].Title;
      card.appendChild(h2);

      // h3 Title
      let h3 = document.createElement("h3");
      h3.textContent = "Type: " + movies[i].Type;
      card.appendChild(h3);

      // h4 Title
      let h4 = document.createElement("h4");
      h4.textContent = "Year: " + movies[i].Year;
      card.appendChild(h4);

      // Image
      let image = document.createElement("img");

      if (movies[i].Poster == "N/A") {
        image.setAttribute("src", "../assets/images/marketing/NOimages.png");
      } else {
        image.setAttribute("src", movies[i].Poster);
      }

      image.setAttribute("alt", movies[i].Title);
      card.appendChild(image);

      // Add card (section element) to <a> (anchored) element
      //anchored.appendChild(card)

      // Add anchored (<a> element) to class "cards" div element
      document.querySelector(".cards").appendChild(anchored);
    }
    }
}

function createBanner(){
  document.querySelector(".banner-css").innerHTML = textBaner();
  setTimeout(() => {
    document.querySelector(".banner-css").innerHTML = "";
  }, 4000);
}

function textBaner(){
  return `<svg viewBox="0 0 1320 300">

  <!-- Symbol -->
  <symbol id="s-text">
    <text text-anchor="middle"
          x="50%" y="50%" dy=".35em">
        L O A D I N G . . .
    </text>
  </symbol>  

  <!-- Duplicate symbols -->
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>

</svg>`;
}

function loadMovie(movie) {
  if(movie.Response == "False") {
    let card = document.createElement("section");

    // h2 Title
    let h2 = document.createElement("h2");
    h2.textContent = "Sorry..! Movie not found!";
    card.appendChild(h2);
    document.querySelector(".card").appendChild(card);
  } else {
    let anchored = document.createElement("a");
    anchored.href = "page1/index.html"
    
    // Create card (section element)
    let card = document.createElement("section");
    anchored.appendChild(card);

    // h2 Title
    let h2 = document.createElement("h2");
    h2.textContent = movie.Title;
    card.appendChild(h2);

    // Image
    let image = document.createElement("img");

    if (movie.Poster == "N/A") {
      image.setAttribute("src", "../assets/images/marketing/NOimages.png");
    } else {
      image.setAttribute("src", movie.Poster);
      image.setAttribute("alt", movie.Title);
      card.appendChild(image);

      // h4 Title
      let h4 = document.createElement("h4");
      h4.textContent = "Actors: " + movie.Actors;
      card.appendChild(h4);
      
      // h5 Title
      let h5 = document.createElement("h5");
      h5.textContent = "Type: " + movie.Type;
      card.appendChild(h5);
      
      //h6 Tittle
      let h6 = document.createElement("h6");
      h6.textContent = "Writer: " + movie.Writer;
      card.appendChild(h6);
      
      //Title
      let h62 = document.createElement("h6");
      h62.textContent = "Genre: " + movie.Genre;
      card.appendChild(h62);
      
      //Title
      let p = document.createElement("p");
      p.textContent = "Plot: " + movie.Plot;
      card.appendChild(p);
      
      //Title
      let h63 = document.createElement("h6");
      h63.textContent = "Language: " + movie.Language;
      card.appendChild(h63);
      
      //Title
      let h64 = document.createElement("h6");
      h64.textContent = "Date: " + movie.Released;
      card.appendChild(h64);
      // Add card (section element) to <a> (anchored) element
      //anchored.appendChild(card)

      // Add anchored (<a> element) to class "cards" div element
      document.querySelector(".card").appendChild(anchored);
    }
  }
}
