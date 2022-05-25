// ----------------------- Translation Functionality ---------------------- \\
// -- Generate from and to langauge drop-downs available for translation -- \\
// ------------------------------------------------------------------------ \\
let fromLang = document.querySelector("#fromSelect");
let toLang = document.querySelector("#toSelect");
getLanguages();

function getLanguages() {
  fetch("https://lecto-translation.p.rapidapi.com/v1/translate/languages", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "lecto-translation.p.rapidapi.com",
        "x-rapidapi-key": "498ed225bamshcd02cf5559e10edp179d21jsn59b140b93ec5"
      }
    })
    .then(response => response.json())
    .then(locales => {
      langList(locales.languages, true, fromLang);
      langList(locales.languages, false, toLang);

      // Reference https://stackoverflow.com/questions/10911526/how-do-i-programatically-select-an-html-option-using-javascript
      fromLang.value = "es";
      toLang.value = "en";
    })
    .catch(err => {
      console.error(err);
    });
}

function langList(list, src, select) {
  select.innerHTML = list.filter(l => src ? l.support_source : l.support_target)
    .map(l => `<option value="${l.language_code}">${l.display_name}</option>`).join("\n");
}
// x--------------------x----------------------------x--------------------x \\


let enteredText = document.querySelector("#entered-text");
let translation = document.querySelector("#translation");
let translateSearchBtn = document.querySelector("#translate-search-btn");
let phrase = document.querySelector("#search-phrase");


translateSearchBtn.addEventListener("click", translatePhrase);


function translatePhrase() {
  let sourceLang = fromLang.value;
  let targetLang = toLang.value;
  enteredText.innerHTML += `<li>You typed: ${phrase.value}</li>`;
  howDoYouSay(phrase.value, sourceLang, targetLang);
}

// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// recognition.continuous = true;
recognition.interimResults = true;
recognition.addEventListener("result", (event) => {
  const text = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  
  if (event.results[0].isFinal) {
    enteredText.innerHTML += `<li>You said: ${text}</li>`;
    document.querySelector("#search-phrase").value = text;
    document.querySelector("#translate-search-btn").click();
    let uniqueArray = [...new Set(text.toLowerCase().split(" "))];

    if (uniqueArray.indexOf("color") >= 0) {
      uniqueArray.splice(uniqueArray.indexOf("color"), 1);
      let color = uniqueArray.join("");
      document.body.style.backgroundColor = color;
    }

    // text to speech
    let sourceLang = fromLang.value;
    let targetLang = toLang.value;
    howDoYouSay(text, sourceLang, targetLang);
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();

function howDoYouSay(text, from, to) {
  const params = new URLSearchParams();
  params.append("to", to);
  params.append("from", from);
  params.append("texts", text);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-host": "lecto-translation.p.rapidapi.com",
      "x-rapidapi-key": "498ed225bamshcd02cf5559e10edp179d21jsn59b140b93ec5",
    },
    body: params,
  };

  fetch("https://lecto-translation.p.rapidapi.com/v1/translate/text", options)
    .then(response => response.json())
    .then(json => {
      let translatedText = json.translations[0].translated[0];
      translation.innerHTML += `<li>${translatedText}</li>`;
      recognition.start();
    })
    .catch(error => console.error(error));
}
