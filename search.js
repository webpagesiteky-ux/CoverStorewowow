// ==========================================
// Cover Store 検索結果 Ver.1.0
// ==========================================

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

const products = document.querySelectorAll(
    "#search-products .card"
);

const keywordDisplay = document.querySelector(
    "#search-keyword"
);

const noResults = document.querySelector(
    "#no-results"
);

const searchCount = document.querySelector(
    "#search-count"
);


// --------------------
// URLから検索ワードを取得
// --------------------

const params = new URLSearchParams(
    window.location.search
);

const keyword = (
    params.get("keyword") || ""
).trim().toLowerCase();


// --------------------
// 検索実行
// --------------------

function searchProducts(){

    let found = 0;

    products.forEach(product => {

        const name = (
            product.dataset.name || ""
        ).toLowerCase();

        const keywords = (
            product.dataset.keywords || ""
        ).toLowerCase();

        const target = name + " " + keywords;

        if(
            keyword === "" ||
            target.includes(keyword)
        ){

            product.style.display = "";

            found++;

        }else{

            product.style.display = "none";

        }

    });


    // --------------------
    // 検索ワード表示
    // --------------------

    keywordDisplay.textContent =
        keyword || "すべて";


// --------------------
// 検索結果件数
// --------------------

searchCount.textContent = found;


// --------------------
// 検索結果0件
// --------------------

if(found === 0){

    noResults.style.display = "block";

}else{

    noResults.style.display = "none";

}

}


// --------------------
// 検索バーから再検索
// --------------------

function goSearch(){

    const newKeyword = searchInput.value.trim();

    if(newKeyword === ""){

        window.location.href = "search.html";

        return;

    }

    window.location.href =
        "search.html?keyword=" +
        encodeURIComponent(newKeyword);

}


// --------------------
// 検索ボタン
// --------------------

searchButton.addEventListener(
    "click",
    goSearch
);


// --------------------
// Enterキー
// --------------------

searchInput.addEventListener(
    "keydown",
    event => {

        if(event.key === "Enter"){

            goSearch();

        }

    }
);

// --------------------
// 並び替え
// --------------------

const sortSelect = document.querySelector("#sort-select");

if(sortSelect){

    sortSelect.addEventListener("change",()=>{

        const sortType = sortSelect.value;

        const container =
            document.querySelector("#search-products");

        const productArray =
            Array.from(products);

        productArray.sort((a,b)=>{

            if(sortType === "price-low"){

                const priceA =
                    parseInt(
                        a.querySelector(".price").textContent
                        .replace(/[^\d]/g,"")
                    );

                const priceB =
                    parseInt(
                        b.querySelector(".price").textContent
                        .replace(/[^\d]/g,"")
                    );

                return priceA - priceB;

            }


            if(sortType === "price-high"){

                const priceA =
                    parseInt(
                        a.querySelector(".price").textContent
                        .replace(/[^\d]/g,"")
                    );

                const priceB =
                    parseInt(
                        b.querySelector(".price").textContent
                        .replace(/[^\d]/g,"")
                    );

                return priceB - priceA;

            }


            if(sortType === "rating-high"){

                const ratingA =
                    parseFloat(
                        a.querySelector(".rating span").textContent
                    );

                const ratingB =
                    parseFloat(
                        b.querySelector(".rating span").textContent
                    );

                return ratingB - ratingA;

            }


            return 0;

        });


        productArray.forEach(product=>{

            container.appendChild(product);

        });

    });

}

// --------------------
// 初期化
// --------------------

searchProducts();