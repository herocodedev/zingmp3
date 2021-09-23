const explorePlaylist = document.querySelector(".explore_playlist");
const exploreVideo = document.querySelector(".explore_video")
const audio = document.querySelector("#audio");
const header = document.querySelector(".header");
const player = document.querySelector(".bar-music .component-2");
const progress = document.querySelector(".bar-music .component-2 .progress");

let currentIndex = 0;
let isPlaying = false;
let isRandom = false;
let isReapeat = false;


let currentIndex1 = 0;
let isPlaying1 = false;
let isRandom1 = false;
let isReapeat1 = false;

// Xu li khi scroll thanh header
window.onscroll = function (e) {
  if (window.scrollY > 0) {
    header.style.backgroundColor = "rgb(23, 15, 26)";
  } else {
    header.style.backgroundColor = "transparent";
  }
};

// Xử lí sự kiện trên thanh header
function handleHeader() {
  const settingEl = document.querySelector(
    ".app .body .header .lever-right .setting"
  );
  const settingChild = document.querySelector(
    ".app .body .header .lever-right .setting .child"
  );
  const offligthEl = document.querySelector(
    ".app .body .header .lever-right .setting .content .off-light"
  );
  const onlightEl = document.querySelector(
    ".app .body .header .lever-right .setting .content .on-light"
  );
  const defaultLight = document.querySelector(
    ".app .body .header .lever-right .setting .content .default-light"
  );
  const userBtn = document.querySelector(
    ".app .body .header .lever-right .user"
  );
  const logoutEl = document.querySelector(
    ".app .body .header .lever-right .user .child"
  );

  userBtn.onclick = function (e) {
    if (logoutEl.classList.contains("dn")) {
      logoutEl.classList.remove("dn");
    } else {
      logoutEl.classList.add("dn");
    }
  };

  // Xu li khi bam setting
  settingEl.onclick = function (e) {
    if (settingChild.classList.contains("dn")) {
      settingChild.classList.remove("dn");
    } else {
      settingChild.classList.add("dn");
    }
  };

  // xu li khi bat tat den
  offligthEl.onclick = function (e) {
    var x = document.getElementsByTagName("BODY")[0];
    var barMusic = document.querySelector(".app .bar-music");
    x.style.backgroundColor = "#170f23";
    x.style.backgroundImage = "none";
    barMusic.style.backgroundImage = "none";
    header.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  };
  onlightEl.onclick = function (e) {
    var x = document.getElementsByTagName("BODY")[0];
    var barMusic = document.querySelector(".app .bar-music");

    // x.style.backgroundColor = "#6610f2";
    header.style.backgroundColor = "rgb(55, 7, 93)";
    x.style.backgroundImage =
      "url('https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/zma.svg')";
    barMusic.style.backgroundImage =
      "url('https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-player/zma.png')";
    //https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-player/zma.png
    // rgb(55, 7, 93)
  };
  defaultLight.onclick = function (e) {
    var x = document.getElementsByTagName("BODY")[0];
    var barMusic = document.querySelector(".app .bar-music");
    x.style.backgroundColor = "#170f23";
    x.style.backgroundImage = "none";
    barMusic.style.backgroundImage = "none";
    header.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  };
}

handleHeader();

function loadData() {
  return $.ajax({
    url: "/explore",
    type: "POST",
  });
}

async function getData() {
  let data = await loadData();

  // su dung data
  app(data);
}
getData();

/// <div class="loader"></div>

function app(data) {
  // render
  render(data);

  // xu li su kien
  handleEvents(data);

  // loadata
  loadCurrentSong(data);
}

function render(data) {
  let htmls1 = data.map((music, index) => {
    return `
        <div class="item" data-id="${index}" style="${index>=5 ? 'margin-top:5rem;' : ''}">
            <img src="${music.image}" alt="">
            <p>${music.name}</p>
            <div class="controls">
                <button class="pause-btn dn"><img src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/icons/icon-playing.gif" alt=""></button>
                <button class="play-btn"><i class="fas fa-play"></i></button>
            </div>
        </div>
        `;
    
  });
  explorePlaylist.innerHTML = htmls1.join("");

}

