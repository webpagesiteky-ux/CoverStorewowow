// ======================================
// Cover Store Hero Slider Ver.3.0
// ======================================

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

const prevButtons = document.querySelectorAll(".prev-slide");
const nextButtons = document.querySelectorAll(".next-slide");

const progressBar = document.querySelector(".hero-progress-bar");

let current = 0;
let timer;

// ------------------------
// 表示切り替え
// ------------------------

function showSlide(index){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    animateProgress();

}

// ------------------------
// 次へ
// ------------------------

function nextSlide(){

    current++;

    if(current >= slides.length){

        current = 0;

    }

    showSlide(current);

}

// ------------------------
// 前へ
// ------------------------

function prevSlide(){

    current--;

    if(current < 0){

        current = slides.length - 1;

    }

    showSlide(current);

}

// ------------------------
// 自動再生
// ------------------------

function startSlider(){

    stopSlider();

    timer = setInterval(nextSlide,5000);

    animateProgress();

}

function stopSlider(){

    clearInterval(timer);

}

// ------------------------
// プログレスバー
// ------------------------

function animateProgress(){

    progressBar.style.transition = "none";
    progressBar.style.width = "0%";

    setTimeout(()=>{

        progressBar.style.transition = "width 5s linear";
        progressBar.style.width = "100%";

    },30);

}

// ------------------------
// 矢印
// ------------------------

nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        nextSlide();

        startSlider();

    });

});

prevButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        prevSlide();

        startSlider();

    });

});

// ------------------------
// ドット
// ------------------------

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        current = index;

        showSlide(current);

        startSlider();

    });

});

// ------------------------
// ホバーで停止
// ------------------------

const hero = document.querySelector(".hero");

hero.addEventListener("mouseenter",()=>{

    stopSlider();

});

hero.addEventListener("mouseleave",()=>{

    startSlider();

});

// ------------------------
// 初期化
// ------------------------

showSlide(current);

startSlider();

// Heroクリックで商品ページへ

slides.forEach((slide,index)=>{

    slide.style.cursor = "pointer";

    slide.addEventListener("click",(e)=>{

        if(e.target.closest(".hero-btn")) return;

        const pages = [

            "endfield.html",

            "marthe.html",

            "wuling.html"

        ];

        window.location.href = pages[index];

    });

});

