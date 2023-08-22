/* We'll re-create the Youtube Homepage with real data */
/* 1.) Connect to Youtube "Search" API */
/* 2.) Create an AJAX request to fetch data */
/* 3.) Render JSON data on the page with dynamic HTML */
/* 4.) Allow user to search (event listener) */

/* https://www.googleapis.com/youtube/v3/search?part=snippet&q=aatrox&type=video&key=AIzaSyCmH5QzaPxnB5M8M76URmn4_AFBsIQG2qA */



// -------------------- Set-up initial web page -------------------- // 
$(`
<div id="header">
    <img class="logo" src="assets/youtube-logo.jpg">
    <form id="search-form">
        <input placeholder="Search" type="text" id="search-bar">
    <form>
</div>
`)
.prependTo($('body'));


// Make the API request
/*$.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=aatrox&maxResults=8&type=video&key=AIzaSyCmH5QzaPxnB5M8M76URmn4_AFBsIQG2qA', // Insert API endpoint
    method: 'GET',
    dataType: 'json',
    success: function(response) {
        // Handle the response data
        let webpage = $('#webpage');
        webpage.empty(); // Clear previous data

        // Log the entire response object to the console
        let videoDatabase = response.items.map(item => {
            return item.snippet
        }); 
        console.log(videoDatabase);

        // Use this for testing purposes for future projects
        // Iterate over the response data and display it
        // $.each(response, function(index, item) {
        // let dataItem = $('<p>').text(JSON.stringify(item));
        // webpage.append(dataItem);
        // });

         
        for (let i = 0; i < videoDatabase.length; i++) {
            
            $('<div>').addClass('video').html(`
            <img src=${videoDatabase[i].thumbnails.high.url}>
            <h4>${videoDatabase[i].title}</h4>
            <p>${videoDatabase[i].channelTitle}</p>
            <p>${new Date(videoDatabase[i].publishTime).toLocaleString()}</p>
            `).appendTo($(webpage));
       
        }}
    ,
    error: function(xhr, status, error) {
      console.error('API request failed:', status, error);
    }
});*/


$(document).ready(function() {
    // Add event listener for "submit" event
    $('#search-form').submit(function(event) {
      event.preventDefault(); // Prevent form submission

        // Handle the form submission
        let formData = $(this).serialize();
        console.log(formData);

        let textValue = $('#search-bar').val();
        console.log(textValue);
        // Additional logic...
        // Make the API request
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${textValue}&maxResults=8&type=video&key=AIzaSyCmH5QzaPxnB5M8M76URmn4_AFBsIQG2qA`, // Insert API endpoint
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                // Handle the response data
                let webpage = $('#webpage');
                webpage.empty(); // Clear previous data

                // Log the entire response object to the console
                let videoDatabase = response.items.map(item => {
                    return item.snippet
                }); 
                console.log(videoDatabase);

                // Use this for testing purposes for future projects
                // Iterate over the response data and display it
                // $.each(response, function(index, item) {
                // let dataItem = $('<p>').text(JSON.stringify(item));
                // webpage.append(dataItem);
                // });
                
                for (let i = 0; i < videoDatabase.length; i++) {
                    
                    $('<div>').addClass('video').html(`
                    <img src=${videoDatabase[i].thumbnails.high.url}>
                    <h4 class="title">${videoDatabase[i].title}</h4>
                    <p>${videoDatabase[i].channelTitle}</p>
                    <p>${new Date(videoDatabase[i].publishTime).toLocaleString()}</p>
                    `).appendTo($(webpage));
            
                }}
            ,
            error: function(xhr, status, error) {
            console.error('API request failed:', status, error);
            }
        });
    });
});
