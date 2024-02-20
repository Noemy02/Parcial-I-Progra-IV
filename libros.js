Vue.component('componente-libros', {
    data() {
        return {
            valor:'',
            libros:[],
            accion:'nuevo',
            libro:{
                idLibro: new Date().getTime(),
                autor:'',
                isbn:'',
                titulo:'',
                editorial:'',
                edicion:''
            }
        }
    },
    methods:{
        buscarLibro(e){
            this.listar();
        },
        eliminarLibro(idLibro){
            if( confirm(`Esta seguro de elimina el libro?`) ){
                let store = abrirStore('libros', 'readwrite'),
                query = store.delete(idLibro);
            query.onsuccess = e=>{
                this.nuevoLibro();
                this.listar();
            };
            }
        },
        modificarLibro(libro){
            this.accion = 'modificar';
            this.libro = libro;
        },
        guardarLibro(){
            //almacenamiento del objeto libros en indexedDB
            let store = abrirStore('libros', 'readwrite'),
                query = store.put({...this.libro});
            query.onsuccess = e=>{
                this.nuevoLibro();
                this.listar();
            };
            query.onerror = e=>{
                console.error('Error al guardar en libros', e.message());
            };
        },
        nuevoLibro(){
            this.accion = 'nuevo';
            this.libro = {
                idLibro: new Date().getTime(),
                autor:'',
                isbn:'',
                titulo:'',
                editorial:'',
                edicion:''
            }
        },
        listar(){
            let store = abrirStore('libros', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.libros = data.result
                    .filter(libro=>libro.codigo.includes(this.valor) || 
                    libro.autor.toLowerCase().includes(this.valor.toLowerCase()) || 
                    libro.isbn.toLowerCase().includes(this.valor.toLowerCase()) || 
                    libro.titulo.toLowerCase().includes(this.valor.toLowerCase()) ||
                    libro.editorial.toLowerCase().includes(this.valor.toLowerCase()) ||
                    libro.edicion.toLowerCase().includes(this.valor.toLowerCase()));
            };
        }
    },
    template: `
        <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">REGISTRO DE LIBROS</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">CODIGO</div>
                            <div class="col col-md-3">
                                <input v-model="libro.codigo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">AUTOR</div>
                            <div class="col col-md-5">
                                <input v-model="libro.autor" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">ISBN</div>
                            <div class="col col-md-3">
                                <input v-model="libro.isbn" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">TITULO</div>
                            <div class="col col-md-3">
                                <input v-model="libro.titulo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">EDITORIAL</div>
                            <div class="col col-md-3">
                                <input v-model="libro.editorial" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">EDICCION</div>
                            <div class="col col-md-3">
                                <input v-model="libro.edicion" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent.default="guardarLibro" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent.default="nuevoLibro" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE LIBROS</div>
                    <div class="card-body">
                        <form id="frmLibro">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, autor, isbn, titulo, editorial, edicion" type="search" v-model="valor" @keyup="buscarLibro" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>AUTOR</th>
                                        <th>ISBN</th>
                                        <th>TITULO</th>
                                        <th>EDITORIAL</th>
                                        <th>EDICION</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarLibro(libro)" v-for="libro in libros" :key="libro.idLibro">
                                        <td>{{libro.codigo}}</td>
                                        <td>{{libro.autor}}</td>
                                        <td>{{libro.isbnn}}</td>
                                        <td>{{libro.titulo}}</td>
                                        <td>{{libro.editorial}}</td>
                                        <td>{{libro.edicion}}</td>
                                        <td><button @click.prevent.default="eliminarLibro(libro.idLibro)" class="btn btn-danger">del</button></td>
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