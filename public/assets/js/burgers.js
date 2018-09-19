//Attach handlers until the DOM is fully loaded
$(function () {

    $(".devour_burger").on("click", function (event) {
        console.log("click");
        var id = $(this).data("id");
        var devoured = $(this).data("devoured");

        var devouredState = {
            devoured: "true"
        };

        //Sending the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(
            function () {
                console.log("changed devoured to", devoured);
                // Reload the page to get the updated list.
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function (event) {
        //This is to prevent default on the submit event
        event.preventDefault();

        var newBurger = {
            burger_name: $("#bn").val().trim(),
            devoured: 0
        };

        //Send POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("created new burger");
                // Reloading to show updated list
                location.reload();
            }
        );
    });

    $(".delete").on("click", function (event) {
        console.log("click");
        var id = $(this).data("id");

        //Delete Request sent to Database
        $.ajax("/api/burgers/" + id, {
            type: "DELETE",
        }).then(function() {
            console.log("Burger Trashed!", id);
            // Reloading to show updated list
            location.reload();
        });
    });

});