function handleEvents(data) {
    const audio = document.querySelector("#audio");
    const playBtn = document.querySelector(".btn-toggle-play");
    const cd = document.querySelector(".bar-music .component-1 img");
    const nextBtn = document.querySelector(".bar-music .component-2 .btn-next");
    const prevBtn = document.querySelector(".bar-music .component-2 .btn-prev");
    const randomBtn = document.querySelector(
        ".bar-music .component-2 .btn-random"
    );
    const repeatBtn = document.querySelector(
        ".bar-music .component-2 .btn-repeat"
    );
    const volumeprogess = document.querySelector(
        ".bar-music .component-3 .volume .progress"
    );
    const controlsPlayAlbum = document.querySelector('.app .body-items .explore_playlist .item .controls .play-btn')
    const controlsPauseAlbum = document.querySelector('.app .body-items .explore_playlist .item .controls .pause-btn')
    const allSong = document.querySelectorAll('.app .body-items .item')
      console.log(allSong)
  // Xu li khi click play
  playBtn.onclick = function (e) {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };
  // khi nghe nhac
  audio.onplay = function (e) {
    isPlaying = true;
    player.classList.add("playing");
    cdThumbAnimate.play();
    // render lại active khi bài hát play
    for(let i=0;i<allSong.length;i++){
        if(i==currentIndex){
            allSong[i].classList.add('opc')
            let songElPlay = allSong[i].querySelector('.play-btn')
            let songElPause = allSong[i].querySelector('.pause-btn')
            
            songElPlay.classList.add('dn')
            songElPause.classList.remove('dn')
        }else{
            allSong[i].classList.remove('opc')
            let songElPlay = allSong[i].querySelector('.play-btn')
            let songElPause = allSong[i].querySelector('.pause-btn')
            songElPause.classList.add('dn')
            songElPlay.classList.remove('dn')
        }
    }
   
  };
  // khi pause nhac
  audio.onpause = function (e) {
    isPlaying = false;
    player.classList.remove("playing");
    cdThumbAnimate.pause();
    // render lại active khi bài hát play
    for(let i=0;i<allSong.length;i++){
        if(i==currentIndex){
            allSong[i].classList.add('opc')
            let songElPlay = allSong[i].querySelector('.play-btn')
            let songElPause = allSong[i].querySelector('.pause-btn')
            songElPlay.classList.remove('dn')
            songElPause.classList.add('dn')
        }else{
            allSong[i].classList.remove('opc')
            let songElPlay = allSong[i].querySelector('.play-btn')
            let songElPause = allSong[i].querySelector('.pause-btn')
            songElPause.classList.add('dn')
            songElPlay.classList.remove('dn')
        }
    }
    
  };
  // khi next song
  nextBtn.onclick = function (e) {
    if (isRandom) {
      randomSong(data);
    } else {
      nextSong(data);
    }
    audio.play();
  };
  // khi prev song
  prevBtn.onclick = function (e) {
    if (isRandom) {
      randomSong(data);
    } else {
      prevSong(data);
    }
    audio.play();
  };

  // Xu li phat bai hat
  audio.ontimeupdate = function (e) {
    if (audio.duration) {
      let percent = Math.floor((audio.currentTime * 100) / audio.duration);
      progress.value = percent;
    }
  };

  // xu li khi tua
  progress.onchange = function (e) {
    let seekTime = progress.value;
    audio.currentTime = Math.floor((seekTime / 100) * audio.duration);
  };

  // Xu li bat tat random
  randomBtn.onclick = function (e) {
    isRandom = !isRandom;
    this.classList.toggle("active", isRandom);
  };

  // Xi li bat tat repeat
  repeatBtn.onclick = function (e) {
    isReapeat = !isReapeat;
    this.classList.toggle("active", isReapeat);
  };

  // xu li khi bai hat ket thuc
  audio.onended = function (e) {
    if (isReapeat) audio.play();
    else{
        nextBtn.click()
    }
  };

  // xu li khi tang giam am luong
  volumeprogess.onchange = function (e) {
    audio.volume = volumeprogess.value / 100;
    console.log(volumeprogess.value);
  };

  // Khi click do nút play
  explorePlaylist.onclick = function(e){
    const songNode = e.target.closest('.item:not(.active)')
    if(songNode){
        currentIndex = Number(songNode.dataset.id)
        loadCurrentSong(data)
        audio.play()
    }
  }

  // Xu li cd quay
  const cdThumbAnimate = cd.animate([{ transform: "rotate(360deg)" }], {
    duration: 9000,
    iterations: Infinity,
    easing: "linear",
  });

  cdThumbAnimate.pause();
}

function loadCurrentSong(data) {
  const cd = document.querySelector(".bar-music .component-1 img");
  const title = document.querySelector(".bar-music .component-1 .title .name");
  const singer = document.querySelector(
    ".bar-music .component-1 .title .author"
  );
  const audio = document.querySelector("#audio");

  const song = data[currentIndex];
  audio.src = song.path;
  cd.src = song.image;
  title.innerText = song.name;
}

