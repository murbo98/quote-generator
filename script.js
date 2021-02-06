const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// fetching API from forismatic.com
const apiUrl =
  "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";

const fetchQuote = async () => {
  loading();
  try {
    const response = await fetch(proxyUrl + apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);

    if (quoteText.length > 120) {
      quoteContainer.classList.add("long-quote");
    } else {
      quoteContainer.classList.remove("long-quote");
    }
    if (data.quoteAuthor === "") {
      authorText.innerText = "Anonymous";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    quoteText.innerText = data.quoteText;
    complete();
  } catch (error) {
    fetchQuote();
    console.log("whoops, api didn't worked\n", error);
  }
};

function tweetIt() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetUrl, "_blank");
}

newQuoteBtn.addEventListener("click", fetchQuote);
twitterBtn.addEventListener("click", tweetIt);

fetchQuote();
