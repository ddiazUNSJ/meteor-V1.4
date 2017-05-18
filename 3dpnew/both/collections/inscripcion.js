import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Meteor} from 'meteor/meteor';



export const Inscriptos = new Mongo.Collection('inscriptos');


export const Schema = {};

Schema.ResetearPassword=new SimpleSchema({
  email: {
      label: "Email",
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      max: 50, //Maximum allowed length of this field.
      custom: function() { //Custom method could be used to do a server side check, 
    //like below.
    //Here we’re making sure that this field is having a value and we want it to be      
     //validated on the client side only.
          if (Meteor.isClient && this.isSet) {
              console.log("verifica si existe un usuario con el email");
              console.log(this.value);
              Meteor.call("isEmailExisting", this.value, function (error, result) {
                 if (!result) {
                      console.log("No existe email, este email no existe en el sistema");   
                   //  Meteor.users.simpleSchema().namedContext("inscriForm").addInvalidKeys([{name: "email", type: "notUnique"}]);
   
              //         InscriSchema.simpleSchema().
                       Schema.ResetearPassword.namedContext("resetearForm").addInvalidKeys([{name: "email", type: "notRegisterEmail"}]);
                   //       Schema.InscriSchema.simpleSchema().namedContext("inscriForm").addInvalidKeys([{name: "email", type: "duplicateEmail"}]);
                       // return "notUnique";
                  }
              });
          }
      }
  }       
 });




  Schema.ResetearPassword .messages({

   notRegisterEmail: 'No existe ningun usuario registrado con este email, pre-inscribase!!',
   notUnique: 'Por favor use otro email, este ya esta registrado',
   
   minString: "[label] debe contener al menos [min] caracteres",
     maxString: "[label] no puede exceder los [max] caracteres",
    regEx: [
    {msg: "[label] failed regular expression validation"},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] debe ser un dirección de email valida"},
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
    {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
    {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
  ],
     keyNotInSchema: "[key] no esta permitido por el esquema"
 
});

// Adapatdo desde https://github.com/aldeed/meteor-collection2#attach-a-schema-to-meteorusers
// password: {
//       label: "Password",
//       type: String,
//       regEx: /^(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*$/
//   },

Schema.GimePassword=new SimpleSchema({
  

   password:{
        label: "Password",
        type: String,
        max: 50,
        min: 3},
  
   confirmPassword: {
       label: "Confirm Password",
       type: String,
       custom: function () {//Another usage of the custom function.
           if (this.value !== this.field('password').value) {
               console.log("password incorrrecto");   
//        Schema.InscriSchema.namedContext("GimePassword").addInvalidKeys([{name: "password", type: "passwordMismatch"}]);
               return "passwordMismatch";
           }
       }
   },
});

Schema.GimePassword.messages({

   passwordMismatch: 'Password no coinciden ingrese nuevamente',
     minString: "[label] debe contener al menos [min] caracteres",
     maxString: "[label] no puede exceder los [max] caracteres",
    regEx: [
    {msg: "[label] failed regular expression validation"},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] debe ser un dirección de email valida"},
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
    {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
    {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
  ],
     keyNotInSchema: "[key] no esta permitido por el esquema"
 
});

Schema.Login=new SimpleSchema({
  
    email: {
          label: "Email",
          type: String,
          regEx: SimpleSchema.RegEx.Email,
          max: 50, //Maximum allowed length of this field.
      }, 
    password:{
        label: "Password",
        type: String,
        max: 50,
        min: 3}
});
    

Schema.InscriSchema = new SimpleSchema({
  
  
  nombre: {
    type: String,
    max: 50,
    min: 3
  }, 
  dni: {
    type: String,
    max: 8,
    min: 7
        }, 
 
 email: {
      label: "Email",
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      max: 50, //Maximum allowed length of this field.
      custom: function() { //Custom method could be used to do a server side check, 
 //like below.
//Here we’re making sure that this field is having a value and we want it to be      
//validated on the client side only.
          if (Meteor.isClient && this.isSet) {
              console.log("verifica que el email es unico ");
              console.log(this.value);
              Meteor.call("isEmailExisting", this.value, function (error, result) {
                 if (result) {
                      console.log("Email duplicado, este email ya esta registrado");   
                   //  Meteor.users.simpleSchema().namedContext("inscriForm").addInvalidKeys([{name: "email", type: "notUnique"}]);
   
              //         InscriSchema.simpleSchema().
                       Schema.InscriSchema.namedContext("inscriForm").addInvalidKeys([{name: "email", type: "duplicateEmail"}]);
                   //       Schema.InscriSchema.simpleSchema().namedContext("inscriForm").addInvalidKeys([{name: "email", type: "duplicateEmail"}]);
                       // return "notUnique";
                  }
              });
          }
      }
  },       
 

  telefono: {
    type: String,
    max: 15,
    min: 7
   }, 
  facultad: {
       label: "Facultad a la que pertenece 1",
       type: String,
       allowedValues: ['FCEFyN', 'FAUD','FACSO', 'FFHA', 'FI' ]
        }
   
});

Schema.InscriSchema .messages({

   duplicateEmail: 'Este email ya esta registrado',
   notUnique: 'Por favor use otro email, este ya esta registrado',
   
   minString: "[label] debe contener al menos [min] caracteres",
     maxString: "[label] no puede exceder los [max] caracteres",
    regEx: [
    {msg: "[label] failed regular expression validation"},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] debe ser un dirección de email valida"},
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
    {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
    {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
  ],
     keyNotInSchema: "[key] no esta permitido por el esquema"
 
});

Schema.InscriViewSchema = new SimpleSchema({
  
  nombre: {
    type: String,
    max: 50,
    min: 3
  }, 
  dni: {
    type: String,
    max: 8,
    min: 7
        }, 
  telefono: {
    type: String,
    max: 15,
    min: 7
   }, 
  facultad: {
       label: "Facultad a la que pertenece 2",
       type: String,
       allowedValues: ['FCEFyN', 'FAUD','FACSO', 'FFHA', 'FI','EIDFS', 'ECLGSM','CCU' ]
        }
   
});




//adaptado desde https://github.com/aldeed/meteor-collection2
Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    
    createdAt: {
        type: Date
    },
    profile: {
        type:Schema.InscriViewSchema,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },// Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    },
    
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

//Inscriptos.attachSchema(Schema.User);
Meteor.users.attachSchema(Schema.User);

if (Meteor.isClient) {
Meteor.startup(function(){

 
 Session.set("preinscriOk", "false");
 Session.set("showDeleteUserDialog", "false");
  Session.set("showEditUserDialog", "false");
 Session.set("showInfoUserDialog", "false");

});
}

/*
// base de datos para preinscriptos

Pinscri = new Mongo.Collection("pinscri");


Pinscri.attachSchema(Schema.InscriSchema);
//Pinscri.insert({nombre:"prueba",dni:"4958361",email:"any@body.com", telefono:"4234545",facultad:"obrero 3D" })

if (Meteor.isClient) {
Meteor.subscribe("pinscri");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  Meteor.publish("pinscri", function () {
    return Pinscri.find();
   });
  });
 }

*/
/* 
if (Meteor.isClient) {
AutoForm.hooks({
  login2Form: {
       onSubmit: function(insertDoc, updateDoc, currentDoc) {
           console.log('success!');
           Meteor.loginWithPassword(insertDoc.email, insertDoc.password, function(err){
            if (err)
             {
               console.log(err);
               Router.go('errorlog');
              }
             else
             {
               console.log('success!');
               Router.go('overview') ;
              }
            });
             this.done();
             return false;
               
       },
       before: function () {
           //show loader
       },
       after: function() {
           //hide loader
       }
   },

 });


}*/
if (Meteor.isServer) {
  Meteor.startup(function () {
      
      
    Meteor.publish('enrolledUser', function(token) {
     return Meteor.users.find({"services.password.reset.token": token});
    });
  // Configurando pagina de recupero de password para reset password
   Accounts.urls.resetPassword =function (token) {
             return Meteor.absoluteUrl('accounts/enroll/' + token);
              };

    
  // Configurando pagina de recupero de password para preinscripcion
    Accounts.urls.enrollAccount = function (token) {
    return Meteor.absoluteUrl('accounts/enroll/' + token);
    };

  // publicar datos del user dependiendo de si el usuario e administrador 
    Meteor.publish("users", function () {
      console.log('entrando en publicacion de  usuarios ', this.userId);
      var user = Meteor.users.findOne({_id:this.userId});

     if (Roles.userIsInRole(user, ['admin','manage-users'])) {
       console.log('publicando usuarios ', this.userId)
       return Meteor.users.find({}, {fields: {createdAt: 1, emails: 1, profile: 1, roles: 1}});
     } 
     this.stop();
     return;
    });

      
   // Permitir modificar  no hace falta pues todos los datos estan en profile     
//    Meteor.users.allow({
//       update: function (userId, user) 
//                   {     
//                     return ( userId && userId === user._id); 
//                    }
//    });  
      
        }); // fin startup
 };

Meteor.methods({
// Pregunta si hay tramite de cambio de password para el usuario actual
  isTokenExist:function(tk) {
     // var count = Meteor.users.find({'email': emailToCheck}).count();
     // PARA CONSULTAR CON ROBOMONGO Meteor.users.find({"services.password.reset.token": "s9VsH-T4DHqY5pp_kf4QXS3q4UGEvItQWrK6aKeU6IE"}).count();
      var count =  Meteor.users.find({"services.password.reset.token": tk}).count();
      console.log("Hay  " + count+ " tramites abiertos");
      return count > 0;
   }
})

