// const { mostrarMenu, pausa} = require('./helpers/mensajes.js')
require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu,pausa,leerInput, listadoTareasBorrar, confirmar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();
const main = async()=>{
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB)
    }
    // await pausa();

    do{
        // Imprimir el menu interactivvo
        opt = await inquireMenu();
        switch (opt) {
            case '1': //Crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc)
                // guardarDB(tareas.getListadoArr())
            break;
            case '2': // Listar todas las tareas
                tareas.listadoCompleto();
            break;
            case '3': // Listar completadas
                tareas.listarPendientesCompletadas();
            break;
            case '4': // Listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;
            case '5': 
                tareas.listarPendientesCompletadas(false);
            break;
            case '6': //Borrar
                const id = await listadoTareasBorrar(tareas.ListadoArr)
                if(id !=='0'){
                    const ok = await confirmar('¿Está seguro?')
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;
        
            default:
                break;
        }
        guardarDB(tareas.ListadoArr)
        await pausa();

    }while(opt!=='0');
}

main()
// .then(()=>console.log('Exitoso'))
// .catch(err=>console.log(err));