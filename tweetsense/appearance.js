
const SENT_NEGATIVE = { r: 255, g:  45, b: 0   };
const SENT_NEUTRAL  = { r: 255, g: 255, b: 255 };
const SENT_POSITIVE = { r:   0, g: 255, b: 0   };

function setTweetColor(tweet, rgbString) {
    tweet.style.backgroundColor = rgbString;
}

function sentinentColor(x) {
    // x is in range [-1, 1]
    var rgb;
    
    if (x >= 0)
        rgb = {
            r: x * SENT_NEUTRAL.r + (1-x) * SENT_POSITIVE.r,
            g: x * SENT_NEUTRAL.g + (1-x) * SENT_POSITIVE.g,
            b: x * SENT_NEUTRAL.b + (1-x) * SENT_POSITIVE.b
        }
    else {
        x = -x;
        rgb = {
            r: x * SENT_NEUTRAL.r + (1-x) * SENT_NEGATIVE.r,
            g: x * SENT_NEUTRAL.g + (1-x) * SENT_NEGATIVE.g,
            b: x * SENT_NEUTRAL.b + (1-x) * SENT_NEGATIVE.b
        }
    }
    
    return "#" + paddedHex(rgb.r) + paddedHex(rgb.g) + paddedHex(rgb.b)
}

function paddedHex(v) {
    var hex = Math.round(v).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
