let googleObject;
let googleObjectCounter =0;

//let searchText = $("#textarea").value;
let video0 = "https://www.youtube.com/embed/";
let searchValue = $("#textarea");
let searchBtn = $("#search-button");
let idNumber = 0;
let storageKey = 1;

function setLocalStorage(textItem) {
  // set search term to localStorage
  localStorage.setItem(storageKey, textItem);
  storageKey++;
}


searchBtn.on("click", function () {
  let textItem = searchValue.val();
  setLocalStorage(textItem);
  searchValue.empty();
  SetHistory(textItem);
  googleApi(textItem);
  dictionaryAPI(textItem);
  giphyAPI(textItem);
});

function SetHistory(textItem) {
  let newListItem = $("<li>");
  newListItem.attr("id", idNumber);
  newListItem.attr("class", "historyListItems");
  newListItem.append(textItem);
  newListItem.on("click", function () {
    getHistory(textItem);
  });
  $("#history-items").prepend(newListItem);
  idNumber++;
}

function getHistory(textItem) {
  googleApi(textItem);
  dictionaryAPI(textItem);
  giphyAPI(textItem);
}

function googleApi(searchText) {
  //let apiKey = "&key=AIzaSyAa4_ZX-UHSjDpcWGY4M_rfq0jS3mbIrbI";
  let apiKey = "&key=AIzaSyAj881SFPh0INV0_XYrv_22k-B49JmCeLE";
  let youtubeAPI =
    "https://youtube.googleapis.com/youtube/v3/search?&maxResults=10&order=relevance&q=" +
    searchText +
    "&type=video&videoEmbeddable=true&videoType=videoTypeUnspecified" +
    apiKey;
  //console.log(youtubeAPI);

  $.ajax({ url: youtubeAPI, method: "GET" }).then(function (responce) {
    //console.log(responce);
    googleObject = responce;
    //console.log(googleObject);
    createVideoCarusel();
  });
}

function createVideoCarusel() {
  let video1 = googleObject.items[0].id.videoId;
  //console.log(video1);
  let video2 = "https://www.youtube.com/embed/" + video1;
  //console.log(video2);
  document.getElementById("ytPlayer").setAttribute("src", video2);
}
$("#next-ytplayer").on("click", function(){
    if (googleObject == undefined){
      ;
    }
    else{
      googleObjectCounter ++;
      let video3 = googleObject.items[googleObjectCounter].id.videoId;
      document.getElementById("ytPlayer").setAttribute("src",video0+video3);
    }
  }
)
$("#previous-ytplayer").on("click", function(){
  if (googleObject == undefined){
      ;
  }
  else{
    console.log(typeof googleObject);
    if (googleObjectCounter !== 0){
      googleObjectCounter --;
    }
    else{
      googleObjectCounter = 0;
    }
    let video3 = googleObject.items[googleObjectCounter].id.videoId;
    document.getElementById("ytPlayer").setAttribute("src",video0+video3);
    }
  }
)

function dictionaryAPI(searchText) {
$("#definitions").empty();
let dict =
  "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" +
  searchText +
  "?key=097e4f17-51a3-4c33-868e-e4192b97f92a";
$.ajax({
  url: dict,
  method: "GET",
}).then(function (response) {
  $("#searched-word").text(searchText);
  for (let i = 0; i < response[0].shortdef.length; i++) {
    let listItem = $("<li>");
    listItem.text(response[0].shortdef[i]);
    $("#definitions").append(listItem);
  }
  $("#definition").empty();
});
}

function giphyAPI(textItem){
let apiKey = "tuMT3OKsTT4SHjMMy9Gye7GGpAmq9wSw";
let giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=1&q=" + textItem;
console.log(giphyURL);

$.ajax({
  url: giphyURL,
  method: "GET"
}).then(function (response) {
  $("#this-img").attr("src", response.data[0].images.original.url);
})
}