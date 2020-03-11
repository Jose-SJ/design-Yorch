window.onload = function() {
    var x = "Port: " + location.port;
    console.log(x);

    const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
    const tile_url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
    L.tileLayer(tile_url, {attribution}).addTo(mymap);

    let firstTime = true;

    async function updateP(){ 
        const response = await fetch('/datos');
        const data = await response.json();
        console.log(data)

        color='rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
        var x = document.querySelectorAll(".update");
        for (i = 0; i < x.length; i++) {
            x[i].style.color = color;
            x[i].style.backgroundColor = color;
        }

        lat = Object.values(data[data.length - 1])[0];
        long = Object.values(data[data.length - 1])[1];
        document.getElementsByClassName("lat")[0].innerHTML = lat;
        document.getElementsByClassName("long")[0].innerHTML = long;
        document.getElementsByClassName("date")[0].innerHTML = Object.values(data[data.length - 1])[2];
        document.getElementsByClassName("hour")[0].innerHTML = Object.values(data[data.length - 1])[3];
    }
    updateP();
    setInterval(updateP, 1000);
}
    