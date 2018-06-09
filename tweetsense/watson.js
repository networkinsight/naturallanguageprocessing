var WATSON_URL = "https://gateway-fra.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2018-03-16";
var MATTY_URL = "http://165.227.129.160:1122/analyze"
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
        console.log("[DEBUG] status =", this.status);
        if (this.readyState == 4 && this.status == 200) {
            console.log("[DEBUG] Got a valid response!");
            callback(xhttp.responseText);
        }
    }
    
    xhttp.open("POST", MATTY_URL, true);
    xhttp.withCredentials = true;
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Authorization", "Basic " + btoa(WATSON_UNAME+":"+WATSON_PWD));
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.send(JSON.stringify(params));
    
    console.log("[DEBUG] request sent …");
}

function testAnalyze() {
    var input = {
          "text": "IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.",
          "features": {
              "entities": {
                        "emotion": true,
                        "sentiment": true,
                        "limit": 2
                      },
              "keywords": {
                        "emotion": true,
                        "sentiment": true,
                        "limit": 2
                      }
            }
        }
        var data = {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            }
        }
        var response = fetch("http://165.227.129.160:1122/analyze", data)
        response.then(res => res.json()).catch(error => console.error('Error:', error)).then(response => console.log('Success:', response));
}
