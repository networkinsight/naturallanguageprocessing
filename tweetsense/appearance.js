const SENT_NEGATIVE = { r: 255, g:  45, b: 0   };
const SENT_NEUTRAL  = { r: 255, g: 255, b: 255 };
const SENT_POSITIVE = { r:   0, g: 255, b: 0   };

function setTweetColor(tweetId, rgbString) {
    allTweets[tweetId].tweet.style.backgroundColor = rgbString;
}

function sentimentColor(x) {
    // x is in range [-1, 1]
    var rgb;
    
    if (x >= 0)
        rgb = {
            r: (1-x) * SENT_NEUTRAL.r + x * SENT_POSITIVE.r,
            g: (1-x) * SENT_NEUTRAL.g + x * SENT_POSITIVE.g,
            b: (1-x) * SENT_NEUTRAL.b + x * SENT_POSITIVE.b
        }
    else {
        var abs_x = Math.abs(x);
        rgb = {
            r: (1-abs_x) * SENT_NEUTRAL.r + abs_x * SENT_NEGATIVE.r,
            g: (1-abs_x) * SENT_NEUTRAL.g + abs_x * SENT_NEGATIVE.g,
            b: (1-abs_x) * SENT_NEUTRAL.b + abs_x * SENT_NEGATIVE.b
        }
    }
    
    return "#" + paddedHex(rgb.r) + paddedHex(rgb.g) + paddedHex(rgb.b)
}

function paddedHex(v) {
    var hex = Math.round(v).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
