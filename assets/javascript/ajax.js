var searches = ["naruto", "bleach", "food wars", "my hero academia", "dragon ball"];

for (i = 0; i < searches.length; i++) {
    createButton(searches[i]);
}

function createButton(searches) {


    var gifsButton = $("<button id = buttonID>")
    gifsButton.attr("data-anime", searches);
    gifsButton.text(searches)

    $("#buttonSection").append(gifsButton);

    GifButton();
    stateClick();

}

function addGif() {
    $("#gifSearch").on("click", function (event) {
        event.preventDefault();

        var userSearch = $("#gifSearch").val().trim();
        searches.push(userSearch);
        $("gifSearch").val("");
        createButton(userSearch);

    });
}
addGif();

function GifButton() {
    $("button").on("click", function () {


        var anime = $(this).attr("data-anime");

        var queryURL = "https://api.giphy.com/v1/gifs/search";
        var apiKey = "9iEd3JNDgzRDBcXlq8laOso4ZuLVaddB"
        $.ajax({
                url: queryURL,
                method: "GET",
                data: {
                    q: anime,
                    api_key: apiKey,
                    limit: 10
                }
            })
            .done(function (response) {
                var results = response.data;

                console.log(results);

                $("#gifsImages").empty();

                for (var j = 0, len = results.length; j < len; j++) {

                    var animeDiv = $("<div>");
                    var Rating = $("<p>").text("Rating: " + results[j].rating);
                    var state = $(this).attr("data-state");
                    var animeImage = $("<img class = gif>");

                    animeImage.attr("src", results[j].images.fixed_height_still.url);
                    animeImage.attr("data-state", "stillState");
                    animeImage.attr("still-state", results[j].images.fixed_height_still.url);
                    animeImage.attr("animated-state", results[j].images.fixed_height.url);

                    animeDiv.append(Rating);
                    animeDiv.append(animeImage);
                    $("#gifsImages").append(animeDiv);
                }
                stateClick();

            });


    });
}
clickGifButton();

function stateClick() {
    $(".gif").on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "stillState") {
            $(this).attr("src", $(this).attr("animated-state"));
            $(this).attr("data-state", "animateState");

        } else {
            $(this).attr("src", $(this).attr("still-state"));
            $(this).attr("data-state", "stillState");

        }


    });
}