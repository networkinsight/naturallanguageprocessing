var allTweets = {}
//x[i].style.backgroundColor = "red";

function getNewTweets() {
    var x = document.getElementsByClassName("tweet");
    console.log(x.length)
    var i;
    // var added = 0;
    for (i = 0; i < x.length; i++) {
        const data_item_id = x[i].getAttribute("data-item-id")
        if(data_item_id != null && !(Object.keys(allTweets).includes(data_item_id))){
            var parsed = processRawTweet(x[i])
            var object = {
                id: data_item_id,
                tweet: x[i],
                tweetData: parsed,
                alreadyProcesses: false,
                sentimentValue: 0
            }
            
            allTweets[data_item_id] = object;
            // added++;

            // analyze tweet text using Watson API
            requestWatson(data_item_id, parsed.text, function (tweetId, response) {
                var sentiment = totalSentiment(response);
                allTweets[tweetId].sentimentValue = sentiment;
                allTweets[tweetId].alreadyProcessed = true;
                setTweetColor(tweetId, sentimentColor(sentiment));
                if (sentiment < (-0.5)) {
                    collapseTweet(tweetId);
                }
            });
        }
    } 
    // console.log("added", added, "new items")
}

function processRawTweet(tweet){
    var t = tweet.getElementsByClassName("js-tweet-text")[0].innerHTML;
    t = t.replace(/<a.*\/a>/i, "");
    var a = tweet.getElementsByClassName("fullname")[0].innerHTML;
    return {author: a, text: t};
}

function collapseTweet(tweetId){
    var tweet = allTweets[tweetId].tweet;
    var parentNode = tweet.parentNode
    var toggleButton = document.createElement("button")

    tweet.style.display = "none"

    toggleButton.appendChild(document.createTextNode("Show"))
    toggleButton.addEventListener("click", function (){
        var siblings = parentNode.childNodes
        for(var j = 0; j < siblings.length; j++){
            if(siblings[j].classList && siblings[j].classList.contains("tweet")){
                content = siblings[j]
                if(content.style.display == "block"){
                    content.style.display = "none"
                } else {
                    content.style.display = "block"
                }
            }
        }
        
        toggleButton.firstChild.data = toggleButton.firstChild.data == "Show" ? "Hide" : "Show"; 
    })

    parentNode.appendChild(toggleButton)
}

getNewTweets();
setInterval(getNewTweets, 1000);
// setTimeout(() => console.log(allTweets), 5000)
