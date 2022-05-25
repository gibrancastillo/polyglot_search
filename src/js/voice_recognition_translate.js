let speech = document.getElementById("speech");
let translation = document.getElementById("translation");
let translate = document.getElementById("translate-search-btn");
let phrase = document.getElementById("search-phrase");
let fromLang = document.getElementById("fromSelect");
let toLang = document.getElementById("toSelect");

translate.addEventListener("click", translatePhrase);
getLanguages();

function translatePhrase() {
  let sourceLang = fromLang.value;
  let targetLang = toLang.value;
  speech.innerHTML += `<li>You typed: ${phrase.value}</li>`;
  howDoYouSay(phrase.value, sourceLang, targetLang);
}

// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.start();

// recognition.continuous = true;
// recognition.interimResults = true;
recognition.onresult = event => {
  recognition.stop();
  const last = event.results.length - 1;
  const res = event.results[last];
  const text = res[0].transcript;
  speech.innerHTML += `<li>${text}</li>`;
  if (res.isFinal) {
    speech.innerHTML += `<li>You said: ${text}</li>`;
    document.querySelector("#search-phrase").value = text;
    var elemento = document.getElementById("translate-search-btn");
    elemento.click();
    var uniqueArray = [...new Set(text.toLowerCase().split(" "))]
    if (uniqueArray.indexOf("color") >= 0) {
      uniqueArray.splice(uniqueArray.indexOf("color"), 1);
      let color = uniqueArray.join("");
      document.body.style.backgroundColor = color;
    }
    // text to speech
    howDoYouSay(text, "en", "nl");
  }
}

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

function getLanguages() {
  fetch("https://lecto-translation.p.rapidapi.com/v1/translate/languages", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "lecto-translation.p.rapidapi.com",
        "x-rapidapi-key": "498ed225bamshcd02cf5559e10edp179d21jsn59b140b93ec5"
      }
    })
    .then(response => response.json())
    .then(languages => {
      langList(languages.languages, true, fromLang);
      langList(languages.languages, false, toLang);
    })
    .catch(err => {
      console.error(err);
    });
}

function langList(list, src, select) {
  select.innerHTML = list.filter(l => src ? l.support_source : l.support_target)
    .map(l => `<option value="${l.language_code}">${l.display_name}</option>option>`).join("\n");
}
