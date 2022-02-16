const URL = "wss://echo-ws-service.herokuapp.com";
const button = document.querySelector(".button");
const input = document.querySelector(".input");
const messageHere = document.querySelector(".chat");
const geoButton = document.querySelector(".geoLoc");
const errorDiv = document.querySelector(".errorMessage");


function socketFunc() {
    console.log("window load")
    let wSocket = new WebSocket(URL);

    wSocket.addEventListener("open", () => {
        console.log("wSocket open");
       
   })
   
    wSocket.addEventListener("error", () => {
        errorDiv.innerText = `Ошибка соединения`
        errorDiv.classList.add("active")
    })

    wSocket.addEventListener("message", (receivedMessage) => {
        printAnswer(receivedMessage.data)
    })

    wSocket.addEventListener("close", () => {
        errorDiv.innerText = `Соединение закрыто`
        errorDiv.classList.add("active")
    })



  
    function sendMessage() {
        if (!(input.value === "")) {
            wSocket.send(input.value)
            printMyMessage(input.value)
            input.value = "";
        } 
    }
    
    function printMyMessage(message) {
        let div = document.createElement("div");
        div.innerText = message;
        messageHere.appendChild(div)
        div.classList.add("myMessage")
    }
    
    function printAnswer(answer) {
        console.log(typeof answer);
        console.log(answer);
        if (answer !== "[object GeolocationPosition]") {
            let div = document.createElement("div");
            div.innerText = answer;
            messageHere.appendChild(div)
            div.classList.add("answer")
        }
    }

    function geoError(error) {
        errorDiv.innerText = `Ошибка геопозиции: ${error.code} ${error.message}`
        errorDiv.classList.add("active")
        
    }

    function geoSuccess(position) {
        const latitude = position.coords.latitude;
        const longitude  = position.coords.longitude;
        /* console.log(position); */
        wSocket.send(position)
        printGeoPosition(latitude, longitude)
        
    }

    function sendGeoPosition() {
        if (!("geolocation" in navigator)) {
            console.log("местоположение НЕ доступно");
        } else {
            console.log("местоположение доступно");
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
        }
    }

    function printGeoPosition(x, y) {
        let a = document.createElement("a");
        a.href = `https://www.openstreetmap.org/#map=15/${x}/${y}`;
        a.innerText = "Геопозиция";
        messageHere.appendChild(a)
        a.classList.add("myMessage")
    }

    button.addEventListener("click", sendMessage)
    geoButton.addEventListener("click", sendGeoPosition)

}

window.addEventListener("load", socketFunc)

