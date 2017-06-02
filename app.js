/** Pseudo
*
1. Create a div inside of the html file to hold all the array of buttons
	1a. Create a div to hold the submit button and the images of the requested files
2. In the javascript file make an array of favorite items
3. Loop over the array to make buttons and display these buttons to the div in the HTML file
4. create a variable inside of your javascript file that will store the giffy url
5. Make sure you do a query (?q) on the url to limit the items desired to return to favorite items
6. Write an AJAX callback function and the response of the call back will be the giffyurl in JSON
7. Go through the JSON file and find the url for the still and the animated gif images
8. Write an if statement that will display the animated gif after user has clicked on the button
 the button will be activated via an onclick event. 
 8a. Remember to empty() the div between clicks to toggle between the still and the animated image
9. All of these items need to be wrapped inside a for loop that will capture only the desired urls
and the ratings  
*
*/
// add topics array before the function call because it is a global variable
$(function() {
    var topics = ["Star Trek", "space", "tigers", "purses", "kites"];


    $("#add-topic").on("click", function(event) {
        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();
        // Here we grab the text from the input box

        var newTopic = $("#topic-input").val();
        if (newTopic) {
            topics.push(newTopic);
            renderButtons();
            // displayTopicInfo();
        }
    });

    function renderButtons() {

        // Deletes the topics prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generates buttons for each topic in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of topic to our button
            a.addClass("topic");
            // Added a data-attribute
            a.attr("data-name", topics[i]);
            // Provided the initial button text
            a.text(topics[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    $(document).on("click", ".topic", function(event) {
        var topic = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=dc6zaTOxFJmzC";

        // Creates AJAX call for the specific topic button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            // renderButtons();

            // Creates a div to hold the topic
            $("#topics-view").empty();

            for (var i = 0; i < response.data.length; i++) {
                
                var pic = $('<img/>', {
                    src: response.data[i].images.fixed_height.url,
                }).append("#topics-view" + i);

                console.log(pic);
                $("#topics-view").append(pic);
            }

        });
    })

    renderButtons();


    
});