function nextSong(data) {
  currentIndex++;
  if (currentIndex >= data.length) currentIndex = 0;
  loadCurrentSong(data);
}

function prevSong(data) {
  currentIndex--;
  if (currentIndex < 0) currentIndex = data.length - 1;
  loadCurrentSong(data);
}

function randomSong(data) {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * data.length);
  } while (newIndex === currentIndex);
  currentIndex = newIndex;
  loadCurrentSong(data);
}


/* */


//  function handleEvents1(data) {
//    const audio = document.querySelector("#audio");
//    const playBtn = document.querySelector(".btn-toggle-play");
//    const cd = document.querySelector(".bar-music .component-1 img");
//    const nextBtn = document.querySelector(".bar-music .component-2 .btn-next");
//    const prevBtn = document.querySelector(".bar-music .component-2 .btn-prev");
//    const randomBtn = document.querySelector(
//        ".bar-music .component-2 .btn-random"
//    );
//    const repeatBtn = document.querySelector(
//        ".bar-music .component-2 .btn-repeat"
//    );
//    const volumeprogess = document.querySelector(
//        ".bar-music .component-3 .volume .progress"
//    );
//    const controlsPlayAlbum = document.querySelector('.app .body-items .explore_playlist .item .controls .play-btn')
//    const controlsPauseAlbum = document.querySelector('.app .body-items .explore_playlist .item .controls .pause-btn')
//    const allSong = document.querySelectorAll('.app .body-items .explore_playlist .item')

//     // Xu li khi click play
//     playBtn.onclick = function (e) {
//       if (isPlaying1) {
//         audio.pause();
//       } else {
//         audio.play();
//       }
//     };


//     // khi nghe nhac
//   audio.onplay = function (e) {
//     isPlaying1 = true;
//     player.classList.add("playing");
//     cdThumbAnimate.play();
//     // render lại active khi bài hát play
//     for(let i=0;i<allSong.length;i++){
//         if(i==currentIndex){
//             allSong[i].classList.add('opc')
//             let songElPlay = allSong[i].querySelector('.play-btn')
//             let songElPause = allSong[i].querySelector('.pause-btn')
//             songElPlay.classList.add('dn')
//             songElPause.classList.remove('dn')
//         }else{
//             allSong[i].classList.remove('opc')
//             let songElPlay = allSong[i].querySelector('.play-btn')
//             let songElPause = allSong[i].querySelector('.pause-btn')
//             songElPause.classList.add('dn')
//             songElPlay.classList.remove('dn')
//         }
//     }
   
//   };
//   // khi pause nhac
//   audio.onpause = function (e) {
//     isPlaying1 = false;
//     player.classList.remove("playing");
//     cdThumbAnimate.pause();
//     // render lại active khi bài hát play
//     for(let i=0;i<allSong.length;i++){
//         if(i==currentIndex){
//             allSong[i].classList.add('opc')
//             let songElPlay = allSong[i].querySelector('.play-btn')
//             let songElPause = allSong[i].querySelector('.pause-btn')
//             songElPlay.classList.remove('dn')
//             songElPause.classList.add('dn')
//         }else{
//             allSong[i].classList.remove('opc')
//             let songElPlay = allSong[i].querySelector('.play-btn')
//             let songElPause = allSong[i].querySelector('.pause-btn')
//             songElPause.classList.add('dn')
//             songElPlay.classList.remove('dn')
//         }
//     }
//   };

//    // Xu li khi click play
//   exploreVideo.onclick = function(e){
//     const songNode = e.target.closest('.item:not(.active)')
//     if(songNode){
//         currentIndex1 = Number(songNode.dataset.id)
//         loadCurrentSong1(data)
//         audio.play()
//     }
//   }


//   // Xu li cd quay
//   const cdThumbAnimate = cd.animate([{ transform: "rotate(360deg)" }], {
//     duration: 9000,
//     iterations: Infinity,
//     easing: "linear",
//   });

//   cdThumbAnimate.pause();

// }


// function loadCurrentSong1(data) {
//   const cd = document.querySelector(".bar-music .component-1 img");
//   const title = document.querySelector(".bar-music .component-1 .title .name");
//   const singer = document.querySelector(
//     ".bar-music .component-1 .title .author"
//   );
//   const audio = document.querySelector("#audio");

//   const song = data[currentIndex1];
//   audio.src = song.path2;
//   cd.src = song.image2;
//   title.innerText = song.name2;
// }

