const searchButton = document.getElementById("searchBtn");
const songLists = document.getElementById("songsList");
const thelyricDiv = document.getElementById("theLyrics");

searchButton.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value;
  fetch(`https://api.lyrics.ovh/suggest/:${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      if (searchInput != "") {
        let html = "";
        if (data.data) {
          data.data.forEach((song) => {
            html += `
                    <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                            <source src="${song.preview}" type="audio/mp3">
                          </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLerics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>
                    `;
          });
        
        } if(data.data != true) {
         html +=`
          <h1 style="color:red; text-align:center;">Somethig went wrong!!!</h1>
         `
         const theErrrHead = document.getElementById("theHeadError");
         theErrrHead.innerText = "";
        }
        songLists.innerHTML = html;

      } else {
        songLists.innerHTML = "";
        const theErrrHead = document.getElementById("theHeadError");
        const text = "Please Write Something!!";
        theErrrHead.innerText  = text;
        theErrrHead.style.textAlign = "center";
      }
    })
});

const getLerics = (artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      thelyricDiv.innerText = json.lyrics;
    });
};
