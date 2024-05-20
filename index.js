// concepts implemented

// - JSON making .
// - Fetching data from JSON .
// - Dynamic Element Creation (card).
// - Dynamic Data binding.
// - Events
// - audio() methods .
// -DOM Class manipulation
// - toggling (applied in play/pause methods)

// working
// ========
// here are four functions loadPlayer(),Play_Pause(),Next(),Previous() is being used
// loadPlayer():-it will load the tracks once the html page rendered into the web browser
// Play_pause():it will toggle b/t play and pause.
// next():- move to the next TrackEvent.
// Previous():-move to the previous track .

// document.addEventListener("DOMContentLoaded", loadPlayer());

var Tracks = [
  ["public/images/img1.jpg", "Timro Pratiksha", "Timro_Pratiksha.mp3"],
  ["public/images/img2.jpg", "Gulabi Sari", "Gulabi_Sari.mp3"],
  ["public/images/img3.jpg", "Khudaya", "Khudaya.mp3"],
];
var trackIndex = 0;

// initaiting muteBtn And btnPlayPaue so that when initially user changes next() or Previous()
//its value it will check wheather the class contains the desired value or not 
function initiate(){
  btnPlayPause = document.getElementById("btnPlayPause");
  muteBtn = document.getElementById("btnMuteToggle");
  
}

// MusicPlayer Header starts
//======================================

// justify toggle buttton functionality
function btnToggle() {
  var btnSidebarToggle = document.getElementById("btnSidebarToggle");

  if (btnSidebarToggle.classList.contains("bi-justify")) {
    btnSidebarToggle.classList.remove("bi-justify");
    btnSidebarToggle.classList.add("bi-x-lg");

    var PlayerBody = document.getElementById("PlayerBody");
    PlayerBody.style = "grid-template-columns: 8fr 4fr";

    var Sideicons = document.getElementById("Sideicons");
    Sideicons.style = "display:block";
  } else {
    btnSidebarToggle.classList.remove("bi-x-lg");
    btnSidebarToggle.classList.add("bi-justify");

    var PlayerBody = document.getElementById("PlayerBody");
    PlayerBody.style = "grid-template-columns: 0fr 12fr";

    var Sideicons = document.getElementById("Sideicons");
    Sideicons.style = "display:none";
  }
}

// search button toggle functionality and search functionality

function btnSearch() {
  var btnSearch = document.getElementById("btnSearch");
  var txtSearch = document.getElementById("txtSearch");
  var spanListPlaylist = document.getElementById("list");
  var PlayerHeader = document.getElementById("PlayerHeader");

  // initiating the index as zero
  var searchedSongSatusIndex = 0;

  if (btnSearch.classList.contains("bi-search")) {
    // hiding the playlist and displaying thebox
    spanListPlaylist.style.display = "none";
    txtSearch.style.display = "block";

    // checking wheather the search string is empty or not
    if (txtSearch.value != "") {
      // checking wheather the song contains ".mp3" extension or not
      if (txtSearch.value.endsWith(".mp3")) {
      } else {
        // adding the extension to the searched song
        txtSearch.value = txtSearch.value + ".mp3";
      }

      // if its not empty then search the song  in the array Tracks
      for (var i = 0; i < Tracks.length; i++) {
        //  here we are checking the txtSearch.value with the Tracks array list
        if (txtSearch.value === Tracks[i][2]) {
          // if the track is found then store the index
          searchedSongSatusIndex = i;

          // emptying the header and puting the dynamic content to the header
          PlayerHeader.innerHTML = "";
          // here we are passing the searched index of the song

          PlayerHeader.innerHTML = `
          <span>${Tracks[searchedSongSatusIndex][2]}</span> 
          <button class="bi bi-play" onclick="playSearchResult(${searchedSongSatusIndex})"></button>
          <button class="bi bi-x" onclick="onResultCancel()"></button>
          `;
          break;
        }
        // here we are checking if there is no such song and pointer reaches to the end of the array
        if (i == Tracks.length - 1) {
          PlayerHeader.innerHTML = "";
          PlayerHeader.innerHTML = `
          
          <span>${txtSearch.value} not found </span> 
          <button class="bi bi-x" onclick="onResultCancel()"></button>
          `;
        }
      }
    }
  }
}

// function if user  dont want to search
function onResultCancel() {
  var PlayerHeader = document.getElementById("PlayerHeader");
  PlayerHeader.innerHTML = "";
  PlayerHeader.innerHTML = `
        <button class="bi bi-justify"  id="btnSidebarToggle" onclick="btnToggle()"></button>
        <input type="text" id="txtSearch" placeholder="Search Music" class=" form-control"/>
        <span id="list">MGplayer</span>
        <button class="bi bi-search" id="btnSearch" onclick="btnSearch()"></button>
  `;
}

// it will load the song onto loadPlayer and undo the changes made to the header
function playSearchResult(searchedSongSatusIndex) {
  trackIndex = searchedSongSatusIndex;

  loadPlayer();

  var PlayerHeader = document.getElementById("PlayerHeader");
  PlayerHeader.innerHTML = "";
  PlayerHeader.innerHTML = `
        <button class="bi bi-justify"  id="btnSidebarToggle" onclick="btnToggle()"></button>
        <input type="text" id="txtSearch" placeholder="Search Music" class=" form-control"/>
        <span id="list">MGplayer</span>
        <button class="bi bi-search" id="btnSearch" onclick="btnSearch()" ></button>
  `;
}

// MusicPlayer Header end
//======================================

// MusicPlayer Body starts
//======================================

