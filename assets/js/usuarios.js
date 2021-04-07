var vueUsuarios= new Vue({
    el: "#AdminUsuarios",
    data:{
        alerta:{
            titulo:"Error",
            mensale:"Texto",
    },
        textoBusqueda:"",
        usuarioSelected: 0,
        usuarios:[], 
        nuevoUsuario:   {
            "apellido":"",
            "correo": "",
            "idDireccion":{
                "calle":"",
                "ciudad":"",
                "codigoPostal":"",
                "numCasa":"",
            },
            
             "idRol":{
                  "idRol": 1 
              },

             "idEstado":{
                  "idEstado": 1
              },
            
            "nombre": "",
            "password": "",
          }

    },
    methods:{
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.usuarios[x].nombre + 
                this.usuarios[x].apellido +
                this.usuarios[x].correo+
                this.usuarios[x].idDireccion.calle+
                this.usuarios[x].idDireccion.codigoPostal+
                this.usuarios[x].idDireccion.ciudad+
                this.usuarios[x].idDireccion.numCasa+
                this.usuarios[x].idRol.rol+
                this.usuarios[x].idEstado.estado;
               
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
            },5000);
            
        },
        cerrarAlerta:function(){
            $('#miAlerta').hide('fade');
        },
     
        cargarDatos: function(){
            //cargando los usuarios
            axios.get('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/user/findAll')
                .then(function (res) {
                    vueUsuarios.usuarios=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            
        },
        
        agregarUsuario:function(){
           axios.post('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/user/crear/',this.nuevoUsuario)
                .then(function (res) {
                    vueUsuarios.nuevoUsuario.apellido="";
                    vueUsuarios.nuevoUsuario.idDireccion.calle="";
                    vueUsuarios.nuevoUsuario.idDireccion.ciudad="";
                    vueUsuarios.nuevoUsuario.idDireccion.codigoPostal="";
                    vueUsuarios.nuevoUsuario.idDireccion.numCasa="";
                    vueUsuarios.nuevoUsuario.idEstado.idEstado=0;
                    vueUsuarios.nuevoUsuario.idRol.idRol=0;
                    vueUsuarios.nuevoUsuario.Nombre="";
                    vueUsuarios.nuevoUsuario.password="";
                    
                    vueUsuarios.cargarDatos();
                    vueUsuarios.mostrarAlerta("Usuario Agregado","Se agregó un nuevo usuario");
                }).catch(function (error) {
                    vueUsuarios.mostrarAlerta("Error",error);
                    console.log(error);
                });
        },
        
            modificarUsuario:function(){
            axios.put('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/user/',this.usuarios[this.usuarioSelected])
                .then(function (res) {
                    console.log("UPDATED LIBRO");
                    vueUsuarios.mostrarAlerta("Usuario Modificado","Se modifico el usuario satisfactoriamente");
                })
                .catch(function (error) {
                    vueUsuario.mostrarAlerta("Error",error);
                    console.log(error);
                });
        },
        
            eliminarUsuario:function(){
            console.log();
            axios.delete('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/user/'+ this.usuarios[this.usuarioSelected].idUsuario)
                .then(function (res) {
                    console.log("DELETE USUARIO");  
                    vueUsuarios.cargarDatos();
                    vueUsuarios.mostrarAlerta("Usuario Eliminado","El Usuario se eliminó de la base de datos");
                })
                .catch(function (error) {
                    vueUsuarios.mostrarAlerta("Error:",error);
                    console.log(error);
                });
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
        mostrarAgregarDireccion:function(){
            $('#modalAgregarDireccion').modal('show');
        },
        mostrarModificarDireccion:function(){
            $('#modalModificarDireccion').modal('show');
        },
        mostrarPrevia:function(){
            $('#modalPrevia').modal('show');
        },
    },
    
        
   mounted:function(){
       this.cargarDatos();
    }, 
});