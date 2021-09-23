const header = document.querySelector(".header");
const playlist = document.querySelector(".playlist");
const player = document.querySelector(".bar-music .component-2");
const progress = document.querySelector(".bar-music .component-2 .progress");
const volumeprogess = document.querySelector('.bar-music .component-3 .volume .progress')

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

function handleHeader(){
  const settingEl = document.querySelector('.app .body .header .lever-right .setting')
  const settingChild = document.querySelector('.app .body .header .lever-right .setting .child')
  const offligthEl = document.querySelector('.app .body .header .lever-right .setting .content .off-light')
  const onlightEl = document.querySelector('.app .body .header .lever-right .setting .content .on-light')
  const defaultLight =  document.querySelector('.app .body .header .lever-right .setting .content .default-light')
  const userBtn = document.querySelector('.app .body .header .lever-right .user')
  const logoutEl = document.querySelector('.app .body .header .lever-right .user .child')


  userBtn.onclick = function(e){
    if(logoutEl.classList.contains('dn')){
      logoutEl.classList.remove('dn')
    }else{
      logoutEl.classList.add('dn')
    }
  }

  // Xu li khi bam setting
  settingEl.onclick = function(e){
    if(settingChild.classList.contains('dn')){
      settingChild.classList.remove('dn')
    }else{
      settingChild.classList.add('dn')
    }
  }

  // xu li khi bat tat den
  offligthEl.onclick = function(e){
    var x = document.getElementsByTagName("BODY")[0];
    var barMusic = document.querySelector('.app .bar-music')
    x.style.backgroundColor = "#170f23";
    x.style.backgroundImage = "none"
    barMusic.style.backgroundImage = "none"
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
    
  }
  onlightEl.onclick = function(e){
    var x = document.getElementsByTagName("BODY")[0];
    var barMusic = document.querySelector('.app .bar-music')
    

    // x.style.backgroundColor = "#6610f2";
    header.style.backgroundColor = 'rgb(55, 7, 93)'
    x.style.backgroundImage = "url('https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-background/zma.svg')"
    barMusic.style.backgroundImage = "url('https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-player/zma.png')"
    //https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/theme-player/zma.png
    // rgb(55, 7, 93)
  }
  defaultLight.onclick =function(e){
    var x = document.getElementsByTagName("BODY")[0];
    var barMusic = document.querySelector('.app .bar-music')
    x.style.backgroundColor = "#170f23";
    x.style.backgroundImage = "none"
    barMusic.style.backgroundImage = "none"
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
  }
}

handleHeader()

