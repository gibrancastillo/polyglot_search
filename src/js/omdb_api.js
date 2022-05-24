document.querySelector("#translate-search-btn").addEventListener("click", () => {
  // const omdbSearch = document.querySelector("#search").value;
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
      
    })
    .catch(error => console.error(error));
});

//const omdbDetailRequestUrl = "https://www.omdbapi.com/?apikey=7f7fde0a&t=" + title;
