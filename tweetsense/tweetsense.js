var allTweets = {}
//x[i].style.backgroundColor = "red";

function getNewTweets() {
    var x = document.getElementsByClassName("tweet");
    var i;
    for (i = 0; i < x.length; i++) {
        const data_item_id = x[i].getAttribute("data-item-id")
        if(!(data_item_id in allTweets)){
            var parsed = processRawTweet(x[i])
            allTweets[data_item_id] = {
                id: data_item_id,
                tweet: x[i],
                tweetData: parsed,
                alreadyProcesses: false
            };
            
            analyze(parsed, console.log);
            setTweetColor(
                x[i],
                sentinentColor((data_item_id % 1000)/500-1)
            );
        }
    } 
}

function processRawTweet(tweet){
    var t = tweet.getElementsByClassName("js-tweet-text")[0].innerHTML
    t = t.replace(/<a.*\/a>/i, "")

    var a = tweet.getElementsByClassName("fullname")[0].innerHTML

    return {author: a, text: t}
}

setInterval(getNewTweets, 1000)

setTimeout( () => console.log(allTweets), 5000)

function analyzeWord(word) {

}