function loadData() {
  return $.ajax({
    url: "/music",
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
        <div class="song ${
          index === currentIndex ? "active" : ""
        }" data-id="${index}">
            <img src="${song.image}" alt="" style="width: 50px;height: 50px; object-fit: cover;}">
            <div class="song-body" style="width: 100%;margin-left:12px">
                <span class="title" style="font-size: 1rem;">${
                  song.name
                }</span><br />
                <span class="author" style="font-size: 0.9rem;color: #dadada79;">${
                  song.singer
                }</span>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                <i class="far fa-heart"></i>
                <i class="fas fa-microphone-alt"></i>
            </div>
        </div>`;
  });

  playlist.innerHTML = htmls.join(" ");
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

function handleEvents(data) {
  // thuoc tinh
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
  const playallBtn = document.querySelector(".playall");
  const hearts = document.querySelectorAll(".fa-heart");
  const imgLeftTop = document.querySelector(".img-level-top");
  const allSong = document.querySelectorAll(".song");
  const playManyImg = document.querySelector(".app .body .footer .listen")
  // phuong thuc
  // Khi click play
  playBtn.onclick = function (e) {
    if (isPlaying) {
      // render lai playallBtn
      playallBtn.innerHTML = `<i class="fas fa-play icon-play"></i>Phát Tất Cả`; 
      audio.pause();
    } else {
      // render lai playallBtn
      playallBtn.innerHTML = `<i class="fas fa-pause icon-pause"></i>Phát Tất Cả`;
      audio.play();
    }
  };

  // Xu li khi bam nut phat tat ca
  playallBtn.onclick = function (e) {
    playBtn.click();
    if (isPlaying) {
      console.log(1);
      playallBtn.innerHTML = `<i class="fas fa-play icon-play"></i>Phát Tất Cả`;

    } else {
      playallBtn.innerHTML = `<i class="fas fa-pause icon-pause"></i>Phát Tất Cả`;
      
    }
  };

  // Xu li khi nghe nhac
  audio.onplay = function (e) {
    player.classList.add("playing");
    isPlaying = true;

    for (let i = 0; i < allSong.length; i++) {
      console.log(122222)
      if (i == currentIndex) {
        allSong[i].classList.add("active");
      } else {
        allSong[i].classList.remove("active");
      }
    }

       // Xu li cd ca nhan quay
       imgLeftTop.style.animationName = 'rotate1'
       imgLeftTop.style.animationIterationCount = 'infinite'
       imgLeftTop.style.animationDuration = '9s'

       // Xu li nut phat tat ca
       playallBtn.innerHTML = `<i class="fas fa-pause icon-pause"></i>Phát Tất Cả`;
    cdThumbAnimate.play();
  };

  // Xu li khi dung
  audio.onpause = function (e) {
    player.classList.remove("playing");
    isPlaying = false;

      //Xu li cd ca nhan quay
      imgLeftTop.style.animationName = 'rotate2'
      imgLeftTop.style.animationIterationCount = '1'
      imgLeftTop.style.animationDuration = '0.8s'
       // Xu li nut phat tat ca
       playallBtn.innerHTML = `<i class="fas fa-play icon-play"></i>Phát Tất Cả`;
    cdThumbAnimate.pause();
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

    // Render Active Lại playlist Khi next
    for (let i = 0; i < allSong.length; i++) {
      if (i == currentIndex) {
        allSong[i].classList.add("active");
      } else {
        allSong[i].classList.remove("active");
      }
    }
  };

  // Xu li khi prev song
  prevBtn.onclick = function (e) {
    if (isRandom) {
      randomSong(data);
    } else {
      prevSong(data);
    }
    audio.play();

    // Render Active Lại playlist Khi next
    for (let i = 0; i < allSong.length; i++) {
      if (i == currentIndex) {
        allSong[i].classList.add("active");
      } else {
        allSong[i].classList.remove("active");
      }
    }
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

  // Xu li khi click vao tim
  hearts.forEach((heart) => {
    heart.onclick = function (e) {
      heart.classList.add("active");
    };
  });

  // Xu li khi click xong
  playlist.onclick = function(e){
     const songNode = e.target.closest('.song:not(.active)')
     if(songNode || e.target.closest('.option')){
         if(songNode){
             currentIndex = Number(songNode.dataset.id)
             loadCurrentSong(data)
             // Render Active Lại playlist Khi click
            for (let i = 0; i < allSong.length; i++) {
                if (i == currentIndex) {
                    allSong[i].classList.add("active");
                } else {
                    allSong[i].classList.remove("active");
                }
            }
            audio.play()
         }
     }
  }

  // Xử lí khi chỉnh volumn
  volumeprogess.onchange = function(e){
    audio.volume = volumeprogess.value / 100
    console.log(volumeprogess.value)
  }

  // Xu li khi click vao hinh anh play nhieu
  // Lưu ý logic phía dưới chỉ xử lí khi có nhiều hơn 1 bài hát tại nếu có 1 bài hát thì length = 1 thì vòng lặp k bảo giờ kết thúc được
  playManyImg.onclick = function(e){
     let newIndex;
     do {
       newIndex = Math.floor(Math.random() * data.length);
     } while (newIndex === currentIndex);
    currentIndex = newIndex;
    console.log(currentIndex)
    loadCurrentSong(data)
    audio.play()
  }
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
