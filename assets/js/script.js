// grabbing button by ID and creating an event

let searchedFood;

$("#foodBtn").on("click", function (event) {
    event.preventDefault();
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
            console.log(response.foods[0])
            for (var i = 0; i < response.foods.length; i++) {
                $("#results").append($("<p>").text(response.foods[i].food_name + " Calories: " + response.foods[i].nf_calories))
            }



        });




});