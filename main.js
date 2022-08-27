function onClick (event) {
    event.preventDefault(); //metodo que anula el evento por defecto que tiene un boton en un formulario. Anulamos para hacer otras acciones antes del envio.
    
    this.style.backgroundColor = "#009486";
    console.log("click...");
    console.log(event);

    //name es el id asociado al input name del formulario
    //y asi para cada input del formulario
    const mensaje = {
      comercio: document.getElementById('comercio').value,
      titular: document.getElementById('titular').value,
      celular: document.getElementById('celular').value
    }
    console.log(mensaje);
  
    //con el fetch vamos a acceder a metodo post.
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(mensaje), //transformo el mensaje en string
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => { 
          console.log(json);
          //me entrega un mensaje por pantalla - alert
          Swal.fire(
              'Enviado',
              'Registro exitoso!!',
              'success'
          );
          cleanForm();
          /* redirectUrl(); */
      })
      .catch((err) => console.log(err));
  
}

//voy a obteer el formulario
//y aplico reset, todos los input del formulario se ponen en blanco
function cleanForm() {
    let formulario = document.getElementById('formulario');    
    formulario.reset();    
}
function redirectUrl(){
    window.location.href = "https://www.google.com";    
}

//creo un objeto boton, capturo el elemento que tiene id=enviar
let boton = document.getElementById("enviar");
//primero el elemento qeu quiero capturar y despues lo que quiero que se ejecute
boton.addEventListener("click", onClick);


/* CLIMA - API WEATHER MAP */

let weather = {
  apiKey: "965d0ddd78149f4276b167099755b979",
  fetchWeather: function (lon,lat) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=965d0ddd78149f4276b167099755b979&units=metric")
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humedad: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Vientos: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
};

weather.fetchWeather("-65.3312979","-24.18245854496943");
