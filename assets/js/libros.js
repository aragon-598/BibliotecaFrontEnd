var encontrado= JSON.parse(localStorage.getItem("encontrado"));
var vueLibros= new Vue({
    el: "#AdminLibros",
    data:{
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
        },
        textoBusqueda:"",
        libroSelected: 0,
        libros:[],
        nuevoLibro: {
            "titulo": "",
            "autor": "",
            "numPaginas":0
        }, 
    },
    methods:{
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.libros[x].titulo + 
                this.libros[x].idLibro +
                this.libros[x].autor;
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusqueda.toUpperCase())>=0)
                        return true;
            else
                return false;  
        },
        mostrarAlerta:function(titu,msg){
            this.alerta.titulo=titu;
            this.alerta.mensaje=msg;
           
            $("#miAlerta").show('fade');
            setTimeout(function(){
                $("#miAlerta").hide('fade');
            },3000);
            
        },
        mostrarAgregar:function(){
            $('#modalAgregar').modal('show');
        },
        mostrarModificar:function(){
            $('#modalModificar').modal('show');
        },
        mostrarEliminar:function(){
            $('#modalEliminar').modal('show');
        },
        cargarDatos: function(){
            //cargando los libros
            axios.get('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/libros/findAll')
                .then(function (res) {
                    vueLibros.libros=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            
        },
        agregarLibro:function(){
           axios.post('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/libros/crear/',this.nuevoLibro)
                .then(function (res) {
                    vueLibros.nuevoLibro.titulo="";
                    vueLibros.nuevoLibro.autor="";
                    vueLibros.nuevoLibro.numPaginas=0;
                    vueLibros.cargarDatos();
                    vueLibros.mostrarAlerta("Libro Agregado","Se agregó un nuevo libro");
                }).catch(function (error) {
                    vueLibros.mostrarAlerta("Error",error);
                    console.log(error);
                });
        },
        modificarLibro:function(){
            axios.put('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/libros/',this.libros[this.libroSelected])
                .then(function (res) {
                    console.log("UPDATED LIBRO");
                    vueLibros.mostrarAlerta("Libro Modificado","Se modifico el libro satisfactoriamente");
                })
                .catch(function (error) {
                    vueLibros.mostrarAlerta("Error",error);
                    console.log(error);
                });
        },
        eliminarLibro:function(){
            console.log();
            axios.delete('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/libros/'+ this.libros[this.libroSelected].idLibro)
                .then(function (res) {
                    console.log("DELETE LIBRO");
                    vueLibros.cargarDatos();
                    vueLibros.mostrarAlerta("Libro Eliminado","El libro se eliminó de la base de datos");
                    location. reload()
            })
                .catch(function (error) {
                    vueLibro.mostrarAlerta("Error:",error);
                    console.log(error);
                });
        },
    },
    mounted:function(){
       this.cargarDatos();
    },
});