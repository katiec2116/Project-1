// grabbing button by ID and creating an event

let searchedFood;
let breakfast = [];
let lunch = [];
let dinner = [];


// get 
getFoods();




$("#clear").on("click", function (event) {
    event.preventDefault();
    $(".content2").empty();
    $(".contentLunch").empty();
    $(".contentDinner").empty();
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
            // loops through all foods found and add calories count to the page
            for (var i = 0; i < response.foods.length; i++) {
                let b = response.foods[i].food_name + " Calories: " + response.foods[i].nf_calories
                b = b.charAt(0).toUpperCase() + b.substr(1);
                $(".content2").append($("<p>").text(b))
                breakfast.push(b)
                console.log(breakfast)
                saveFoods();
            }
        });
});

//on click function for submitting food(Lunch)
$("#foodBtnLunch").on("click", function (event) {
    event.preventDefault();
    // var to hold sumbitted food
    searchedFood = $("#foodLunch").val();
    // lunch.push(searchedFood);
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
                let l = response.foods[i].food_name + " Calories: " + response.foods[i].nf_calories
                l = l.charAt(0).toUpperCase() + l.substr(1);
                $(".contentLunch").append($("<p>").text(l))
                lunch.push(l)
                console.log(lunch)
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
                let d = response.foods[i].food_name + " Calories: " + response.foods[i].nf_calories
                d = d.charAt(0).toUpperCase() + d.substr(1);
                $(".contentDinner").append($("<p>").text(d))
                dinner.push(d)
                console.log(dinner)
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
    if (localStorage.getItem("breakfast")!= null){
    breakfast = JSON.parse(localStorage.getItem("breakfast"));
    breakfast.forEach(item => {
            let food = $("<p>").text(item);
            // add city to search history lost and add data value attribute
            $(".content2").append(food);
    })}

    if (localStorage.getItem("lunch") != null){
    lunch = JSON.parse(localStorage.getItem("lunch"));
    lunch.forEach(item => {
            let food = $("<p>").text(item);
            // add city to search history lost and add data value attribute
            $(".contentLunch").append(food);
    })}
    if (localStorage.getItem("dinner") != null){
    dinner = JSON.parse(localStorage.getItem("dinner"));
    dinner.forEach(item => {
            let food = $("<p>").text(item);
            // add city to search history lost and add data value attribute
            $(".contentDinner").append(food);
        })}
}