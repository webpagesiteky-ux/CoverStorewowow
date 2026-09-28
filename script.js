// ==========================================
// Cover Store Hero Slider
// ==========================================

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
const progressBar = document.querySelector(".hero-progress-bar");

let current = 0;
let slideTimer;


// ==========================================
// スライダーが存在するページだけ実行
// ==========================================

if(slides.length > 0){

    // --------------------
    // スライド表示
    // --------------------

    function showSlide(index){

        slides.forEach(slide => {

            slide.classList.remove("active");

        });


        slides[index].classList.add("active");


        // --------------------
        // ドット更新
        // --------------------

        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        if(dots[index]){

            dots[index].classList.add("active");

        }


        // --------------------
        // プログレスバー
        // --------------------

        if(progressBar){

            progressBar.style.transition = "none";

            progressBar.style.width = "0%";


            // ブラウザに反映させてからアニメーション開始
            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    progressBar.style.transition =
                        "width 5s linear";

                    progressBar.style.width = "100%";

                });

            });

        }

    }


    // ==========================================
    // 自動スライド
    // ==========================================

    function startSlider(){

        clearInterval(slideTimer);


        slideTimer = setInterval(() => {

            current++;


            if(current >= slides.length){

                current = 0;

            }


            showSlide(current);

        },5000);

    }


    // ==========================================
    // 次のスライド
    // ==========================================

    function nextSlide(){

        current++;


        if(current >= slides.length){

            current = 0;

        }


        showSlide(current);

        startSlider();

    }


    // ==========================================
    // 前のスライド
    // ==========================================

    function prevSlide(){

        current--;


        if(current < 0){

            current = slides.length - 1;

        }


        showSlide(current);

        startSlider();

    }


    // ==========================================
    // ▶ ボタン
    // ==========================================

    const nextButtons =
        document.querySelectorAll(".next-slide");


    nextButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                nextSlide();

            }
        );

    });


    // ==========================================
    // ◀ ボタン
    // ==========================================

    const prevButtons =
        document.querySelectorAll(".prev-slide");


    prevButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                prevSlide();

            }
        );

    });


    // ==========================================
    // ドット
    // ==========================================

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();


                current = index;

                showSlide(current);

                startSlider();

            }
        );

    });


    // ==========================================
    // 初期表示
    // ==========================================

    showSlide(current);

    startSlider();

}


// ==========================================
// Cover Store Favorites
// ==========================================


// --------------------
// お気に入りボタンを取得
// --------------------

const favoriteButtons = document.querySelectorAll(
    ".favorite-btn, .product-favorite-btn"
);


// --------------------
// 保存されているお気に入りを取得
// --------------------

let favorites =
    JSON.parse(
        localStorage.getItem("coverStoreFavorites")
    ) || [];


// --------------------
// ハートの表示を更新
// --------------------

function updateFavorite(button, isFavorite){

    const heart = button.querySelector("img");


    if(!heart){

        return;

    }


    if(isFavorite){

        button.classList.add("active");

        heart.src =
            "images/塗り潰しハート.png";

    }else{

        button.classList.remove("active");

        heart.src =
            "images/中抜きハート.png";

    }

}


// --------------------
// 初期状態を反映
// --------------------

favoriteButtons.forEach(button => {

    const product =
        button.dataset.product;


    const isFavorite =
        favorites.includes(product);


    updateFavorite(
        button,
        isFavorite
    );

});


// --------------------
// クリック処理
// --------------------

favoriteButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            const product =
                button.dataset.product;


            // --------------------
            // お気に入り解除
            // --------------------

            if(favorites.includes(product)){

                favorites =
                    favorites.filter(
                        item => item !== product
                    );


                updateFavorite(
                    button,
                    false
                );

            }


            // --------------------
            // お気に入り追加
            // --------------------

            else{

                favorites.push(product);


                updateFavorite(
                    button,
                    true
                );

            }


            // --------------------
            // localStorageに保存
            // --------------------

            localStorage.setItem(
                "coverStoreFavorites",
                JSON.stringify(favorites)
            );

        }
    );

});




/* ==========================================
   New Magazines - More Button
========================================== */

const newMoreButton = document.getElementById("new-more-button");
const newHidden = document.querySelector(".new-hidden");

