
var loadingInnerHTML = 'the function is doing its job please wait<br>bing bing bang bang tak tak tak';
var errorInnerHTML = 'Content Unavailable. <br>成熟的标志，就是后悔的事会越干越少。';

var isDebug = false;
var debugTS = () => Date.now();   // timestamp for use in asset URLs to prevent browser caching (set isDebug to utilize)
var headElement = document.querySelector("head");
var mainElement = undefined;
var menuElement = undefined;
var injectStylesheetList = [];
var injectScriptList = [];

function injectPartial(path, callback) {
    if(!mainElement) return false;

    mainElement.innerHTML = loadingInnerHTML;
    ejectScript();
    ejectStylesheet();
    menuElement.setAttribute("disabled", "");

    fetch(new Request("assets/partials/" + path + ".html" + (isDebug ? ("?ts=" + debugTS()) : "")))
    .then((response) => {
        if(!response.ok) {
            setTimeout(() => {this.mainElement.innerHTML = errorInnerHTML;}, 100);
            throw new Error(response.statusText);
        }

        return response.text();
    })
    .then((ret) => {
        setTimeout(() => {
            this.mainElement.innerHTML = ret;
            menuElement.removeAttribute("disabled");
            injectStylesheet(path);
            injectScript(path);
            // eval(path + "Main();");
            callback(true);
        }, 200);
    })
    .catch((err) => {
        setTimeout(() => {
            // document.getElementsByTagName("main")[0].innerHTML = err;
            this.menuElement.removeAttribute("disabled");
            console.log(err);
            callback(false);
        }, 200);
    })
}

function injectStylesheet(path, isRetain) {
    let newStylesheet = document.createElement("link");
    newStylesheet.rel = "stylesheet";
    newStylesheet.type = "text/css";
    newStylesheet.href = "assets/css/" + path + ".css" + (isDebug ? ("?ts=" + debugTS()) : "");

    let newStylesheetInject = this.headElement.appendChild(newStylesheet);
    if(isRetain !== true) injectStylesheetList.push(newStylesheetInject);
}

function ejectStylesheet() {
    injectStylesheetList.forEach(element => {
        element.remove();
    });
}

function injectScript(path, isRetain) {
    let newScript = document.createElement("script");
    newScript.src = "assets/js/" + path + ".js" + (isDebug ? ("?ts=" + debugTS()) : "");

    let newScriptInject = this.headElement.appendChild(newScript);
    if(isRetain !== true) injectScriptList.push(newScriptInject);
}

function ejectScript() {
    injectScriptList.forEach(element => {
        element.remove();
    });
}
