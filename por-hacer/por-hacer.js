const fs=require('fs');

let listadoPorHacer = [];
//guardar db
const guardarDB = ()=>{
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile('db/data.json', data, (err)=>{
    if (err) throw new Error('No se pudo Guardar', err);
  });
}
//cargar db
const cargarDB = ()=>{
  try {
    listadoPorHacer = require('../db/data.json');
  } catch (e) {
    listadoPorHacer = [];
  }

}
//comando crear
const crear = (descripcion)=>{

  cargarDB();

  let porHacer={
    descripcion,
    completado: false
  };
  listadoPorHacer.push(porHacer);
  guardarDB();
  return porHacer;
}
//comando listado
const getListado=()=>{
  cargarDB();
  return listadoPorHacer;
}
//comando actualizar
const actualizar = (descripcion, completado=true)=>{
  cargarDB();
  let index = listadoPorHacer.findIndex(tarea => tarea.descripcion===descripcion);
  if (index >= 0 ) {
    listadoPorHacer[index].completado=completado;
    guardarDB();
    return true;
  }else {
    return false;
  }
}
//comando borrar
const borrar = (descripcion)=>{
  cargarDB();
  let nuevoListado=listadoPorHacer.filter(tarea=>{
    return tarea.descripcion !== descripcion
  });
  if (listadoPorHacer.length===nuevoListado.length) {
    return false;
  }else {
    listadoPorHacer=nuevoListado;
    guardarDB();
    return true;
  }
}


module.exports={
  crear,
  getListado,
  actualizar,
  borrar
}
