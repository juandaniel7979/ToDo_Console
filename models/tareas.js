const {v4:uuidv4} = require('uuid');
const Tarea = require('./tarea');

class Tareas{
    _listado = {};
    
    get ListadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado;
    }
    constructor(){
        this._listado = {};
    }


    borrarTarea(id=''){
        
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.map(tarea=>{
            this._listado[tarea.id] = tarea
        })

    }

    crearTarea(desc=''){
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        // const lista = this.getListadoArr();
        // let salida = '';
        // lista.map((tarea,index)=>{
        //     console.log(`${(index+1).toString().green}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completado':'Pendiente'}\n`);
        //     // salida += `${(index+1).toString().green}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completado':'Pendiente'}\n`
        // })
        console.log()
        this.ListadoArr.map((tarea,index)=>{
            const idx =`${index + 1}`.green;
            const {desc,completadoEn} = tarea;
            const estado = ( completadoEn) ? 'Completada'.green:'Pendiente'.red
            console.log(`${ idx } ${ desc } :: ${estado}`);
        })
        // console.log(salida);
    }

    listarPendientesCompletadas( completadas = true ){
        console.log()
        if(!completadas){
            this.ListadoArr.filter(({completadoEn})=> completadoEn===null).map((tarea,index)=>{
                const idx =`${index + 1}`.green;
                const {desc,completadoEn} = tarea;
                const estado = ( completadoEn) ? 'Completada'.green:'Pendiente'.red
                console.log(`${ idx } ${ desc } :: ${estado}`);
            })
            return null;
        }
        this.ListadoArr.filter(({completadoEn})=> completadoEn!==null).map((tarea,index)=>{
            const idx =`${index + 1}`.green;
            const {desc,completadoEn} = tarea;
            const estado = ( completadoEn) ? 'Completada'.green:'Pendiente'.red
            console.log(`${ idx }. ${ desc } :: ${completadoEn.green}`);
        })
    }

    toggleCompletadas( ids = []){
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.ListadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}




module.exports = Tareas