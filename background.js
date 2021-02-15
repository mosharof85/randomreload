let stateString = 'RandomReloadFiverr';
let urlString = 'fiverr.com';
let queryVarArr = ['mosharof_pro/seller_dashboard', 'inbox', 'mosharof_pro/requests'];
let runSt = false;

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({'RandomReloadFiverr' : false})
    myFunction();
});

chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.get(stateString, value=>{
        if(value.RandomReloadFiverr){
            runSt = true;
        }
        else
        {
            runSt = false;
        }
        myFunction();
    })
});

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        chrome.storage.local.get(stateString, value=>{
            if(value.RandomReloadFiverr){
                runSt = true;
            }
            else
            {
                runSt = false;
            }
            myFunction();
        })
    });
})

chrome.browserAction.onClicked.addListener(function () {
    myFunction();
});

// let queryVarArr = ['requests', 'inbox', 'users'];

function myFunction() {
    if(runSt) {
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(tb => {
                if (tb.url.includes(urlString)) {
                    chrome.tabs.update(tb.id, {url: tb.url});
                    console.log(tb.url + '~' + new Date().toLocaleTimeString());

                    if(tb.url.includes(queryVarArr[0])){
                        setTimeout(function () {
                            myFunctionVar(queryVarArr[0]);
                        }, genRand(3.5,4.4));
                    }
                    if(tb.url.includes(queryVarArr[1])){
                        setTimeout(function () {
                            myFunctionVar(queryVarArr[1]);
                        }, genRand(4.6,5));
                    }
                    if(tb.url.includes(queryVarArr[2])){
                        setTimeout(function () {
                            myFunctionVar(queryVarArr[2]);
                        }, genRand(5.1,6));
                    }
                }
            })
        })
    }
}

// let queryVarArr = ['requests', 'inbox', 'users']

function myFunctionVar(queryVar){
    if(runSt){
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(tb => {
                if (tb.url.includes(urlString) && tb.url.includes(queryVar)) {
                    chrome.tabs.update(tb.id, {url: tb.url});
                    console.log(queryVar + '~' + new Date().toLocaleTimeString());
                }
            })

            if(queryVar === queryVarArr[0]){
                setTimeout(function () {
                    myFunctionVar(queryVarArr[0]);
                }, genRand(3.5,4.4));
            }
            if(queryVar == queryVarArr[1]){
                setTimeout(function () {
                    myFunctionVar(queryVarArr[1]);
                }, genRand(4.6,5));
            }
            if(queryVar == queryVarArr[2]){
                setTimeout(function () {
                    myFunctionVar(queryVarArr[2]);
                }, genRand(5.1,6));
            }
        })
    }
}


// function genRand(min, max, decimalPlaces) {
//     var rand = Math.random() * (max - min) + min;
//     var power = Math.pow(10, decimalPlaces);
//     return (Math.floor(rand*power) / power) * 60 *1000;
// }

function genRand(min, max) {
    var rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, 2);
    return (Math.floor(rand*power) / power) * 60 *1000;
}