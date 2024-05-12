$(document).ready(function() {
    // Function to load the like count from the JSON file
    function loadLikeCount() {
        $.getJSON("likes.json", function(data) {
            $('#likeCount').text(data.likes);
        });
    }

    // Load the like count when the page loads
    loadLikeCount();

    // Function to check if the button can be clicked
    function canClickButton() {
        // Check if the cookie exists and its expiration time
        var lastClicked = getCookie("lastClicked");
        if (!lastClicked || (Date.now() - parseInt(lastClicked)) >= 24 * 60 * 60 * 1000) {
            return true; // Button can be clicked
        } else {
            return false; // Button cannot be clicked
        }
    }

    // Handle like button click
    $('#likeButton').click(function() {
        if (canClickButton()) {
            // Increment the like count and update the JSON file
            $.getJSON("likes.json", function(data) {
                data.likes++;
                $.ajax({
                    url: "update_likes.php",
                    method: "POST",
                    data: { likes: data.likes },
                    success: function() {
                        $('#likeCount').text(data.likes);
                        // Set a cookie to store the time when the button was clicked
                        setCookie("lastClicked", Date.now(), 1); // Expires after 1 day (24 hours)
                    }
                });
            });
        } else {
            alert("You can only worship once every 24 hours.");
        }
    });

    // Periodically update the like count
    setInterval(loadLikeCount, 5000);

    // Function to set a cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
});