
isDebug = true;   // set true to use timestamp in asset URLs to prevent browser caching
var possibleMenuActions = ['home', 'about', 'links', 'contact'];
var possibleGlobalStatus = ['ready', 'busy', 'error'];

function menuAction(action){
    if(possibleMenuActions.includes(action)){
        setGlobalStatus("busy");
        injectPartial(action, (isStatusOK) => {
            isStatusOK === true ? setGlobalStatus("ready") : setGlobalStatus("error");
        });
    }
}

function setGlobalStatus(status) {
    if(possibleGlobalStatus.includes(status)){
        document.querySelector(":root").style.setProperty("--var-status-color", "var(--var-status-" + status + "-color)");
    }
}

injectStylesheet("index", true);
document.addEventListener('DOMContentLoaded', () => {
    mainElement = document.querySelector("main");
    menuElement = document.querySelector("#index-menu");
    setTimeout(() => injectPartial('home', (isStatusOK) => {
        // lazy load font css to prevent blocking
        injectStylesheet("font", true);

        isStatusOK === true ? setGlobalStatus("ready") : setGlobalStatus("error");
    }), 500);
});
