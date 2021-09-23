const header = document.querySelector(".header");
const playlist = document.querySelector(".playlist");
const player = document.querySelector(".bar-music .component-2");
const progress = document.querySelector(".bar-music .component-2 .progress");
const volumeprogess = document.querySelector(
  ".bar-music .component-3 .volume .progress"
);

// const audioEl = document.querySelector('#audio')

const zingchartBody = document.querySelector(
  ".app .body .body-items .zingchart_body"
);
const audio = document.querySelector("#audio");
const playBtn = document.querySelector(".btn-toggle-play");
const cd = document.querySelector(".bar-music .component-1 img");
const nextBtn = document.querySelector(".bar-music .component-2 .btn-next");
const prevBtn = document.querySelector(".bar-music .component-2 .btn-prev");
const randomBtn = document.querySelector(".bar-music .component-2 .btn-random");
const repeatBtn = document.querySelector(".bar-music .component-2 .btn-repeat");

let currentIndex = 0;
let isPlaying = false;
let isRandom = false;
let isReapeat = false;

window.onscroll = function (e) {
  if (window.scrollY > 0) {
    header.style.backgroundColor = "rgb(23, 15, 26)";
  } else {
    header.style.backgroundColor = "transparent";
  }
};

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

//https://mp3.zing.vn/xhr/media/get-source?type=audio&key=kmJHTZHNCVaSmSuymyFHLH

// Dùng API Có Sẵn Nhưng Chưa Có thời gian làm
/*
function loadData() {
  return $.ajax({
    url: "https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1",
    type: "GET",
  });
}

async function getApiMp3Src(){
    const list = await loadData();
    const song = list.data.song
    return song
}

async function audioApi(index){
    let audioSrc = await getApiMp3Src()
    return $.ajax({
        url: `https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${audioSrc[index].code}`,
        type: "GET",
      });
}

async function link(index){
    let audioLink = await audioApi(index)
    console.log(audioLink.data.source[128])
    let string = 'https://vnso-qt-3-tf-' + audioLink.data.source[128].slice(2)
    console.log(string)
    audioEl.src = string
    return 1;
}
// link(0)

playBtn.onclick = async function(e){
    await link(1)
    audioEl.play()
}

async function app(){

}
*/

function loadData() {
  return $.ajax({
    url: "/zingchart",
    type: "POST",
  });
}

async function getData() {
  // data
  const list = await loadData();

  // method
  app(list);
}
getData();

function app(data) {
  // render music
  render(data);

  // Xu li su kien
  handleEvents(data);

  // load currentSongs
  loadCurrentSong(data);
}

function render(data) {
  var htmls = data.map((song, index) => {
    return `
      <div class="zingchart_item" style="cursor:pointer">
        <div class="song ${
          index === currentIndex ? "active" : ""
        }" data-id="${index}">
            <div class="right" style="display: flex;align-items: center;">
                <p class="rank index-${index}">${index + 1}</p>
                <p class="mark_image" style="font-size: 1.4rem;margin: 0 15px;font-weight: 800;color: #eee;">-</p>
                <img src="${
                  song.image
                }" alt="" style="width: 50px;height: 50px;border-radius:4px; object-fit: cover;}">
                <button class="pause-btn dn" style="background: transparent;outline: none;border: none;position:relative;"><img src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/icons/icon-playing.gif" style="width:20px;position: absolute;left: -2.3rem;" alt=""></button>
            </div>
            <div class="song-body" style="display: flex;width: 100%;margin-left: 12px;flex-direction: column;">
                <span class="title" style="font-size: 1rem;color:#fff">${
                  song.name
                }</span>
                <span class="author" style="font-size: 0.9rem;color: #dadada79;">${
                  song.singer
                }</span>
            </div>
            <div class="option" style="display: flex;">
                <i class="fas fa-ellipsis-h"></i>
                <i class="far fa-heart"></i>
                <i class="fas fa-microphone-alt"></i>
        </div>
  </div>`;
  });

  zingchartBody.innerHTML = htmls.join(" ");
}

