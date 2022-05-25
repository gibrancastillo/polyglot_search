document.querySelector("#translate-search-btn").addEventListener("click", () => {
  const omdbSearch = document.querySelector("#search-phrase").value;
  const omdbRequestUrl = "https://www.omdbapi.com/?apikey=7f7fde0a&s=" + omdbSearch;
  
  fetch(omdbRequestUrl)
    .then(response => {
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      return response.json();
    })
    .then(jsonObject => {
      /* process your data further */
      console.table(jsonObject); // temporary checking for valid response and data parsing
      loadMovies(jsonObject);
      
    })
    .catch(error => console.error(error));
});

//const omdbDetailRequestUrl = "https://www.omdbapi.com/?apikey=7f7fde0a&t=" + title;
function loadMovies(jsonObject){
  const movies = jsonObject["Search"]
  for (let i = 0; i < movies.length; i++) {
    let card = document.createElement("section");
    let h2 = document.createElement("h2");
    h2.textContent = movies[i].Title;
    card.appendChild(h2);
    document.querySelector("div.cards").appendChild(card);
    let Title3 = document.createElement("h3");
    Title3.textContent = "Type: " + movies[i].Type
    card.appendChild(Title3)
    let title4 = document.createElement("h4");
    title4.textContent = "Year: " + movies[i].Year
    card.appendChild(title4)
    let image = document.createElement("img")
    if (movies[i].Poster == "N/A"){
      image.setAttribute("src", "../assets/images/marketing/NOimages.png")
    }else{
      image.setAttribute("src", movies[i].Poster)
    }
    image.setAttribute("alt", movies[i].Title)
    card.appendChild(image)

  }
}