// grabbing button by ID and creating an event

let searchedFood;
let breakfast = [];
let lunch = [];
let dinner = [];


// get foods from local storage
getFoods();

// clear button to empty local storage and display
$("#clear").on("click", function (event) {
    event.preventDefault();
    $(".content2").empty();
    $(".contentLunch").empty();
    $(".contentDinner").empty();
    localStorage.clear();
});
// on click function for submitting food (Breakfast)
$("#foodBtnBreakfast").on("click", function (event) {
    event.preventDefault();
    // var to hold sumbitted food
    searchedFood = $("#food").val();
    var queryURL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    // call to api to generate data
    $.ajax({
        url: queryURL,
        type: "POST",
        headers: {
            'x-app-id': 'a98f7f16',
            'x-app-key': '6862cffc35ec58e1ed02d3c636467849',
            'x-remote-user-id': '0'
        },
        data:
            { 'query': searchedFood }

    })

        // do stuff with the data
        .then(function (response) {
            console.log(response)
            // loops through all foods found and add calories count to the page
            for (var i = 0; i < response.foods.length; i++) {
                // grabs food name, and calories
                let b = response.foods[i].food_name + " Calories: " + response.foods[i].nf_calories;
                // capitalizes food
                b = b.charAt(0).toUpperCase() + b.substr(1);
                // adds to page
                $(".content2").append($("<p>").text(b))
                // adds to array
                breakfast.push(b)
                // saves food to local storage
                saveFoods();
            }
        });
});

//on click function for submitting food(Lunch)
$("#foodBtnLunch").on("click", function (event) {
    event.preventDefault();
    // var to hold sumbitted food
    searchedFood = $("#foodLunch").val();
    var queryURL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    // call to api to generate data
    $.ajax({
        url: queryURL,
        type: "POST",
        headers: {
            'x-app-id': 'a98f7f16',
            'x-app-key': '6862cffc35ec58e1ed02d3c636467849',
            'x-remote-user-id': '0'
        },
        data:
            { 'query': searchedFood }

    })

        // do stuff with the data
        .then(function (response) {
            // loops through all foods found and add calories count to the page
            for (var i = 0; i < response.foods.length; i++) {
                // grabs food name, and calories
                let l = response.foods[i].food_name + " Calories: " + response.foods[i].nf_calories
                // capitalizes food
                l = l.charAt(0).toUpperCase() + l.substr(1);
                // adds to page
                $(".contentLunch").append($("<p>").text(l))
                // adds to array
                lunch.push(l)
                // saves food to local storage
                saveFoods();
            }
        });
});

//on click function for submitting food(Dinner)
$("#foodBtnDinner").on("click", function (event) {
    event.preventDefault();
    // var to hold sumbitted food
    searchedFood = $("#foodDinner").val();
    // dinner.push(searchedFood);
    var queryURL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    // call to api to generate data
    $.ajax({
        url: queryURL,
        type: "POST",
        headers: {
            'x-app-id': 'a98f7f16',
            'x-app-key': '6862cffc35ec58e1ed02d3c636467849',
            'x-remote-user-id': '0'
        },
        data:
            { 'query': searchedFood }

    })

        // do stuff with the data
        .then(function (response) {
            // loops through all foods found and add calories count to the page
            for (var i = 0; i < response.foods.length; i++) {
                // grabs food name and calories
                let d = response.foods[i].food_name + " Calories: " + response.foods[i].nf_calories;
                // capitalizes food
                d = d.charAt(0).toUpperCase() + d.substr(1);
                // add to page
                $(".contentDinner").append($("<p>").text(d));
                // adds to array
                dinner.push(d);
                // saves food to local storage
                saveFoods();
            }
        });
});

// local storage for food data
function saveFoods() {
    localStorage.setItem("breakfast", JSON.stringify(breakfast));
    localStorage.setItem("lunch", JSON.stringify(lunch));
    localStorage.setItem("dinner", JSON.stringify(dinner));
}

function getFoods() {
    // checks if local storage is empty
    if (localStorage.getItem("breakfast")!= null){
    breakfast = JSON.parse(localStorage.getItem("breakfast"));
    // generate p tag to display each food item
    breakfast.forEach(item => {
            let food = $("<p>").text(item);
            // add city to search history lost and add data value attribute
            $(".content2").append(food);
    })}
    // checks if local storage is empty
    if (localStorage.getItem("lunch") != null){
    lunch = JSON.parse(localStorage.getItem("lunch"));
    // generate p tag to display each food item
    lunch.forEach(item => {
            let food = $("<p>").text(item);
            // add city to search history lost and add data value attribute
            $(".contentLunch").append(food);
    })}
    // checks if local storage is empty
    if (localStorage.getItem("dinner") != null){
    dinner = JSON.parse(localStorage.getItem("dinner"));
    // generate p tag to display each food item
    dinner.forEach(item => {
            let food = $("<p>").text(item);
            // add city to search history lost and add data value attribute
            $(".contentDinner").append(food);
        })}
}