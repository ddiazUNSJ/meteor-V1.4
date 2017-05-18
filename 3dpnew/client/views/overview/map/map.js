import './map.html';
/*****************************************************************************/
/* Map: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Map.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Map.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Map: Lifecycle Hooks */
/*****************************************************************************/
Template.Map.created = function () {
};

Template.Map.rendered = function () {
  var canvas = this.find('#map-canvas');

  var gmapStyles =   [{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "saturation": -100 },
      { "lightness": -8 },
      { "gamma": 1.18 }
    ]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      { "saturation": -100 },
      { "gamma": 1 },
      { "lightness": -24 }
    ]
  }, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      { "saturation": -100 }
    ]
  }, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },   {
    "featureType": "administrative",
    "stylers": [
      { "saturation": -100 }
    ]
  }, {
    "featureType": "transit",
    "stylers": [
      { "saturation": -100 }
    ]
  }, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "saturation": -100 }
    ]
  }, {
    "featureType": "road",
    "stylers": [
      { "saturation": -100 }
    ]
  }, {
    "featureType": "administrative",
    "stylers": [
      { "saturation": -100 }
    ]
  }, {
    "featureType": "landscape",
    "stylers": [
      { "saturation": -100 }
    ]
  }, {
    "featureType": "poi",
    "stylers": [
      { "saturation": -100 }
    ]
  }]  ;
//-31.541012, -68.576413
//-31.541135, -68.576343
//  var position = new google.maps.LatLng(51.048674, 13.749437);
var position = new google.maps.LatLng(-31.541135, -68.576343);
var positionM = new google.maps.LatLng(-31.537371, -68.574811);


  
  var mapOptions = {
    zoom: 14,
    scrollwheel: false,
    panControl: false,
    draggable: false,
    zoomControl: false,
    scaleControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: gmapStyles,
    center: positionM
  };   

  map = new google.maps.Map(canvas, mapOptions);

//  var pinColor = "F28C83";
// para mas pines ver https://developers.google.com/chart/image/docs/gallery/dynamic_icons
//https://developers.google.com/chart/image/docs/gallery/dynamic_icons#pins
// color de relleno y letra
  var pinColor = "FDE600|004999";


  var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor ,
                                             null,
                                             null,
                                             null,
                                             new google.maps.Size(31, 40)
      );  

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h2 id="firstHeading" class="firstHeading">Laboratorio de Informatica Aplicada al la Innovación</h2>'+
      '<div id="bodyContent">'+
      '<p><b>Country:</b> Argentina</p>'+
      '<p><b>City:</b> 5400 Rivadavia</p>'+
      '<p><b>Street:</b> Cereceto y Meglioli</p>'+
    //  https://www.google.com.ar/maps/@-31.5404572,-68.4404281,241m/data=!3m1!1e3?hl=es-419
     '<p><a href="//www.google.com.ar/maps/@-31.5404572,-68.4404281,241m/data=!3m1!1e3?hl=es-419" target="_blank">View on Google Maps</a></p>' +
 //        '<p><a href="https://www.google.de/maps/place/Zirkusstra%C3%9Fe+6,+01069+Dresden/@51.04876,13.74931,17z/data=!3m1!4b1!4m2!3m1!1s0x4709cf5b043a92dd:0x56738bbe6d8f3aec" target="_blank">View on Google Maps</a></p>' +
 
      '</div>';

//'"http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg"
  // InfoWindow content
 // var imagenes=Meteor.absoluteUrl('public/images/laboratorio.jpg') ;
 
  contentString = '<div id="iw-container">' +
                    '<div class="iw-title">Laboratorio de Informática Aplicada a la Innovación</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Historia</div>' +
                      '<img src="/images/laboratorio.jpg" alt="Vista exterior del laboratorio de informática aplicada a la innovación" height="115" width="83">' +
                      '<p>El Laboratorio fue creado en 2015, pertenece al Instituto de Informática de la Facultad de Ciencias Exactas, Fisicas y Naturales de la Universidad Nacional de San Juan. </p>' +
                      '<div class="iw-subTitle">Contactos</div>' +
                      '<p>Complejo Universitario Islas Malvinas<br> Cereceto y Megliol- Rivadavia - San Juan Argentina<br>'+
                      '<br>Phone. +54 264 4265101<br> e-mail: yddiaz@gmail.com </p>'+
                    '</div>' +
                    '<div class="iw-bottom-gradient"></div>' +
                  '</div>';    

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });  
  
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: pinImage
  });  
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

//*******
 // *
  // START INFOWINDOW CUSTOMIZE.
  // The google.maps.event.addListener() event expects
  // the creation of the infowindow HTML structure 'domready'
  // and before the opening of the infowindow, defined styles are applied.
  // *
  google.maps.event.addListener(infowindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
    var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Moves the infowindow 115px to the right.
    iwOuter.parent().parent().css({left: '115px'});

    // Moves the shadow of the arrow 76px to the left margin.
    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Moves the arrow 76px to the left margin.
    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }

    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
  });


//*************

  infowindow.open(map,marker);
};

Template.Map.destroyed = function () {
};


