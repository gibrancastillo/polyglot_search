document.querySelector("#translate-search-btn").addEventListener("click", () => {
  let omdbRequestUrl = "";
  const omdbSearch = document.querySelector("#search-phrase").value;
  
  if(window.location.pathname == "/") {
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
      console.table(jsonObject); // temporary checking for valid response and data parsing

      if(window.location.pathname == "/") {
        loadMovies(jsonObject);
      } else {
        //loadMovie(jsonObject);
        console.log("loadMovie(jsonObject)");
      }
      
      createBanner();
    })
    .catch((error) => console.error(error));
});

//const omdbDetailRequestUrl = "https://www.omdbapi.com/?apikey=7f7fde0a&t=" + movies[i].Title;
function loadMovies(jsonObject) {
  const movies = jsonObject["Search"];

  for (let i = 0; i < movies.length; i++) {
    //<a href=""><section>...</section></a>
    // Anchored
    let anchored = document.createElement("a");
    anchored.href = "page1/index.html"
    card.appendChild(anchored);

    // Create card (section element)
    let card = document.createElement("section");

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
    anchored.appendChild(card)

    // Add anchored (<a> element) to class "cards" div element
    document.querySelector("div.cards").appendChild(anchored);
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
