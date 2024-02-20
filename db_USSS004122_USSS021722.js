var db;
const funcdb = ()=>{
    let indexDB = indexedDB.open('db_sistema',1);
    indexDB.onupgradeneeded = e=>{
        let req = e.target.result,
            tblautor = req.createObjectStore('autores',{keyPath:'idAutor'}),
            tbllibro = req.createObjectStore('libros',{keyPath:'idLibro'});
        tblautor.createIndex('idAutor','idAutor',{unique:true});
        tblautor.createIndex('codigo','codigo',{unique:true});
        tbllibro.createIndex('idLibro','idLibro',{unique:true});
        tbllibro.createIndex('codigo','codigo',{unique:true});
    };
    indexDB.onsuccess = e=>{
        db = e.target.result;
    };
    indexDB.onerror = e=>{
        console.error('Error al crear la base de datos', e.message());
    };
}, abrirStore = (store, modo)=>{
    let ltx = db.transaction(store, modo);
    return ltx.objectStore(store);
};
funcdb();