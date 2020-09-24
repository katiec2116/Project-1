// grabbing button by ID and creating an event

let searchedFood;
let breakfast = [];
let lunch = [];
let dinner = [];

getFoods();
// on click function for submitting food
$("#foodBtn").on("click", function (event) {
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



// local storage for food data
function saveFoods() {
    localStorage.setItem("breakfast", JSON.stringify(breakfast));
    localStorage.setItem("lunch", JSON.stringify(lunch));
    localStorage.setItem("dinner", JSON.stringify(dinner));
}

function getFoods() {
    localStorage.getItem("breakfast");

    breakfast = JSON.parse(localStorage.getItem("breakfast"));

    breakfast.forEach(item => {
            let food = $("<button>").text(item).attr("data-value", item);
            // add city to search history lost and add data value attribute
            $(".content2").prepend(food);
        })
    
}