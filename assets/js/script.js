// grabbing button by ID and creating an event

let searchedFood;
let breakfast = [];
let lunch = [];
let dinner = [];
let fitnessCalculator;

// get foods from local storage
getFoods();
getTotalCal();

// clear button to empty local storage and display
$("#clear").on("click", function (event) {
    event.preventDefault();
    $(".breakfast").find("tr:gt(0)").remove();
    $(".lunch").find("tr:gt(0)").remove();
    $(".dinner").find("tr:gt(0)").remove();
    $(".totalCal").text("Total Calories: 0")
    localStorage.clear();
    
});
// on click function for submitting food (Breakfast)
$("#foodBtnBreakfast").on("click", function (event) {
    event.preventDefault()
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
                let d = {
                    name: response.foods[i].food_name,
                    calories: response.foods[i].nf_calories.toFixed(0)
                }
                // capitalizes food
                d.name = d.name.charAt(0).toUpperCase() + d.name.substr(1);
                // add to page
                $('.breakfast tr:last').after('<tr><td>' + d.name+ '</td><td>' + d.calories + '</td></tr>');
                // adds to array
                breakfast.push(d)
                // saves food to local storage
                saveFoods();
                getTotalCal();
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
                let d = {
                    name: response.foods[i].food_name,
                    calories: response.foods[i].nf_calories.toFixed(0)
                }
                // capitalizes food
                d.name = d.name.charAt(0).toUpperCase() + d.name.substr(1);
                // add to page
                $('.lunch tr:last').after('<tr><td>' + d.name+ '</td><td>' + d.calories + '</td></tr>');
                // adds to array
                lunch.push(d)
                // saves food to local storage
                saveFoods();
                getTotalCal();
            }
        });
});


$("#arrow").click(function () {
    $('html,body').animate({
        scrollTop: $(".container").offset().top
    },
        'slow');
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
                let d = {
                    name: response.foods[i].food_name,
                    calories: response.foods[i].nf_calories.toFixed(0)
                }
                // capitalizes food
                d.name = d.name.charAt(0).toUpperCase() + d.name.substr(1);
                // add to page
                // $(".contentDinner").append($("<p>").text(d.name + " Calories: " + d.calories));
                $('.dinner tr:last').after('<tr><td>' + d.name+ '</td><td>' + d.calories + '</td></tr>');
                // adds to array
                dinner.push(d);
                // saves food to local storage
                saveFoods();
                getTotalCal();
            }
        });
});

// Adds Calories together 
// $("#totalBtn").on("click",
    function getTotalCal() {
        $(".totalDiv").empty();
        var total = 0;
        for (let index = 0; index < breakfast.length; index++) {
            total += parseFloat(breakfast[index].calories)
        }
        for (let index = 0; index < lunch.length; index++) {
            total += parseFloat(lunch[index].calories)
        }
        for (let index = 0; index < dinner.length; index++) {
            total += parseFloat(dinner[index].calories)
        }

        var x = $("<p>").text("Total Calories: " + total.toFixed(0)).addClass("totalCal")

        $(".totalDiv").append(x);
    };


// local storage for food data
function saveFoods() {
    localStorage.setItem("breakfast", JSON.stringify(breakfast));
    localStorage.setItem("lunch", JSON.stringify(lunch));
    localStorage.setItem("dinner", JSON.stringify(dinner));
}

function getFoods() {
    // checks if local storage is empty
    if (localStorage.getItem("breakfast") != null) {
        breakfast = JSON.parse(localStorage.getItem("breakfast"));
        // generate p tag to display each food item
        breakfast.forEach(item => {
            // let food = $("<p>").text(item.name + " Calories: " + item.calories);
            // add city to search history lost and add data value attribute
            $('.breakfast tr:last').after('<tr><td>' + item.name+ '</td><td>' + item.calories + '</td></tr>');
        })
    }
    // checks if local storage is empty
    if (localStorage.getItem("lunch") != null) {
        lunch = JSON.parse(localStorage.getItem("lunch"));
        // generate p tag to display each food item
        lunch.forEach(item => {
            // let food = $("<p>").text(item.name + " Calories: " + item.calories);
            // add city to search history lost and add data value attribute
            $('.lunch tr:last').after('<tr><td>' + item.name+ '</td><td>' + item.calories + '</td></tr>');
        })
    }
    // checks if local storage is empty
    if (localStorage.getItem("dinner") != null) {
        dinner = JSON.parse(localStorage.getItem("dinner"));
        // generate p tag to display each food item
        dinner.forEach(item => {
            // let food = $("<p>").text(item.name + " Calories: " + item.calories);
            // add city to search history lost and add data value attribute
            $('.dinner tr:last').after('<tr><td>' + item.name+ '</td><td>' + item.calories + '</td></tr>');
        })
    }
}

//... BMI

// onclick for fitness calculator
$(".buttonS").on("click", function (event) {
    event.preventDefault();
    age = $(".ageInput").val();
    console.log(age);
    weight = $(".weightInput").val();
    console.log(weight);
    height = $(".heightInput").val();
    console.log(height);
    gender = $(".select option:selected").val();
    console.log(gender);



    var bmi = {
        "async": true,
        "crossDomain": true,
        "url": "https://fitness-calculator.p.rapidapi.com/bmi?age=" + age + "&height=" + height + "&weight=" + weight,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
            "x-rapidapi-key": "515c74fb86mshcb44e437cf75abcp1b8dc7jsn1ac8f5643c83"
        }
    }
    $.ajax(bmi).done(function (response) {
        var result = response.bmi.toFixed(2);
        $(".BMI").text(result);
    });


    //.....Ideal Weight 

    var idealweight = {
        "async": true,
        "crossDomain": true,
        "url": "https://fitness-calculator.p.rapidapi.com/idealweight?weight=" + weight + "&gender=" + gender + "&height=" + height,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
            "x-rapidapi-key": "515c74fb86mshcb44e437cf75abcp1b8dc7jsn1ac8f5643c83"
        }
    }

    $.ajax(idealweight).done(function (response) {
        var result = response.Devine.toFixed(2);
        $(".idealWeight").text(result);
    });

    //.........body fat


    var bodyFat = {
        "async": true,
        "crossDomain": true,
        "url": "https://fitness-calculator.p.rapidapi.com/bodyfat?age=" + age + "&weight=" + weight + "&gender=" + gender + "&height=" + height,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
            "x-rapidapi-key": "515c74fb86mshcb44e437cf75abcp1b8dc7jsn1ac8f5643c83"
        }
    }

    $.ajax(bodyFat).done(function (response) {
        var result = response['Body Fat (BMI method)'].toFixed(2);
    $(".bodyFat").text(result);
    });

        //........ daily calories

    var dailyCalories = {
        "async": true,
        "crossDomain": true,
        "url": "https://fitness-calculator.p.rapidapi.com/dailycalory?heigth=" + height + "&age=" + age + "&gender=" + gender + "&weigth=" + weight,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
            "x-rapidapi-key": "515c74fb86mshcb44e437cf75abcp1b8dc7jsn1ac8f5643c83"
        }
    }   

    $.ajax(dailyCalories).done(function (response) {
        var result = response.data.BMR.toFixed(2);
        $(".dailyC").text(result);
    });

});