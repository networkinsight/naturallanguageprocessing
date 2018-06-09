var WATSON_URL = "https://gateway-fra.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2018-03-16";
// var WATSON_VERSION = "2018-03-16"
var WATSON_UNAME = "7a5c3aca-9890-4115-82df-cb109843d481";
var WATSON_PWD = "yyjvbBxBvOV0"; 

function analyze(text, callback) {
    console.log("[DEBUG] analyzing text");

    var xhttp = new XMLHttpRequest();
    var params = {
        "text": text,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 2
            }
        }
    };
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("[DEBUG] Got a valid response!");
            callback(xhttp.responseText);
        }
    }
    
    xhttp.open("POST", WATSON_URL, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(WATSON_UNAME+":"+WATSON_PWD));
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send(JSON.stringify(params));
    
    console.log("[DEBUG] request sent …");
}
