const glides = document.querySelectorAll('.glide__slide')
const nextGlide = document.querySelector('.next-glide')
const prevGlide = document.querySelector('.prev-glide')
const glideSlides = document.querySelector('.glide__slides')

let temp = 1
let timerId

function moveSlide(count){
     glides.forEach((glide,index) => {
        if(count===1){
            let glideWidth = glide.offsetWidth
            if(index==0)
                glide.style.transform = `translateX(${glideWidth}px)`
            else if(index==1)
                glide.style.transform = `translateX(${glideWidth}px)`
            else
                glide.style.transform = `translateX(-${glideWidth*2}px)`
        }else if(count===2){
            let glideWidth = glide.offsetWidth
            if(index==0)
                glide.style.transform = `translateX(${2*glideWidth}px)`
            else if(index==1)
                glide.style.transform = `translateX(${-glideWidth}px)`
            else
                glide.style.transform = `translateX(-${glideWidth}px)`
        }
        else{
            let glideWidth = glide.offsetWidth
            if(index==0)
                glide.style.transform = `translateX(0px)`
            else if(index==1)
                glide.style.transform = `translateX(0px)`
            else
                glide.style.transform = `translateX(0px)`
        } 

    })
}
nextGlide.onclick = function(e){
    temp++
    if(temp>3){
        temp = 1
    }
    moveSlide(temp)
}
prevGlide.onclick = function(e){
    temp++
    if(temp>3){
        temp = 1
    }
    moveSlide(temp)
}
function autoSlide(){
    timerId = setInterval(function(){
        moveSlide(temp)
        temp++
        if(temp>3){
            temp = 1
        }
    },2500)
}
autoSlide()

