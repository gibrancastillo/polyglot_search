document
  .querySelector("#translate-search-btn")
  .addEventListener("click", () => {
    const omdbSearch = document.querySelector("#search-phrase").value;
    const omdbRequestUrl =
      "https://www.omdbapi.com/?apikey=7f7fde0a&s=" + omdbSearch;

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
        loadMovies(jsonObject);
      })
      .catch((error) => console.error(error));
  });

//const omdbDetailRequestUrl = "https://www.omdbapi.com/?apikey=7f7fde0a&t=" + title;
function loadMovies(jsonObject) {
  const movies = jsonObject["Search"];

  for (let i = 0; i < movies.length; i++) {
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

    // Add card (section element) to class "cards" div element
    document.querySelector("div.cards").appendChild(card);
  }
}
