const inquirer = require('inquirer');
require('colors')

const preguntas= [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tarea'
            },
            {
                value: '3',
                name: '3. Listar tareas completeadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
]

const inquireMenu = async()=>{
    // console.clear();
    console.log('=============================='.green)
    console.log('   Seleccione una opción:'.green);
    console.log('==============================\n'.green)


    const {opcion} = await inquirer.prompt(preguntas)
    console.log('opcion seleccionada',opcion);
    return opcion;
}


const pausaOpt= [
    {
        type: 'input',
        name: 'pausa',
        message: `Presione: ${'Enter'.green} para continuar\n`,
    }
]
const pausa = async()=>{
    // console.clear();
    console.log('\n')
    const {pausa} = await inquirer.prompt(pausaOpt)
    return pausa;
}

const leerInput = async(message) => {
    const question={
        type:'input',
        name:'desc',
        message,
        validate(value){
            if(value.length===0){
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }

    const {desc} = await inquirer.prompt(question);
    return desc;
}

module.exports={
    inquireMenu,
    pausa,
    leerInput
}