if(newMoreButton && newHidden){

    newMoreButton.addEventListener("click", () => {

        const isOpen = newHidden.classList.toggle("show");

        newMoreButton.classList.toggle("active", isOpen);

        newMoreButton.innerHTML = isOpen
            ? '閉じる <span>↓</span>'
            : 'もっと見る <span>↓</span>';

    });

}

/* ==========================================
   スマホ用メニュー
========================================== */

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileNav = document.querySelector("header nav");

if(mobileMenuButton && mobileNav){

    mobileMenuButton.addEventListener("click", () => {

        const isOpen = mobileNav.classList.toggle("mobile-open");

        mobileMenuButton.textContent = isOpen ? "×" : "☰";

        mobileMenuButton.setAttribute(
            "aria-label",
            isOpen ? "メニューを閉じる" : "メニューを開く"
        );

    });


    /* メニューを選んだら閉じる */
    mobileNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("mobile-open");

            mobileMenuButton.textContent = "☰";

            mobileMenuButton.setAttribute(
                "aria-label",
                "メニューを開く"
            );

        });

    });

}

/* ==========================================
   スマホ用検索画面
========================================== */

const mobileSearchOpen =
    document.getElementById("mobile-search-open");

const mobileSearchOverlay =
    document.getElementById("mobile-search-overlay");

const mobileSearchClose =
    document.getElementById("mobile-search-close");

const mobileSearchInput =
    document.getElementById("mobile-search-input");


if(
    mobileSearchOpen &&
    mobileSearchOverlay &&
    mobileSearchClose
){

    /* 検索画面を開く */
    mobileSearchOpen.addEventListener("click", () => {

        mobileSearchOverlay.classList.add("search-open");

        document.body.classList.add("mobile-search-active");

        setTimeout(() => {

            if(mobileSearchInput){
                mobileSearchInput.focus();
            }

        }, 350);

    });


    /* 検索画面を閉じる */
    mobileSearchClose.addEventListener("click", () => {

        mobileSearchOverlay.classList.remove("search-open");

        document.body.classList.remove("mobile-search-active");

    });


    /* 背景部分をタップしても閉じる */
    mobileSearchOverlay.addEventListener("click", (event) => {

        if(event.target === mobileSearchOverlay){

            mobileSearchOverlay.classList.remove("search-open");

            document.body.classList.remove("mobile-search-active");

        }

    });

}

/* ==========================================
   Product Page Mobile Menu / Search
========================================== */

const productMobileMenuButton =
    document.getElementById("product-mobile-menu-button");

const productMobileNav =
    document.getElementById("product-mobile-nav");

const productMobileSearchOpen =
    document.getElementById("product-mobile-search-open");

const productSearchOverlay =
    document.getElementById("product-search-overlay");

const productSearchClose =
    document.getElementById("product-search-close");

const productMobileSearchInput =
    document.getElementById("product-mobile-search-input");


/* -------------------------
   スマホメニュー
------------------------- */

if(productMobileMenuButton && productMobileNav){

    productMobileMenuButton.addEventListener("click", () => {

        const isOpen =
            productMobileNav.classList.toggle("mobile-open");

        productMobileMenuButton.textContent =
            isOpen ? "×" : "☰";

    });


    productMobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                productMobileNav.classList.remove("mobile-open");

                productMobileMenuButton.textContent = "☰";

            });

        });

}


/* -------------------------
   スマホ検索
------------------------- */

if(
    productMobileSearchOpen &&
    productSearchOverlay &&
    productSearchClose
){

    productMobileSearchOpen.addEventListener("click", () => {

        productSearchOverlay.classList.add("search-open");

        document.body.classList.add("product-search-active");

        setTimeout(() => {

            if(productMobileSearchInput){

                productMobileSearchInput.focus();

            }

        }, 350);

    });


    productSearchClose.addEventListener("click", () => {

        productSearchOverlay.classList.remove("search-open");

        document.body.classList.remove("product-search-active");

    });


    productSearchOverlay.addEventListener("click", event => {

        if(event.target === productSearchOverlay){

            productSearchOverlay.classList.remove("search-open");

            document.body.classList.remove("product-search-active");

        }

    });

}