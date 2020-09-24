// grabbing button by ID and creating an event

let searchedFood;

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
                $(".content2").append($("<p>").text(response.foods[i].food_name + " Calories: " + response.foods[i].nf_calories))
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
                $(".contentLunch").append($("<p>").text(response.foods[i].food_name + " Calories: " + response.foods[i].nf_calories))
            }
        });
});

//on click function for submitting food(Dinner)
$("#foodBtnDinner").on("click", function (event) {
    event.preventDefault();
    // var to hold sumbitted food
    searchedFood = $("#foodDinner").val();
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
                $(".contentDinner").append($("<p>").text(response.foods[i].food_name + " Calories: " + response.foods[i].nf_calories))
            }
        });
});