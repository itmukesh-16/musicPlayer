
// for loading the tracks into browser
document.addEventListener("DOMContentLoaded",loadPlayer());

//it indicates the song track/number
var track = 0; 
// dynamically creates a div
var div = document.createElement("div");

function loadPlayer() {

  fetch("../data/musiclist.json")
    .then((response) => response.json())

    .then((data) => {
      div.innerHTML = `
    <div class="card" data-bs-theme="dark" style="width:30vw;height:40vh;">
    
    <img src=${data[track].thumbnail} class="card-img-top">
    
    <div class="card-body" id="card-body">
    <p>${data[track].title}</p>
    <audio  autoplay src=${data[track].song} id="myaudio"></audio>
    </div>
    
    <div class="card-footer">
    <button class="btn btn-primary bi bi-chevron-left" onclick="Previous()" ></button>
    <button class="btn btn-primary bi bi-pause" onclick="Play_Pause()" id="play_pause"></button>
    <button class="btn btn-primary bi bi-chevron-right" onclick="Next()"></button>
    </div>
    
    </div>
    `;
        // it get the target element id and append the dynamically created element 
      var player = document.getElementById("player");
      player.appendChild(div);
    })

    // to handle dynamic error 
    .catch((error) => console.error("Error fetching JSON:", error));
}

function Play_Pause() {

  // it get the audio element id that which was created dynamically
  var audio = document.getElementById("myaudio");

  //accessing the play/pause btn id
  var btnplayPause = document.getElementById("play_pause");

  // implementing toggle 
  if (btnplayPause.classList.contains("bi-pause")) {
    // to pause the audio 
    audio.pause(); 
    btnplayPause.classList.remove("bi-pause");
    btnplayPause.classList.add("bi-play");
    // console.log("pause");
  } else {
    // to play the audio 
    audio.play();
    btnplayPause.classList.remove("bi-play");
    btnplayPause.classList.add("bi-pause");
    // console.log("play");
  }
}

function Next() {
  track = (track + 1) % 3;
  loadPlayer();
}

function Previous() {
  track = (track - 1 + 3) % 3;
  loadPlayer();
}

// method-2
// =============
// // const audioContainer = document.getElementById("player");
// const audioElement = document.createElement("audio");
// audioElement.autoplay = true;
// audioElement.controls = true;
// audioElement.src = data[track].song;
// // audioContainer.appendChild(audioElement);
// const audioTitle = document.createElement("p");
// audioTitle.textContent = data[track].title;
//  cardBody.appendChild(audioTitle);
//  cardBody.appendChild(audioElement);
