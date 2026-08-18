// ========================================
// THIRUKKURAL - MAIN JAVASCRIPT
// ========================================


// ========================================
// 🌙 DARK / LIGHT MODE
// ========================================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            themeBtn.textContent = "☀";

            localStorage.setItem("theme", "dark");

        } else {

            themeBtn.textContent = "☾";

            localStorage.setItem("theme", "light");

        }

    });

}


// Load saved theme

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    if (themeBtn) {
        themeBtn.textContent = "☀";
    }

}


// ========================================
// 🔍 HOME SEARCH
// ========================================

function searchKural() {

    const input =
        document.getElementById("searchInput");

    if (!input) {
        return;
    }

    const number =
        parseInt(input.value);


    if (isNaN(number)) {

        alert("Please enter a Kural number.");

        return;
    }


    if (number < 1 || number > 1330) {

        alert("Enter a number between 1 and 1330.");

        return;
    }


    window.location.href =
        "/kural/" + number;

}


// Press Enter in Home Search

const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                searchKural();

            }

        }
    );

}


// ========================================
// 🎲 RANDOM KURAL
// ========================================

function randomKural() {

    const randomNumber =
        Math.floor(
            Math.random() * 1330
        ) + 1;


    window.location.href =
        "/kural/" + randomNumber;

}


// ========================================
// 🔍 EXPLORE SEARCH
// ========================================

function exploreKural() {

    const input =
        document.getElementById(
            "exploreInput"
        );


    if (!input) {
        return;
    }


    const number =
        parseInt(input.value);


    if (isNaN(number)) {

        alert("Please enter a Kural number.");

        return;
    }


    if (number < 1 || number > 1330) {

        alert(
            "Enter a number between 1 and 1330."
        );

        return;
    }


    window.location.href =
        "/kural/" + number;

}


// ========================================
// ❤️ TOGGLE FAVOURITE
// ========================================

function toggleFavourite() {

    const path =
        window.location.pathname;


    const match =
        path.match(
            /\/kural\/(\d+)/
        );


    if (!match) {
        return;
    }


    const kuralNumber =
        match[1];


    let favourites =
        JSON.parse(
            localStorage.getItem(
                "favourites"
            )
        ) || [];


    // Check whether already saved

    if (
        favourites.includes(
            kuralNumber
        )
    ) {

        // REMOVE

        favourites =
            favourites.filter(
                number =>
                    number !== kuralNumber
            );


        updateFavouriteButton(false);


    } else {

        // ADD

        favourites.push(
            kuralNumber
        );


        updateFavouriteButton(true);

    }


    localStorage.setItem(
        "favourites",
        JSON.stringify(favourites)
    );

}


// ========================================
// ❤️ UPDATE FAVOURITE BUTTON
// ========================================

function updateFavouriteButton(
    isFavourite
) {

    // Top heart button

    const heartButton =
        document.querySelector(
            ".favorite-btn"
        );


    if (heartButton) {

        heartButton.textContent =
            isFavourite
                ? "♥"
                : "♡";

    }


    // Add to Favourite button

    const favouriteAction =
        document.getElementById(
            "favouriteAction"
        );


    if (favouriteAction) {

        if (isFavourite) {

            favouriteAction.textContent =
                "♥ Added to Favourite";

        } else {

            favouriteAction.textContent =
                "♡ Add to Favourite";

        }

    }

}


// ========================================
// ❤️ LOAD CURRENT FAVOURITE STATUS
// ========================================

function loadFavouriteStatus() {

    const path =
        window.location.pathname;


    const match =
        path.match(
            /\/kural\/(\d+)/
        );


    if (!match) {
        return;
    }


    const kuralNumber =
        match[1];


    const favourites =
        JSON.parse(
            localStorage.getItem(
                "favourites"
            )
        ) || [];


    if (
        favourites.includes(
            kuralNumber
        )
    ) {

        updateFavouriteButton(true);

    } else {

        updateFavouriteButton(false);

    }

}


// ========================================
// 📋 COPY KURAL
// ========================================

function copyKural() {

    const kural =
        document.querySelector(
            ".tamil-kural"
        );


    if (!kural) {
        return;
    }


    navigator.clipboard
        .writeText(
            kural.innerText
        )
        .then(function () {

            alert(
                "Kural copied successfully! 📋"
            );

        })
        .catch(function () {

            alert(
                "Unable to copy Kural."
            );

        });

}


// ========================================
// ❤️ LOAD FAVOURITES PAGE
// ========================================

function loadFavourites() {

    const container =
        document.getElementById(
            "favouritesContainer"
        );


    const emptyMessage =
        document.getElementById(
            "emptyFavourites"
        );


    // If not on favourites page

    if (
        !container ||
        !emptyMessage
    ) {

        return;

    }


    const favourites =
        JSON.parse(
            localStorage.getItem(
                "favourites"
            )
        ) || [];


    // No favourites

    if (
        favourites.length === 0
    ) {

        container.innerHTML = "";

        emptyMessage.style.display =
            "flex";

        return;

    }


    // Has favourites

    emptyMessage.style.display =
        "none";


    container.innerHTML = "";


    favourites.forEach(
        function (kuralNumber) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "favourite-card";


            card.innerHTML = `

                <div class="favourite-info">

                    <span class="small-title">
                        KURAL
                    </span>

                    <h2>
                        Kural ${kuralNumber}
                    </h2>

                    <p>
                        Your saved Thirukkural
                    </p>

                </div>


                <div class="favourite-actions">

                    <a
                        href="/kural/${kuralNumber}"
                        class="section-btn">

                        View Kural →

                    </a>


                    <button
                        class="remove-favourite"
                        onclick="removeFavourite('${kuralNumber}')">

                        Remove

                    </button>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


// ========================================
// ❌ REMOVE FAVOURITE
// ========================================

function removeFavourite(
    kuralNumber
) {

    let favourites =
        JSON.parse(
            localStorage.getItem(
                "favourites"
            )
        ) || [];


    favourites =
        favourites.filter(
            number =>
                number !== kuralNumber
        );


    localStorage.setItem(
        "favourites",
        JSON.stringify(
            favourites
        )
    );


    // Refresh favourites list

    loadFavourites();

}


// ========================================
// 🚀 PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadFavouriteStatus();

        loadFavourites();

    }
);