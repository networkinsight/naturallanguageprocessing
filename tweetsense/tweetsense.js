var allTweets = {};
//x[i].style.backgroundColor = "red";

function getNewTweets() {

    var x = document.getElementsByClassName("tweet");
    var i;
    for (i = 0; i < x.length; i++) {
        const data_item_id = x[i].getAttribute("data-item-id")
        if (! (data_item_id in allTweets)) {
            allTweets[data_item_id] = {
                id:               data_item_id,
                tweet:            x[i],
                alreadyProcessed: false
            };
            
            setTweetColor(
                x[i],
                sentinentColor((data_item_id % 1000)/500-1)
            );
        }
    } 
}

setInterval(getNewTweets, 1000);
setTimeout(() => console.log(allTweets), 5000);
