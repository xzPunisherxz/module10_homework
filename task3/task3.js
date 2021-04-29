let url = "wss://echo.websocket.org/"
let button = document.getElementById('send-btn')
let status = document.querySelector('#status')
let input = document.querySelector('#input')
let socket = new WebSocket(url)

//для геолокации
let geoButton = document.querySelector('#js-geo')
let geoStatus = document.querySelector('#geo-status')



window.onload = () => {
    socket.onopen = function () {
        alert('Openned')
    }

    socket.onclose = function (event) {
        alert('Closed')
        socket.close()
    }

    socket.onmessage = function (event) {
        let p2 = document.createElement('p')
        p2.textContent = `${event.data}`
        p2.style.color = "red"
        p2.style.alignSelf = "flex-start"
        if (!event.data.includes("https://www.openstreetmap.org/")) {
            status.appendChild(p2)
        }
    }
    button.addEventListener('click', (e) => {
        e.preventDefault()
        socket.send(`${input.value} `)
        let p = document.createElement('p')
        p.style.alignSelf = "flex-end"
        p.textContent = `${input.value}`
        status.appendChild(p)



    })
}
geoButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (!navigator.geolocation) {
        geoStatus.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            let mapLink = document.createElement('a')
            let urlGeo = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
            mapLink.href = urlGeo
            mapLink.textContent = 'Ссылка на карту';
            mapLink.style.alignSelf = "flex-end"
            socket.send(urlGeo)
            status.appendChild(mapLink)
        })
    }

})