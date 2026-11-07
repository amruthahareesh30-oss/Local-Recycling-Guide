// 1. Material Information

var materials = [
    {
        name: "Plastic",
        instruction: "Clean plastic bottles and containers. Separate them from wet waste and put accepted plastics in the recycling bin."
    },
    {
        name: "Paper",
        instruction: "Keep paper clean and dry. Separate newspapers, cardboard and paper before recycling."
    },
    {
        name: "Glass",
        instruction: "Empty and rinse glass bottles and jars. Keep broken glass safely wrapped and follow local disposal rules."
    },
    {
        name: "Metal",
        instruction: "Clean metal cans and separate them from other waste before recycling."
    },
    {
        name: "Electronic Waste",
        instruction: "Collect old electronic devices separately and take them to an authorised e-waste collection centre."
    },
    {
        name: "Organic Waste",
        instruction: "Separate food scraps and suitable garden waste for composting."
    }
];


// 2. Material Search Function

function searchMaterial() {

    var search = document.getElementById("searchInput").value.toLowerCase();

    var found = false;

    for (var i = 0; i < materials.length; i++) {

        if (materials[i].name.toLowerCase().includes(search) && search !== "") {

            showMaterial(materials[i].name);

            found = true;

            break;
        }
    }

    if (found === false) {

        document.getElementById("details").style.display = "block";

        document.getElementById("details").innerHTML =
            "Material not found. Please try again.";

    }
}


// 3. Display Material Instructions

function showMaterial(name) {

    var details = document.getElementById("details");

    for (var i = 0; i < materials.length; i++) {

        if (materials[i].name === name) {

            details.style.display = "block";

            details.innerHTML =
                "<h3>" + materials[i].name + "</h3>" +
                "<p>" + materials[i].instruction + "</p>" +
                "<button onclick=\"addFavorite('" + materials[i].name + "')\">Add to Favourites ❤️</button>";

        }
    }
}


// 4. Favourite Materials

var favorites = [];


// Add Favourite

function addFavorite(name) {

    if (favorites.includes(name) === false) {

        favorites.push(name);

        localStorage.setItem("favorites", JSON.stringify(favorites));

        displayFavorites();

        alert("Material added to favourites!");

    } else {

        alert("This material is already in favourites!");

    }
}


// Display Favourite Materials

function displayFavorites() {

    var list = document.getElementById("favoriteList");

    list.innerHTML = "";

    if (favorites.length === 0) {

        list.innerHTML = "<p>No favourites added yet.</p>";

    }

    for (var i = 0; i < favorites.length; i++) {

        list.innerHTML +=
            "<div class='card'>" +
            "<h3>" + favorites[i] + "</h3>" +
            "<button onclick=\"removeFavorite('" + favorites[i] + "')\">Remove</button>" +
            "</div>";

    }
}


// Remove Favourite

function removeFavorite(name) {

    var newFavorites = [];

    for (var i = 0; i < favorites.length; i++) {

        if (favorites[i] !== name) {

            newFavorites.push(favorites[i]);

        }
    }

    favorites = newFavorites;

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayFavorites();

}


// Load Saved Favourites

var savedFavorites = localStorage.getItem("favorites");

if (savedFavorites !== null) {

    favorites = JSON.parse(savedFavorites);

}

displayFavorites();


// 5. Facility Location Filter

function filterFacilities() {

    var location = document.getElementById("locationFilter").value;

    var facilities = document.getElementsByClassName("facility-card");

    for (var i = 0; i < facilities.length; i++) {

        if (location === "All" ||
            facilities[i].getAttribute("data-location") === location) {

            facilities[i].style.display = "block";

        } else {

            facilities[i].style.display = "none";

        }
    }
}


// 6. FAQ Section

function toggleFAQ(element) {

    var answer = element.nextElementSibling;

    if (answer.style.display === "block") {

        answer.style.display = "none";

    } else {

        answer.style.display = "block";

    }
}


// 7. Admin - Add New Material

function addMaterial() {

    var name = document.getElementById("adminMaterial").value;

    var instruction = document.getElementById("adminInstruction").value;

    if (name === "" || instruction === "") {

        alert("Please fill in all the fields!");

        return;
    }

    var newMaterial = {

        name: name,

        instruction: instruction

    };

    materials.push(newMaterial);

    var adminResults = document.getElementById("adminResults");

    adminResults.innerHTML +=
        "<div class='card'>" +
        "<h3>" + name + "</h3>" +
        "<p>" + instruction + "</p>" +
        "</div>";

    document.getElementById("adminMaterial").value = "";

    document.getElementById("adminInstruction").value = "";

    alert("New material added successfully!");

}