// var trackIndex = 0;

// player
function loadPlayer() {
  var TrackPlayer = document.getElementById("TrackPlayer");
  TrackPlayer.innerHTML = "";
  var div = document.createElement("div");
  var span = document.createElement("span");
  span.innerHTML = `${Tracks[trackIndex][1]}`;
  div.innerHTML = `
    <div id="TrackThumbnails" class="rotateAnimation" onclick="Play_Pause()">
        <img src=${Tracks[trackIndex][0]} height="100" width="100">
        <audio id="audio">
          <source src=${Tracks[trackIndex][2]} type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
    </div>
  `;
  TrackPlayer.appendChild(div);
  TrackPlayer.appendChild(span);

  // Initiate buttons and other elements
  initiate();

  // Start playing the audio once it is loaded
  var audio = document.getElementById("audio");
  audio.play().catch(function(error) {
    console.log("Autoplay was prevented. User interaction is required to start the audio.", error);
  });

  // Update the audio progress bar periodically
  setInterval(loadAudioProgresssBar, 500);
}

function addSong() {
  var Sidebar = document.getElementById("Sidebar");
  Sidebar.innerHTML = "";

  Sidebar.innerHTML = `<input type="file" id="inputFile" accept="audio/*"/> `;

  setTimeout(updateTracks, 10000);
}

function updateTracks() {
  // for selecting the first inputed file we used .files[0];
  var uploadedFile = document.getElementById("inputFile").files[0];

  if (uploadedFile) {
    // using an UML object to create a virtual path suitable for every path
    var uploadedSongPath = URL.createObjectURL(uploadedFile);

    // .name allowa us to select file name without performing any strin slice methods
    var uploadedSongTitle = uploadedFile.name;

    // storing song image
    var uploadedSongThumbImage ='public/images/logo.jpg';

    // pushing unto the Tracks array
    Tracks.push([uploadedSongThumbImage, uploadedSongTitle, uploadedSongPath]);

    console.log(Tracks);
    // updating the track index to the updated song
    trackIndex = Tracks.length - 1;
    // calling the loadPlayer to play the song
    loadPlayer();
    // to hide the inputFile
  } else {
    console.error("No file selected.");
  }
}

// MusicPlayer body end
//======================================

// MusicPlayer Fotter starts
//======================================
// implementing the mute and unmute functionality

var muteBtn = "";

function btnMuteUnmuteToggle() {
  muteBtn = document.getElementById("btnMuteToggle");
  var audio = document.getElementById("audio");

  if (muteBtn.classList.contains("bi-volume-up")) {
    muteBtn.classList.remove("bi-volume-up");
    muteBtn.classList.add("bi-volume-mute");
    audio.muted = true;
  } else {
    muteBtn.classList.remove("bi-volume-mute");
    muteBtn.classList.add("bi-volume-up");
    audio.muted = false;
  }
}

// implementing the song progressbar functionality
function loadAudioProgresssBar() {
  var audio = document.getElementById("audio");
  var audioProgressBar = document.getElementById("progress");
  audioProgressBar.max = audio.duration;
  audioProgressBar.value = audio.currentTime;
}

function updateProgressBar() {
  var audio = document.getElementById("audio");
  var audioProgressBar = document.getElementById("progress");
  audioProgressBar.max = audio.duration;
  audio.currentTime = audioProgressBar.value;
}

// play,pause, next, previous functionality
//---------------------------------------

var btnPlayPause = "";
 
function Play_Pause() {
  // it get the audio element id that which was created dynamically
  var audio = document.getElementById("audio");

  // get the TrackThumbnails id
  var audioThumbAnimation = document.getElementById("TrackThumbnails");

  //accessing the play/pause btn id
  btnPlayPause = document.getElementById("btnPlayPause");

  // implementing toggle
  if (btnPlayPause.classList.contains("bi-pause")) {
    // to pause the audio
    audio.pause();
    btnPlayPause.classList.remove("bi-pause");
    btnPlayPause.classList.add("bi-play");

    // adding the =>.animationPaused Class to stop runnig =>.rotateAnimation
    audioThumbAnimation.classList.add("animationPaused");
  } else {
    // to play the audio
    audio.play();
    btnPlayPause.classList.remove("bi-play");
    btnPlayPause.classList.add("bi-pause");

    // removing the =>.animationPaused Class to run =>.rotateAnimation
    audioThumbAnimation.classList.remove("animationPaused");
  }
}

// configuring the next button
function Next() {
  muteUnmute_PlayPauseToggleBtn();

  // changing the array Tracks index to next index i.e next song.
  // if Tracks finished then return to index 0.
  trackIndex = (trackIndex + 1) % Tracks.length;
  //    after change the music index load the music into player
  loadPlayer();
}

// configuring the previous button
function Previous() {
  muteUnmute_PlayPauseToggleBtn();
  trackIndex = (trackIndex - 1 + Tracks.length) % Tracks.length;
  loadPlayer();
}
// MusicPlayer Footer end
//======================================

function muteUnmute_PlayPauseToggleBtn() {
  
  //   changing the mute symbol to unmute as it changes to new song
  if (muteBtn.classList.contains("bi-volume-mute")) {
    muteBtn.classList.remove("bi-volume-mute");
    muteBtn.classList.add("bi-volume-up");
  }

  //   changing the pause button to play button .
  //   in case of user changes the song while pause the music
  if (btnPlayPause.classList.contains("bi-play")) {
    // to pause the audio
    btnPlayPause.classList.remove("bi-play");
    btnPlayPause.classList.add("bi-pause");
  }
}
