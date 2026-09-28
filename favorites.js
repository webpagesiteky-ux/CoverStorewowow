// ==========================================
// Cover Store Favorites Page
// ==========================================


// --------------------
// 商品データ
// --------------------

const favoriteProducts = [

    {
        id: "ENDFIELD",
        name: "ENDFIELD",
        image: "images/endfield.png",
        link: "endfield.html",
        rating: "4.3",
        price: "¥980（税込）"
    },

    {
        id: "MARTHE",
        name: "MARTHE",
        image: "images/marthe.png",
        link: "marthe.html",
        rating: "4.5",
        price: "¥1120（税込）"
    },

    {
        id: "WULING",
        name: "WULING",
        image: "images/wuling.png",
        link: "wuling.html",
        rating: "4.8",
        price: "¥1070（税込）"
    },

    {
        id: "RETRY",
        name: "RETRY",
        image: "images/retry.png",
        link: "retry.html",
        rating: "4.0",
        price: "¥890（税込）"
    }

];


// --------------------
// 保存されているお気に入りを取得
// --------------------

const favorites =
    JSON.parse(
        localStorage.getItem("coverStoreFavorites")
    ) || [];


// --------------------
// 表示場所
// --------------------

const favoriteProductsArea =
    document.querySelector(
        "#favorite-products"
    );

const emptyMessage =
    document.querySelector(
        "#favorites-empty"
    );

    const favoriteCount =
    document.querySelector(
        "#favorite-count"
    );


// --------------------
// お気に入り商品を表示
// --------------------

let found = 0;


favoriteProducts.forEach(product => {

    if(
        favorites.includes(product.id)
    ){

        found++;

        favoriteCount.textContent = found;

        const card =
            document.createElement("a");


        card.href = product.link;

        card.className = "card";


        // --------------------
        // カードHTML
        // --------------------

        card.innerHTML = `

            <div class="card-image">

                <img
                    class="hero-cover"
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <h3>
                ${product.name}
            </h3>


            <div class="rating">

                ★★★★★

                <span>
                    ${product.rating}
                </span>

            </div>


            <p class="price">

                ${product.price}

            </p>


            <button
                type="button"
                class="favorite-detail-btn"
            >
                詳細を見る
            </button>


        <button
            type="button"
            class="favorite-remove-btn"
        >
             <img
                src="images/塗り潰しハート白.png"
                alt=""
            >
            お気に入りから削除
        </button>

        `;


        // --------------------
        // 削除ボタン
        // --------------------

        const removeButton =
            card.querySelector(
                ".favorite-remove-btn"
            );


        removeButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();


                // お気に入りから削除

                const index =
                    favorites.indexOf(product.id);


                if(index !== -1){

                    favorites.splice(index, 1);

                }


                // 保存データを更新

                localStorage.setItem(
                    "coverStoreFavorites",
                    JSON.stringify(favorites)
                );


                // カードを一覧から削除

                card.remove();

                favoriteCount.textContent =
    favoriteProductsArea.children.length;

                // 0件になったらメッセージ表示

                if(
                    favoriteProductsArea.children.length === 0
                ){

                    emptyMessage.style.display =
                        "block";

                }

            }
        );


        // --------------------
        // お気に入りページに追加
        // --------------------

        favoriteProductsArea.appendChild(card);

    }

});


// --------------------
// お気に入りが0件の場合
// --------------------

if(found === 0){

    emptyMessage.style.display =
        "block";

}else{

    emptyMessage.style.display =
        "none";

}