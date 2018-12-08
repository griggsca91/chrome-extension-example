var websocket;
const host = "echo.websocket.org";

function createWebSocketConnection() {

    if('WebSocket' in window){
        websocket = new WebSocket(`wss://${host}`);
        console.log("======== websocket ===========", websocket);

        websocket.onopen = function() {
            websocket.send("Hello");
        };

        websocket.onmessage = function (event) {
            console.log(event.data);
            var notificationOptions = {
                type: "basic",
                title: "title",
                message: event.data,
                iconUrl: "images/icon.png"
            }
            chrome.notifications.create("", notificationOptions);
        };

        websocket.onclose = function() { console.log("==== web socket closed ======"); };
    }
}
chrome.runtime.onInstalled.addListener(createWebSocketConnection);