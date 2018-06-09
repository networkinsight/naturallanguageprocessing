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
                alreadyProcessed: false,
                sentimentValue: 0
            }
            
            allTweets[data_item_id] = object;
            // added++;

            // analyze tweet text using Watson API
            requestWatson(data_item_id, parsed.text, function (tweetId, response) {
                var temp = totalSentiment(response);
                if (temp == undefined) return;
                var sentiment = temp.value;
                allTweets[tweetId].sentimentValue = sentiment;
                allTweets[tweetId].alreadyProcessed = true;
                setTweetColor(tweetId, sentimentColor(sentiment));
                if (sentiment < (-0.75)) {
                    collapseTweet(tweetId);
                } else {
                    if(temp != undefined) addSentBar(tweetId, temp)
                }
            });
        }
    } 
    // console.log("added", added, "new items")
}

function addSentBar(tweetId, result){
    var tweet = allTweets[tweetId].tweet;
    var parentNode = tweet.parentNode

    var newDiv = document.createElement("div")
    newDiv.appendChild(tweet)
    newDiv.style.width = "100%"

    var sentBar = document.createElement("div")
    sentBar.style.width = "100%"
    sentBar.style.textAlign = "center"
    sentBar.style.backgroundColor = "#444"
    sentBar.style.color = "#eee"
    for(var i = 0; i < result.length; i++){
        var span = document.createElement("span")
        span.style.width = "100%"
        span.style.paddingLeft = "5px"
        span.style.paddingRight = "5px"
        span.appendChild(document.createTextNode("   " + result.keywords[i].keyword + ": " + result.keywords[i].sentiment + "  "))
        sentBar.appendChild(span)
    }

    newDiv.appendChild(sentBar)
    parentNode.appendChild(newDiv)
}

function processRawTweet(tweet){
    var t = tweet.getElementsByClassName("js-tweet-text")[0].innerHTML;
    t = t.replace(/<a.*\/a>/i, "");
    t = t.replace(/<img.*>/i, "");
    var a = tweet.getElementsByClassName("fullname")[0].innerHTML;
    return {author: a, text: t};
}

function collapseTweet(tweetId){
    var tweet = allTweets[tweetId].tweet;
    var parentNode = tweet.parentNode

    tweet.style.display = "none"

    var container = document.createElement("div")
    container.style.width = "100%"
    container.style.borderColor = "black"
    container.style.borderRadius = "10px"
    container.style.borderWidth = "10px"

    var toggleButton = document.createElement("button")
    toggleButton.classList.add("censorshipButton")

    var textBlock = document.createElement("p")
    textBlock.appendChild(document.createTextNode("This content was classified to be too negative"))
    textBlock.style.width = "100%"
    textBlock.style.textAlign = "center"
    textBlock.style.padding = "16px"
    textBlock.style.fontSize = "23px"
    textBlock.style.outline = "none"
    textBlock.style.color = "#555"

    container.appendChild(textBlock)
    container.appendChild(toggleButton)

    //var css = '.censorshipButton:hover{ background-color: #00ff00 }'
    //
    toggleButton.addEventListener("mouseenter", () => {
        toggleButton.style.backgroundColor = "#444"
        toggleButton.style.color = "#eee"
    })
    toggleButton.addEventListener("mouseleave", () => { 
        toggleButton.style.backgroundColor = "#eee"
        toggleButton.style.color = "#444"
    })

    toggleButton.appendChild(document.createTextNode("Understood. Show it regardless"))
    toggleButton.style.backgroundColor = "#eee"
    toggleButton.style.color = "#444"
    toggleButton.style.padding = "18px"
    toggleButton.style.width = "100%"
    toggleButton.style.fontSize = "17px"
    toggleButton.style.border = "none"
    toggleButton.style.textAlign = "center"

    toggleButton.addEventListener("click", function (){
        var siblings = parentNode.childNodes
        for(var j = 0; j < siblings.length; j++){
            if(siblings[j].classList && siblings[j].classList.contains("tweet")){
                siblings[j].style.display = "block"
                container.style.display = "none"
            }
        }
        
        //toggleButton.firstChild.data = toggleButton.firstChild.data == "Show" ? "Hide" : "Show"; 
    })

    parentNode.appendChild(container)

}

getNewTweets();
setInterval(getNewTweets, 1000);
// setTimeout(() => console.log(allTweets), 5000)
