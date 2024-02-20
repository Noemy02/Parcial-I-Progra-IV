Vue.component('componente-autores', {
    data() {
        return {
            valor:'',
            autores:[],
            accion:'nuevo',
            autor:{
                idAutor: new Date().getTime(),
                codigo:'',
                nombre:'',
                pais:'',
                telefono:''
               
            }
        }
    },
    methods:{
        buscarAutor(e){
            this.listar();
        },
        eliminarAutor(idAutor){
            if( confirm(`Esta seguro de elimina el autor?`) ){
                let store = abrirStore('autores', 'readwrite'),
                query = store.delete(idAutor);
            query.onsuccess = e=>{
                this.nuevoAutor();
                this.listar();
            };
            }
        },
        modificarAutor(autor){
            this.accion = 'modificar';
            this.autor = autor;
        },
        guardarAutor(){
            //almacenamiento del objeto autores en indexedDB
            let store = abrirStore('autores', 'readwrite'),
                query = store.put({...this.autor});
            query.onsuccess = e=>{
                this.nuevoAutor();
                this.listar();
            };
            query.onerror = e=>{
                console.error('Error al guardar en autores', e.message());
            };
        },
        nuevoAutor(){
            this.accion = 'nuevo';
            this.autor = {
                idAutor: new Date().getTime(),
                codigo:'',
                nombre:'',
                pais:'',
                telefono:''
            }
        },
        listar(){
            let store = abrirStore('autores', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.autores = data.result
                    .filter(autor=>autor.codigo.includes(this.valor) || 
                    autor.nombre.toLowerCase().includes(this.valor.toLowerCase()) || 
                    autor.direccion.toLowerCase().includes(this.valor.toLowerCase()) || 
                    autor.pais.toLowerCase().includes(this.valor.toLowerCase()) ||
                    autor.telefono.toLowerCase().includes(this.valor.toLowerCase()));
            };
        }
    },
    template: `
        <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">REGISTRO DE AUTORES</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">CODIGO</div>
                            <div class="col col-md-3">
                                <input v-model="autor.codigo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">NOMBRE</div>
                            <div class="col col-md-5">
                                <input v-model="autor.nombre" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">PAIS</div>
                            <div class="col col-md-5">
                                <input v-model="autor.pais" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">TELEFONO</div>
                            <div class="col col-md-3">
                                <input v-model="autor.telefono" type="text" class="form-control">
                           </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent.default="guardarAutor" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent.default="nuevoAutor" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE AUTORES</div>
                    <div class="card-body">
                        <form id="frmAutor">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, nombre, pais, telefono" type="search" v-model="valor" @keyup="buscarAutor" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th>PAIS</th>
                                        <th>TELEFONO</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarAutor(autor)" v-for="autor in autores" :key="autor.idAutor">
                                        <td>{{autor.codigo}}</td>
                                        <td>{{autor.nombre}}</td>
                                        <td>{{autor.pais}}</td>
                                        <td>{{autor.telefono}}</td>
                                        <td><button @click.prevent.default="eliminarAutor(autor.idAutor)" class="btn btn-danger">del</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
});