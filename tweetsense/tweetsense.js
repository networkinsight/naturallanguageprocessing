var allTweets = {}
//x[i].style.backgroundColor = "red";

function getNewTweets() {
    var x = document.getElementsByClassName("tweet");
    console.log(x.length)
    var i;
    var added = 0;
    for (i = 0; i < x.length; i++) {
        const data_item_id = x[i].getAttribute("data-item-id")
        if(data_item_id != null && !(Object.keys(allTweets).includes(data_item_id))){
            var parsed = processRawTweet(x[i])
            allTweets[data_item_id] = {
                id: data_item_id,
                tweet: x[i],
                tweetData: parsed,
                alreadyProcesses: false,
                sentimentValue: (data_item_id % 1000)/500-1
            }
            allTweets[data_item_id] = object;
            added++;

            setTweetColor(
                x[i],
                sentinentColor(object.sentimentValue)
            );

            if(object.sentimentValue < -0.5) collapseTweet(x[i])

        }
    } 
    console.log("added", added, "new items")
}

function processRawTweet(tweet){
    var t = tweet.getElementsByClassName("js-tweet-text")[0].innerHTML
    t = t.replace(/<a.*\/a>/i, "")

    var a = tweet.getElementsByClassName("fullname")[0].innerHTML

    return {author: a, text: t}
}

function collapseTweet(tweet){
    var parentNode = tweet.parentNode
    var toggleButton = document.createElement("button")

    tweet.style.display = "none"

    toggleButton.appendChild(document.createTextNode("let me see it"))
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
    })

    parentNode.appendChild(toggleButton)

}

getNewTweets()
setInterval(getNewTweets, 10000)

setTimeout( () => console.log(allTweets), 5000)

function analyzeWord(word) {

}