function handleEvents(data) {
  // Phuong Thuc
  const allSong = document.querySelectorAll(".song");

  // Khi click play
  playBtn.onclick = function (e) {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  // Trong khi nghe nhac
  audio.onplay = function (e) {
    player.classList.add("playing");
    isPlaying = true;
    cdThumbAnimate.play();

    // Render Active Lại playlist Khi click
    for (let i = 0; i < allSong.length; i++) {
        console.log(allSong[i])
      if (i == currentIndex) {
        allSong[i].classList.add("active");
        const songElPlay = allSong[i].querySelector('.pause-btn')
        songElPlay.classList.remove('dn')
        console.log(songElPlay)
      } else {
        allSong[i].classList.remove("active");
        const songElPlay = allSong[i].querySelector('.pause-btn')
        songElPlay.classList.add('dn')
      }
    }
  };

  // Xu li khi dung
  audio.onpause = function (e) {
    player.classList.remove("playing");
    isPlaying = false;
    cdThumbAnimate.pause();

    // Render Active Lại playlist Khi click
    for (let i = 0; i < allSong.length; i++) {
      if (i == currentIndex) {
        allSong[i].classList.add("active");
      } else {
        allSong[i].classList.remove("active");
      }
    }
  };

  // Xu li khi phat bai hat
  audio.ontimeupdate = function (e) {
    if (audio.duration) {
      let percent = Math.floor((audio.currentTime * 100) / audio.duration);
      progress.value = percent;
    }
  };

  // xu li khi tua song
  progress.onchange = function (e) {
    let value = progress.value;
    let updateTime = (value * audio.duration) / 100;
    audio.currentTime = updateTime;
  };

  // Xu li CD Quay
  const cdThumbAnimate = cd.animate([{ transform: "rotate(360deg)" }], {
    duration: 9000,
    iterations: Infinity,
    easing: "linear",
  });

  cdThumbAnimate.pause();

  // Xu li khi next song
  nextBtn.onclick = function (e) {
    if (isRandom) {
      randomSong(data);
    } else {
      nextSong(data);
    }
    audio.play();
  };

  // Xu li khi prev song
  prevBtn.onclick = function (e) {
    if (isRandom) {
      randomSong(data);
    } else {
      prevSong(data);
    }
    audio.play();
  };

  // Khi ket thuc song
  audio.onended = function (e) {
    if (isReapeat) {
      audio.play();
    } else {
      nextBtn.click();
    }
  };

  // radom song
  randomBtn.onclick = function (e) {
    if (isRandom) {
      randomBtn.classList.remove("active");
      isRandom = false;
    } else {
      isRandom = true;
      randomBtn.classList.add("active");
    }
  };

  // repeat song
  repeatBtn.onclick = function (e) {
    if (isReapeat) {
      repeatBtn.classList.remove("active");
      isReapeat = false;
    } else {
      isReapeat = true;
      repeatBtn.classList.add("active");
    }
  };

  // Khi bam do playlist
  zingchartBody.onclick = function (e) {
    const songNode = e.target.closest(".song:not(.active)");
    if (songNode) {
      currentIndex = Number(songNode.dataset.id);
      console.log(currentIndex);

      loadCurrentSong(data);
      // Render Active Lại playlist Khi click
      for (let i = 0; i < allSong.length; i++) {
        if (i == currentIndex) {
          allSong[i].classList.add("active");
        } else {
          allSong[i].classList.remove("active");
        }
      }
      audio.play();
    }
    // Xử lí khi chỉnh volumn
    volumeprogess.onchange = function(e){
        audio.volume = volumeprogess.value / 100
        console.log(volumeprogess.value)
    }
  };
}

function loadCurrentSong(data) {
  // thuoc tinh
  const cd = document.querySelector(".bar-music .component-1 img");
  const title = document.querySelector(".bar-music .component-1 .title .name");
  const singer = document.querySelector(
    ".bar-music .component-1 .title .author"
  );
  // phuong thuc
  const song = data[currentIndex];

  cd.src = song.image;
  title.innerText = song.name;
  singer.innerText = song.singer;
  audio.src = song.path;
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
