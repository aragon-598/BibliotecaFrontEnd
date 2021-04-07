var vueLogin= new Vue({
    el: "#AdminLogin",
    data: {
        alerta:{
          titulo: "Error",
          mensaje:"Texto"
        },
        user:{
            nombre: "",
            paswword: "",
        },
        users:{},
        encontrado: false,
        userRol: 0,
        userSelect: 0,
        userName: "",
       
    },
   methods:{
        mostrarAlerta:function(titu,msg){
            this.alerta.titulo=titu;
            this.alerta.mensaje=msg;
           
            $("#miAlerta").show('fade');
            setTimeout(function(){
                $("#miAlerta").hide('fade');
            },3000);
            
        },
        login:function(){
            //Metodo para iniciar sesion
            this.cargarDatos();
            
            if (this.user.correo!="" && this.user.password !="") {
                //AQUI VA EL METODO 
                    for (var i = 0 in vueLogin.users) {
                        if(this.users[i].correo==this.user.correo && this.users[i].password==this.user.password ){
                            this.userName=" "+this.users[i].nombre +" "+ this.users[i].apellido ;
                            this.userRol=this.users[i].idRol.idRol;
                            this.encontrado=true;
                            this.userSelect=i;
                            break;
                            }
                    }
                    if(this.encontrado==true){
                        localStorage.setItem("userName", JSON.stringify(this.userName));
                        localStorage.setItem("userRol", JSON.stringify(this.userRol));
                        localStorage.setItem("encontradoLog", JSON.stringify(this.encontrado));
                        localStorage.setItem("usuarioNo", JSON.stringify(this.userSelect));
                        window.location = './index.html'
                    } 
                    else{
                        vueLogin.mostrarAlerta("Datos incorrectos","Por favor ingrese datos correctos!");
                    } 
                }
            else{
                 vueLogin.mostrarAlerta("Datos Vacios","Por favor complete los campos!");
            }
      
      },
        mostrarUsuarios: function(){
             this.cargarDatos();
            $('#myModal').modal('show');
        },
        cargarDatos: function(){
            //cargando los usuarios
            axios.get('https://biblioteca-web-app.herokuapp.com/BibliotecaWebApp-1.0-SNAPSHOT/resources/user/findAll')
                .then(function (res) {
                    vueLogin.users=res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            
        },
    },
 });