$(document).ready(function () {
    var car = ["nissan", "honda", "ferrari", "lexus", "jeep", "audi", "ford", "chevy"];
    // Add buttons for original car array
    function renderButtons() {
        $("#car-buttons").empty();
        for (i = 0; i < car.length; i++) {
            $("#car-buttons").append("<button class='btn btn-primary' data-car='" + car[i] + "'>" + car[i] + "</button>");
        }
        $("button").on("click", function () {
            var carGif = $(this).attr("data-car");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                carGif + "&api_key=P78035KzeSFlvtBnDC9EoyNWvLAu6uV1"
            changeState();
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {
                var results = response.data;
                $("#car").empty();
                for (var i = 0; i < results.length; i++) {
                    var carDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var carImg = $("<img>");
        
                    carImg.attr("src", results[i].images.original_still.url);
                    carImg.attr("data-still", results[i].images.original_still.url);
                    carImg.attr("data-animate", results[i].images.original.url);
                    carImg.attr("data-state", "still");
                    carImg.attr("class", "gif");
                    carDiv.append(p);
                    carDiv.append(carImg);
                    $("#car").append(carDiv);
                    console.log(carGif)
                }
            });
        });
    }
    renderButtons();
    // Adding a button for cars entered
    $("#add-car").on("click", function () {
        event.preventDefault();
        var car = $("#car-input").val().trim();
        car.push(car);
        renderButtons();
    });
    function changeState(){
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }
        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }
    $(document).on("click", ".gif", changeState);
});