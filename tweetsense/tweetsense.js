tweetData = {}
//x[i].style.backgroundColor = "red";

function getNewTweets() {

    var x = document.getElementsByClassName("tweet");
    var i;
    for (i = 0; i < x.length; i++) {
        const data_item_id = x[i].getAttribute("data-item-id")
        object = {
            id: data_item_id,
            tweet: x[i],
            alreadyProcesses: false
        }
        tweetData[data_item_id] = object;
    } 
}

setInterval(getNewTweets, 1000)

setTimeout( () => console.log(tweetData), 5000)
