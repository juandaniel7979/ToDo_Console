// const { mostrarMenu, pausa} = require('./helpers/mensajes.js')
require('colors');
const { inquireMenu,pausa,leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();
const main = async()=>{
    let opt = '';
    const tareas = new Tareas();
    do{
        // Imprimir el menu interactivvo
        opt = await inquireMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc)
            break;
            case '2':
                console.log(tareas._listado)
            break;
        
            default:
                break;
        }
        await pausa();

    }while(opt!=='0');
}

main()
// .then(()=>console.log('Exitoso'))
// .catch(err=>console.log(err));