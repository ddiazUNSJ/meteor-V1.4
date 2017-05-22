//import { Accounts } from 'meteor/accounts-base'
// import {Meteor} from 'meteor/meteor';
// import {Session} from 'meteor/session';
// import {Router, RouteController} from 'meteor/iron:router';
// import { Mongo } from 'meteor/mongo';
// import { Email } from 'meteor/email';
// Options
AccountsTemplates.configure({

  //******************************************
    // Home default
    homeRoutePath: '/',

    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    enforceEmailVerification: true,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: false,
    //showTitle:false,
   // showDisplayName:true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,
  
    //Template configuration
      // defaultTemplate: 'Auth_page',
     defaultLayout: 'blankLayout',
      // defaultContentRegion: 'main',
      // defaultLayoutRegions: {}

    // Privacy Policy and Terms of Use
     //privacyUrl: 'privacy',
     //termsUrl: 'terms-of-use',
     // displayFormLabels: false,
     // formValidationFeedback: true,

//No muestra el titulo de atForm
    texts: {
      title: {
           signUp: "",signIn: "",
      }
    }
/*
El cambio de colores de los botones u otro elemento decorativo se hace en /stylesheets/globals/landing.import.less
Por ejemplo para cambiar el boton de registrarse en atForm en el estado signUp , lo que hice fue agregar la clase at-btn
como copia de la clase  .btn-primary, la cual tiene los atributos que necesito, no solo el color, la forma, color de fondo,etc,.
La informacion sobre el nombre de la clase la saque de
- packages/useraccounts_bootstrap
- https://github.com/meteor-useraccounts/core/blob/master/Guide.md#css-rules
- packages/useraccounts_core
-https://www.youtube.com/watch?v=X6EodWQBDG8

Se agrego
   //Pinta boton account de color boton de inspinia
  .at-btn {
    .btn;
    .btn-primary;
  }

*/
});



AccountsTemplates.addField({
    _id: 'nombre',
    type: 'text',
    placeholder: {
        signUp: "Como minimo 6 caracteres y no mas de 50 "
    },
    required: true,
    minLength: 3,
    maxLength:50,
    errStr: 'Debe ingresar un nombre entre 3 y 50 caracteres',
});




//**** Configuracion de cuentas de email

EmailConfig = {};

var EmailConfig;

Meteor.startup(function() {
 
  EmailConfig = {
    settings: {
      receiver: Meteor.settings && Meteor.settings.private && Meteor.settings.private.email && Meteor.settings.private.email.receiver || ''
    },
    hasValidStringProperty: function(property) {
      return _.isString(property) && !_.isEmpty(property)
    }  
   }

  this.EmailConfig = EmailConfig;

  if(Meteor.isServer) {
    console.log('preparando el setting de MAIL_URL');  
    console.log(  Meteor.settings.private.email.username );
    var email = {
      username: Meteor.settings && Meteor.settings.private && Meteor.settings.private.email && Meteor.settings.private.email.username || '',
      password: Meteor.settings && Meteor.settings.private && Meteor.settings.private.email && Meteor.settings.private.email.password || '',
      server: Meteor.settings && Meteor.settings.private && Meteor.settings.private.email && Meteor.settings.private.email.server || '',
      port: Meteor.settings && Meteor.settings.private && Meteor.settings.private.email && Meteor.settings.private.email.port || '',
    };      
    if(EmailConfig.hasValidStringProperty(email.username) && 
       EmailConfig.hasValidStringProperty(email.password) &&
       EmailConfig.hasValidStringProperty(email.server) &&
       EmailConfig.hasValidStringProperty(email.port)
      ) 
      { 
       console.log('seteando MAIL_URL');   
       process.env.MAIL_URL = 'smtp://' + encodeURIComponent(email.username) + ':' + encodeURIComponent(email.password) + '@' + encodeURIComponent(email.server) + ':' + email.port;
       } 
  



//*******************************
// configura mensajes de email

//mensajes para reset password 


          Accounts.emailTemplates.siteName = "IdeasEnTiempoReal";
          
          Accounts.emailTemplates.from = "IdeTR <inscripciones@rtideas.tk>";
          Accounts.emailTemplates.resetPassword.subject = function (usuario) {
              return "Solicitud de cambio de password ";
           };
          Accounts.emailTemplates.resetPassword.text = function (usuario, url) {
           var newUrl = url.replace('/#','');
           return "Hola,  muchas gracias por ponerte en contacto con el equipo del taller de Ideas en Tiempo Real. Has solicitado un cambio de password, simplemente "
           +" para efectuar el cambio hace click en el link que se muestra a continuación "
           + newUrl;
           };
          

//mensajes para registracion
           
          Accounts.emailTemplates.enrollAccount.subject = function (user) {
            return "Hola "+ user.profile.nombre+ " le damos la bienvenida a nuestro primer taller de impresion  3D " ;
            };
      Accounts.emailTemplates.enrollAccount.text = function (user, url) {
        var newUrl = url.replace('/#','');
       return "Antes que nada le agradecemos el interes por este taller. Le comunicamos que el cupo disponible "
        +"para el taller ha sido ampliamente superado. Este suceso nos llena de satisfaccion, debido a  este " 
        +"hecho hemos decidido agregar (3) tres instancias mas  del taller. Estas instancias seran dictadas "  
        +"con fecha tentativa en los meses de marzo-abril. Por lo tanto para mantenerle informado de las fechas "
        +"reales del dictado y de otras gestiones administrativas le hemos creado una cuenta en nuestro sitio web. "
        +"Para activar la misma, simplemente haga click en el link que se muestra a continuación "
        + newUrl;

      };

      //mensajes para registracion
          
          Accounts.emailTemplates.verifyEmail.subject = function (user) {

            return "Hola "+ user.profile.nombre+ " le damos la bienvenida a nuestro primer taller de impresion  3D " ;
            };
      Accounts.emailTemplates.verifyEmail.text = function (user, url) {
         var newUrl = url.replace('/#','');
       return "Antes que nada le agradecemos el interes por este taller. "
        +"Para activar la misma, simplemente haga click en el link que se muestra a continuación "
        + newUrl;

       };

     }//from ifServer
   });