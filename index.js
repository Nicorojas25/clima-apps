require("dotenv").config();

const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

//console.log(process.env);

const main = async () => {
  console.clear();

  let opt;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput("Ciudad:");

        // Buscar los lugares
        const lugares = await busquedas.ciudad(termino);

        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === "0") continue;

        const lugarSel = lugares.find((lugar) => lugar.id === id); // .find regresa el primer elemento que cumpla con la condición que se especifica
        //console.log({ lugarSel });

        busquedas.agregarHistorial(lugarSel.nombre);

        // Clima
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        // Resultados
        console.clear();
        console.log("\nInformación de la ciudad \n".green);
        console.log("Ciudad:", lugarSel.nombre.green);
        console.log("Lat:", lugarSel.lat);
        console.log("Lng:", lugarSel.lng);
        console.log("Temperatura:", clima.temp);
        console.log("Temp mín:", clima.min);
        console.log("Temp max:", clima.max);
        console.log("Como está el clima:", clima.desc.yellow);
        break;

      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          //busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
