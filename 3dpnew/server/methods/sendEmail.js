import { Accounts } from 'meteor/accounts-base';
import './accounts.js';
import { Email } from 'meteor/email'
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Mongo} from 'meteor/mongo';
import { check } from 'meteor/check';
import { Schema } from '/both/collections/inscripcion.js';

Meteor.methods({
 

   isEmailExisting: function(emailToCheck) {
    console.log("emailToCheck; " + emailToCheck );
     // var count = Meteor.users.find({'email': emailToCheck}).count();
      var count = Meteor.users.find({ emails: { $elemMatch: { address: emailToCheck} } }).count();
      console.log("Encontre " + count+ " emails");
      return count > 0;
   },

    userByEmail: function(emailToCheck) {
     // var count = Meteor.users.find({'email': emailToCheck}).count();
      var usuario = Meteor.users.find({ emails: { $elemMatch: { address: emailToCheck} } });
     
      return usuario._id;
   },
/*//Movi este metodo al cliente
// Pregunta si hay tramite de cambio de password para el usuario actual
  isTokenExist:function(tk) {
     // var count = Meteor.users.find({'email': emailToCheck}).count();
     // PARA CONSULTAR CON ROBOMONGO Meteor.users.find({"services.password.reset.token": "s9VsH-T4DHqY5pp_kf4QXS3q4UGEvItQWrK6aKeU6IE"}).count();
      var count =  Meteor.users.find({"services.password.reset.token": tk}).count();
      console.log("Hay  " + count+ " tramites abiertos");
      return count > 0;
   },*/
 
 // Funcion llamada desde el template "InscriForm", que se encuentra en la carpeta contact (que en realidad es donde esta el formulario de preinscripcion)  
  'preinscribe': function (inscriFields) {
    check(inscriFields, Schema.InscriSchema);

//    Pinscri.insert({nombre:inscriFields.nombre ,dni:inscriFields.dni,email:inscriFields.email, telefono:inscriFields.telefono,facultad:inscriFields.facultad })
// 
    this.unblock();
//
    var idUsuario =Accounts.createUser({
                email: inscriFields.email,
                   profile: {
                             nombre:inscriFields.nombre,
                             dni:inscriFields.dni,
                             telefono:inscriFields.telefono,
                             facultad:inscriFields.facultad }
                      });

     Roles.addUsersToRoles(idUsuario, ['preinscripto']);
     
     // Enviando email a nuestra cuenta de gmail con datos del inscripto para resguardo info
      Email.send({
      to: EmailConfig.settings.receiver, //Receiver
      from: inscriFields.email, //Sender
      subject: inscriFields.email + ' se ha pre-incripto al curso', //Subject
      text: "nombre: "+ inscriFields.nombre + "," +" dni: "+inscriFields.dni+ "," +" facultad: "+inscriFields.facultad//Message
    });    


     console.log("Usuario Creado"); 
    
       // Configurar templates de email
      Accounts.emailTemplates.siteName = "3DPrintingDay";
      
      Accounts.emailTemplates.from = "Inscripciones taller 3D <preinscripciones@3dprintingday.tk>";
      Accounts.emailTemplates.enrollAccount.subject = function (user) {
          return "Hola "+ user.profile.nombre+ " le damos la bienvenida a nuestro primer taller de impresion  3D " ;
      };
      Accounts.emailTemplates.enrollAccount.text = function (user, url) {
       return "Antes que nada le agradecemos el interes por este taller. Le comunicamos que el cupo disponible "
        +"para el taller ha sido ampliamente superado. Este suceso nos llena de satisfaccion, debido a  este " 
        +"hecho hemos decidido agregar (3) tres instancias mas  del taller. Estas instancias seran dictadas "  
        +"con fecha tentativa en los meses de marzo-abril. Por lo tanto para mantenerle informado de las fechas "
        +"reales del dictado y de otras gestiones administrativas le hemos creado una cuenta en nuestro sitio web. "
        +"Para activar la misma, simplemente haga click en el link que se muestra a continuación "
        + url;

      };
console.log("preparado para enviar url");// console.log(url); 
      //enviando email a usuario
     if (idUsuario) Accounts.sendEnrollmentEmail (idUsuario); 
     return idUsuario;
  },

'resetearPass': function (resetPassFields) {
    check(resetPassFields, Schema.ResetearPassword);

 
    this.unblock();
//
      //var username = Meteor.users.findOne(userId).username;
     var usuario = Meteor.users.findOne({ emails: { $elemMatch: { address: resetPassFields.email} } });
     var usuario2 = Meteor.users.findOne({ emails: { $elemMatch: { address: resetPassFields.email} } },{fields:{_id:1}});
    
     var idUsuario =usuario._id;
     // console.log("usuario"); 
     // console.log( usuario);
     //   console.log("usuario2"); 
     //  console.log( usuario2);
     //  console.log ("id de usuario2 ");
      console.log(usuario2._id);
     if (idUsuario !== null)
        {
         // console.log("Usuario Identificado"); 

          // Configurar templates de email
         
          Accounts.emailTemplates.siteName = "3DPrintingDay";
          
          Accounts.emailTemplates.from = "Taller 3D <preinscripciones@3dprintingday.tk>";
          Accounts.emailTemplates.resetPassword.subject = function (usuario) {
              return "Solicitud de cambio de password ";
           };
          Accounts.emailTemplates.resetPassword.text = function (usuario, url) {
           return "Hola "+ usuario.profile.nombre+ ", muchas gracias por ponerte en contacto con el equipo del taller de impresion  3D. Has solicitado un cambio de password, simplemente "
           +" para efectuar el cambio hace click en el link que se muestra a continuación "
           + url;
           };
          //enviando email a usuario
         if (idUsuario) Accounts.sendResetPasswordEmail(idUsuario); 
         console.log("Password enviado"); 
         return idUsuario;
       }
     else
       throw new Meteor.Error("No existe usuario",   "No hay usuario con el email" + resetPassFields.email);

  },
    
  'send2Email': function (inscriFields) {
    check(inscriFields, Schema.InscriSchema);

//    Pinscri.insert({nombre:inscriFields.nombre ,dni:inscriFields.dni,email:inscriFields.email, telefono:inscriFields.telefono,facultad:inscriFields.facultad })
// 
    this.unblock();
//
    Email.send({
      to: EmailConfig.settings.receiver, //Receiver
      from: inscriFields.email, //Sender
      subject: 'Email from ' + inscriFields.email + ' created by simple inscri form', //Subject
      text: inscriFields.nombre //Message
    });    
     Accounts.createUser({
                username :  inscriFields.userN, 
                nombre:inscriFields.nombre,
                dni:inscriFields.dni,
                telefono:inscriFields.telefono,
                facultad:inscriFields.facultad,
                email: inscriFields.email
                      });
/*

    process.env.MAIL_URL="smtp://tcrearinnovar@gmail.com:poneelpass@smtp.gmail.com:465/"; 
      console.log("configuracion gmail"); 
    Email.send({
      to: "yddiaz@gmail.com", //Receiver
      from: "tuyito@gmail.com", //Sender
      subject: "probando ", //Subject
      text: "mensaje de prueba"
    }); 
      */
      console.log("Enviado"); 
      
  }



});
