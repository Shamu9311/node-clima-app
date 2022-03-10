require('dotenv').config()
const { inquirerMenu, inquirerPausa, leerInput, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

// console.log(process.env);
const main = async () => {
    let opt = -1;
    const busquedas = new Busquedas();
    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostrar mensaje para que la persona escriba
                const lugar = await leerInput('Ciudad: ');
                // Buscar los lugares
                const lugares = await busquedas.ciudad( lugar );
                //Seleccionar el lugar
                const id = await listarLugares( lugares );
                if(id === '0' ) continue;
                const lugarSel = lugares.find( l => l.id === id );
                // GUardar en BD
                busquedas.agregarHistorial( lugarSel.nombre );
                // Clima
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.long );
                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre.green);
                console.log('Lat: ', lugarSel.lat);
                console.log('Long: ', lugarSel.long);
                console.log('Temperatura: ', clima.temp);
                console.log('Mínima: ', clima.tempMin);
                console.log('Máxima: ', clima.tempMax);
                console.log('Estado del clima: ', clima.desc.green);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1. }`.green;
                    console.log(`${ idx } ${ lugar } `);
                });
                break;      
        }
        if( opt !== 0 ) await inquirerPausa();
    }while(opt !== 0)
}

main();