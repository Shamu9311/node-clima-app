const inquire = require('inquirer');
require('colors');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ],
    }
];



const inquirerMenu = async() => {
    console.clear();
    console.log('=============================='.green);
    console.log('     Seleccione una opción    '.white);
    console.log('==============================\n'.green);

    const { opcion } = await inquire.prompt(preguntas);
    return opcion;
}


const inquirerPausa = async() => {

    const pausa = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${ 'ENTER'.green } para continuar.`
        }
    ];
    console.log('\n');
    await inquire.prompt(pausa);
}


const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquire.prompt(question);
    return desc;
}


const listarLugares = async( lugares = [] ) => {
    const choices = lugares.map( (lugar, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: lugar.id,
            name: `${ idx } ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ];
    const { id } = await inquire.prompt(preguntas);
    return id;
}


const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquire.prompt(question);
    return ok;
}


const mostrarListadoChecklist = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];
    const { ids } = await inquire.prompt(pregunta);
    return ids;
}



module.exports = {
    inquirerMenu, inquirerPausa, leerInput, listarLugares, confirmar,
    mostrarListadoChecklist
};