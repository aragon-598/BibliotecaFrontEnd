var nombreUsuario = JSON.parse(localStorage.getItem("userName"));
var rolUsuario = JSON.parse(localStorage.getItem("userRol"));

//MOSTRAR NOMBRE DE USUARIO EN LA INTERFAZ
//parseInt(document.getElementById("variabl").value),
document.getElementById('nombreUsuario').innerText = nombreUsuario;

//BORRANDO LAS VARIABLES AL SALIR
document.getElementById("myBtn").onclick = function() {borrar()};
function borrar() {
    console.log("uno");
    localStorage.setItem("userName", JSON.stringify(""));
    localStorage.setItem("userRol", JSON.stringify(0));
    localStorage.setItem("encontrado", JSON.stringify(false));
     window.location = './login.html'
};

//METODO DE MOSTRAR ROL
$(document).ready(function(){
         if (rolUsuario ==1 ) {
                $('#puto').addClass('active');
                $('#puto').removeClass('disabled');
                $('#puto2').addClass('active');
                $('#puto2').removeClass('disabled');
            } else {
                $('#puto').addClass('disabled');
                $('#puto').removeClass('active'); 
                $('#puto2').addClass('disabled');
                $('#puto2').removeClass('active'); 
            }
    }); 
(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict
