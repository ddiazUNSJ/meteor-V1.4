import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Router, RouteController} from 'meteor/iron:router';
import { Mongo } from 'meteor/mongo';
import {Autoform} from 'meteor/aldeed:autoform';
import  '/client/views/gestionI/common/useradmin-collections.js';

// var enrollFHook = {
//    before: {
//     // Replace `formType` with the form `type` attribute to which this hook applies
//     normal: function(doc) {
//       // Potentially alter the doc
//      // doc.foo = 'bar';

//       // Then return it or pass it to this.result()
//       return doc; //(synchronous)
//       //return false; (synchronous, cancel)
//       //this.result(doc); (asynchronous)
//       //this.result(false); (asynchronous, cancel)
//     }
//   },

//   // The same as the callbacks you would normally provide when calling
//   // collection.insert, collection.update, or Meteor.call
//   after: {
//     // Replace `formType` with the form `type` attribute to which this hook applies
//     normal: function(error, result) {}
//   },

//   // Called when form does not have a `type` attribute
//   onSubmit: function(insertDoc, updateDoc, currentDoc) {


//   	           console.log('usuario activado!');
// //              var token=Session.get('_resetPasswordToken');
// //              Accounts.resetPassword(token, insertDoc.password, function(err){
// //              if (err){
// //                console.log(err);
// //                Session.set('_tokenInvalido',err.reason );
// //                Router.go('errorenroll');
// //                }
// //              else
// //               {
// //                Accounts.setUsername(Meteor.userId(), inputUserName);   
// //                Session.set('_tokenInvalido',"" );
// //                console.log('usuario activado!');
// //                Router.go('overview') ;
// //                }
// //              Session.set('userOk', true)
// //               });
//              this.done();
//           //   return false;
//     // You must call this.done()!
//     //this.done(); // submitted successfully, call onSuccess
//     //this.done(new Error('foo')); // failed to submit, call onError with the provided error
//     //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
//   },

//   // Called when any submit operation succeeds
//   onSuccess: function(formType, result) {
//   	 console.log('ok todo bien');
//   },

//   // Called when any submit operation fails
//   onError: function(formType, error) {
//   	 console.log('error en entrada de password');
//   },

//   // Called every time an insert or typeless form
//   // is revalidated, which can be often if keyup
//   // validation is used.
//   formToDoc: function(doc) {
//     // alter doc
//     // return doc;
//   },

//   // Called every time an update or typeless form
//   // is revalidated, which can be often if keyup
//   // validation is used.
//   formToModifier: function(modifier) {
//     // alter modifier
//     // return modifier;
//   },

//   // Called whenever `doc` attribute reactively changes, before values
//   // are set in the form fields.
//   docToForm: function(doc, ss) {},

//   // Called at the beginning and end of submission, respectively.
//   // This is the place to disable/enable buttons or the form,
//   // show/hide a "Please wait" message, etc. If these hooks are
//   // not defined, then by default the submit button is disabled
//   // during submission.
//   beginSubmit: function() {},
//   endSubmit: function() {}
// };

AutoForm.hooks({
 inscriForm:{
     onSuccess: function(update, result) {
   	 console.log('ok con pre-inscripcion');
     sweetAlert('Pre-inscripcion realizada!!', ', Haga click para continuar',  'success');
         Session.set('preinscriOk', 'true');
    // Router.go('overview') ;  
       Router.current().render('overview').data();
     //  Router.go('overview', {hash: 'about'});
   //    Router.go('overview') ;  
   //    Router.go('overview') ;  
       
       }  
     },
  datosForm:{
//     before: {
//      // Replace `formType` with the form `type` attribute to which this hook applies
//      update: function(doc) {
//      // Potentially alter the doc
//      
//      var usuario= Meteor.users.findOne(doc);
//          
//      if (usuario!==null){
//         doc.nombre = 'usuario.profile.nombre';
//         doc.dni='usuario.profile.dni';
//         doc.email='dato no disponible';
//         doc.telefono='usuario.profile.telefono';
//         doc.ocupacion='dato no disponible';
//         }
//       else  
//         {
//         doc.nombre = 'dato no disponible';
//         doc.dni='dato no disponible';
//         doc.email='dato no disponible';
//         doc.telefono='dato no disponible';
//         doc.ocupacion='dato no disponible';
//         }
//      // Then return it or pass it to this.result()
//      //return doc; (synchronous)
//      //return false; (synchronous, cancel)
//      //this.result(doc); (asynchronous)
//      //this.result(false); (asynchronous, cancel)
//       return usuario;
//      }
//    },
   // Called when any submit operation succeeds
   onSuccess: function(update, result) {
   	 console.log('ok todo bien');
     sweetAlert('Datos Actualizados !!!', ', Haga click para continuar',  'success');
    // Router.go('overview') ;  
       Router.current().render('overview').data();
     //  Router.go('overview', {hash: 'about'});
   //    Router.go('overview') ;  
   //    Router.go('overview') ;  
       
   }

},

  login2Form: {
       onSubmit: function(insertDoc, updateDoc, currentDoc) {
           console.log('success!');
           Meteor.loginWithPassword(insertDoc.email, insertDoc.password, function(err){
            if (err)
             { 
             	switch (err.reason) {
                  case "Incorrect password":
                     console.log("Incorrect password");
                     sweetAlert('Password incorrecto !!!', ', Intente nuevamente!',  'error');
                     break;
                  case "User has no password set":
                     sweetAlert('Usuario sin password ', 'Revise su email o vaya a la sección perdi mi password ',  'error');
                     break;
                  case "User not found":
                     console.log(err);
                     Router.go('errorlog');
                     break;
                  }//fin switch
              }
             else
             {
               console.log('success!');
                //Si el que se ha logeado es admin suscribe name y email address de todoslos usuarios
                var filtro=Session.get("userFilter");
                var perPage=Session.get("usersPerPage");
                var usePage=Session.get("userPage");
               Meteor.subscribe("appUsers",filtro, perPage, usePage);
               // suscribe todos los roles disponibles
               Meteor.subscribe("allRoles");
               Router.go('overview') ;
              }
            });
             this.done();
             return false;
               
       },
           onError: function(normal, error) {
          console.log('error en entrada de password');
          }
     
   },

  enrollFH: 

  	 {
       onSubmit: function(insertDoc, updateDoc, currentDoc) {
               console.log('usuario activado!');
             var token=Session.get('_resetPasswordToken');
             Accounts.resetPassword(token, insertDoc.password, function(err){
             if (err){
               console.log(err);
               Session.set('_tokenInvalido',err.reason );
               Router.go('errorenroll');
               }
             else
              {
               Accounts.setUsername(Meteor.userId(), inputUserName);   
               Session.set('_tokenInvalido',"" );
               console.log('usuario activado!');
               Router.go('overview') ;
               }
             Session.set('userOk', true)
              });
             this.done();
             return false;
               
       },
      onError: function(normal, error) {
          console.log('error en entrada de password');
 /*     if (typeof error.reason === 'string') {
        if (error.reason.indexOf('passwordMismatch') !== -1) {
          this.addStickyValidationError('GimePassword.confirmPassword', 'passwordMismatch');
          AutoForm.validateField(this.formId, 'GimePassword.confirmPassword');
        }
      }*/
    }
     }
   });  
//AutoForm.addHooks('enrollFH', enrollFHook, true);