var WATSON_URL = "https://gateway-fra.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2018-03-16";
var WATSON_UNAME = "7a5c3aca-9890-4115-82df-cb109843d481";
var WATSON_PWD = "yyjvbBxBvOV0"; 

function requestWatson(tweetId, text, callback) {
   var xhttp = new XMLHttpRequest();
    var params = {
        "text": text,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 8
            }
        }
    };
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(tweetId, xhttp.responseText);
        }
    }
    
    xhttp.open("POST", WATSON_URL, true);
    xhttp.withCredentials = true;
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(WATSON_UNAME+":"+WATSON_PWD));
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send(JSON.stringify(params));
}

function totalSentiment(watsonResponse) {
    var values = [];
    
    JSON.parse(watsonResponse).keywords.forEach(function (keyword) {
        values.push({
            sentiment: keyword.sentiment.score,
            relevance: keyword.relevance,
            keyword: keyword.text
        });
    });

    // filter sentiments *exactly* equal to 0
    // (these were probably unknown to Watson)
    values = values.filter(v => v.sentiment != 0);
    if (values.length == 0)
        return undefined;

    // sortiere *absteigend* nach Relevanz    
    values.sort(function byRelevance(u, v) {
        return v.relevance - u.relevance;
    });
    
    // nimm die nach Relevanz gewichtete Summe der Sentiments der drei
    // relevantesten Keywords
    var length = Math.min(values.length, 3);
    var result_tmp = values.slice(0, length).reduce(function (s, a) {
        s.weighted_sum += a.relevance * a.sentiment;
        s.summed_weights += a.relevance;
        return s;
    }, {weighted_sum: 0, summed_weights: 0});
    var result = result_tmp.weighted_sum/result_tmp.summed_weights;
    
    
    console.log("[DEBUG] sentiments:", values.map(v => v.sentiment),
        "\n        relevances:", values.map(v => v.relevance),
        "\n        result:", result,
        "\n        keywords:", values.slice(0, length).map(v => v.keyword)
    );
    
    return { "value": result, "keywords": values, "length": length }
    
}
