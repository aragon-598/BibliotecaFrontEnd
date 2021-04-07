var vuePrestamos= new Vue({
    el: "#AdminPrestamos",
    data: {
        textoBusqueda:"",
        prestamoSelected: 0,
        prestamos:[   
          {
            "titulo": "Nachos",
            "autor": "juan",
            "usuario": "Maria",
            "fecha_Prestamo": "2021/01/28",
            "fecha_Entrega": "2021/11/28",
            "devuelto": true,
          },
          {
            "titulo": "Harry",
            "autor": "Potter",
            "usuario": "Maria",
            "fecha_Prestamo": "2021/01/28",
            "fecha_Entrega": "2021/11/28",
            "devuelto": false,
          },
          {
            "titulo": "Nose",
            "autor": "Chepe",
            "usuario": "Alexis",
            "fecha_Prestamo": "2021/01/28",
            "fecha_Entrega": "2021/11/28",
            "devuelto": false,
          },
        ],
        usuarios:[],
        
        
    },
    methods:{
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.prestamos[x].titulo + 
                this.prestamos[x].usuario +
                this.prestamos[x].autor;
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusqueda.toUpperCase())>=0)
                        return true;
            else
                return false;  
        },
        mostrarAgregar:function(){
            $('#modalAgregar').modal('show');
        },
        mostrarEliminar:function(){
            $('#modalEliminar').modal('show');
        },
        
        
        cargarDatos: function(){
            //cargando los usuarios
            axios.get('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/user/findAll')
                .then(function (res) {
                    vuePrestamos.usuarios=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            
        },
    },
 });

var vueDevoluciones= new Vue({
    el: "#AdminDevoluciones",
     data: {
        textoBusqueda:"",
        reservaSelected: 0,
        reservas:[],
    },
    methods:{
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.reservas[x].idEjemplar.idLibro.titulo + 
                this.reservas[x].idUsuario.usuario +
                this.reservas[x].idEjemplar.idLibro.autor;
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusqueda.toUpperCase())>=0)
                        return true;
            else
                return false;  
        },
        
        cargarDatos: function(){
            //cargando las reservas
            axios.get('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/reservas/findAll')
                .then(function (res) {
                    vueDevoluciones.reservas=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },
        modificarReserva: function(){
            this.reservas[this.reservaSelected].estadoReserva==false;
           axios.put('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/reservas/',this.reservas[this.reservaSelected])
                .then(function (res) {
                    console.log("UPDATED RESERVA");
                     })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted:function(){
       this.cargarDatos();
    }, 
 });

var vueReservaciones= new Vue({
    el: "#AdminReservaciones",
    data: {
        textoBusqueda:"",
        usuarioSelect: 0,
        libroSelected: 0,
        reservaSelected: 0,
        libros: [],
        reservas:[],
        usuarios:[],
        nuevaReserva:{
            "idUsuario":{
                  "idUsuario":0 
              },
            "idEjemplar":{
                  "idEjemplar":0 
              },
            "idTipoFinalizacion":{
                  "idTipoFinalizacion":0 
              },
            "fechaReserva":"2107-01-23",
            "fechaFinalizacion":"2017-01-24",
            "estadoReserva": true,
            "fechaInicio":"2017-01-24",
        },
    },
    methods:{
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.reservas[x].idEjemplar.idLibro.titulo + 
                this.reservas[x].idUsuario.usuario +
                this.reservas[x].idEjemplar.idLibro.autor;
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusqueda.toUpperCase())>=0)
                        return true;
            else
                return false;  
        },
        
        mostrarAgregar:function(){        
            $('#modalAgregar-3').modal('show');
        },
        mostrarEliminar:function(){
            $('#modalEliminar-3').modal('show');
        },
        
        cargarDatos: function(){
            //cargando los usuarios
            axios.get('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/user/findAll')
                .then(function (res) {
                    vueReservaciones.usuarios=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
             //cargando los libros
            axios.get('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/libros/findAll')
                .then(function (res) {
                    vueReservaciones.libros=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            //cargando las reservas
            axios.get('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/reservas/findAll')
                .then(function (res) {
                    vueReservaciones.reservas=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },
        agregarReserva: function(){
            this.usuarioSelected=JSON.parse(localStorage.getItem("usuarioNo"));
            this.nuevaReserva.idUsuario.idUsuario=this.usuarios[this.usuarioSelected].idUsuario;
            this.nuevaReserva.idEjemplar.idEjemplar=2;
           axios.post('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/reservas/crear/',this.nuevaReserva)
                .then(function (res) {
                    vueReservaciones.nuevaReserva.idUsuario.idUsuario=0;
                    vueReservaciones.nuevaReserva.idEjemplar.idEjemplar=0;
                    vueReservaciones.cargarDatos();
                }).catch(function (error) {
                    console.log(error);
                });
        },
        eliminarReserva: function(){
            axios.delete('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/reservas/'+ this.reservas[this.reservaSelected].idReserva)
                .then(function (res) {
                    console.log("DELETE RESERVA");
                    vueReservaciones.cargarDatos();
                    //location. reload()
            })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted:function(){
       this.cargarDatos();
    }, 
 });