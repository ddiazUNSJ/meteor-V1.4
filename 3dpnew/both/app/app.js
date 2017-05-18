import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Router, RouteController} from 'meteor/iron:router';
import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email';
/*****************************************************************************/
/* App: The Global Application Namespace */
/*****************************************************************************/
App = {};

if(Meteor.isServer) {
  process.argv = _.without(process.argv, '--keepalive');
  Meteor.startup(function () { console.log("LISTENING"); });
}


/*****************************************************************************/
/* Config: Configuration of details of app */
/* disqus_shortname: your disqus name if not set no disqus is rendered */
/*****************************************************************************/
var Config;

Config = {
  settings: {
    //##### Disqus
    // disqus_shortname : Meteor.settings && Meteor.settings.public && Meteor.settings.public.disqus && Meteor.settings.public.disqus.disqus_shortname || '',
    
    //##### AWS
    // bucket_images_name: Meteor.settings && Meteor.settings.private && Meteor.settings.private.aws && Meteor.settings.private.aws.bucket_images_name || '',
    // bucket_images_region: Meteor.settings && Meteor.settings.private && Meteor.settings.private.aws && Meteor.settings.private.aws.bucket_images_region || '',
    // bucket_thumbs_name: Meteor.settings && Meteor.settings.private && Meteor.settings.private.aws && Meteor.settings.private.aws.bucket_thumbs_name || '',
    // bucket_thumbs_region:  Meteor.settings && Meteor.settings.private && Meteor.settings.private.aws && Meteor.settings.private.aws.bucket_thumbs_region || '',
    
    //##### ADMIN
    //name: Meteor.settings && Meteor.settings.private && Meteor.settings.private.admin && Meteor.settings.private.admin.name || '',
    //username: Meteor.settings && Meteor.settings.private && Meteor.settings.private.admin && Meteor.settings.private.admin.username || '',
    //email: Meteor.settings && Meteor.settings.private && Meteor.settings.private.admin && Meteor.settings.private.admin.email || '',
    //password: Meteor.settings && Meteor.settings.private && Meteor.settings.private.admin && Meteor.settings.private.admin.password || '',
    
    
    //##### Google Analytics
    //See https://github.com/reywood/meteor-iron-router-ga/blob/master/lib/ga.js
  },
  hasValidStringProperty: function(property) {
    return _.isString(property) && !_.isEmpty(property)
  }  
}

this.Config = Config;


if(Meteor.isServer) {
  
  var aws = {
    // aws_access_key_id : Meteor.settings && Meteor.settings.private && Meteor.settings.private.aws && Meteor.settings.private.aws.aws_access_key_id || '',
    // aws_secret_access_key : Meteor.settings && Meteor.settings.private && Meteor.settings.private.aws && Meteor.settings.private.aws.aws_secret_access_key || ''
  };
  
  if(Config.hasValidStringProperty(aws.aws_access_key_id) &&
     Config.hasValidStringProperty(aws.aws_secret_access_key)) {
    
    // delete process.env.AWS_ACCESS_KEY_ID;
    // delete process.env.AWS_SECRET_ACCESS_KEY;
    
    // process.env.AWS_ACCESS_KEY_ID = aws.aws_access_key_id;
    // process.env.AWS_SECRET_ACCESS_KEY = aws.aws_secret_access_key;  
  }
}

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
      ) {    
      process.env.MAIL_URL = 'smtp://' + encodeURIComponent(email.username) + ':' + encodeURIComponent(email.password) + '@' + encodeURIComponent(email.server) + ':' + email.port;
    } 

   // Crea Administrador
 


   var id;
      
      console.log('Creando administrador');

  // Si usuario ya existe emitir mensaje que existe
  try {
          id= Accounts.createUser({
              username: "ddiaz",
              password: "1234",
              email:"yddiaz@gmail.com",
              profile: {
                             nombre:'Daniel',
                             dni:'00000001',
                             telefono:'999999999',
                             facultad:'FCEFyN' }
                      });
              
            
           Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});
          if (id!==null) 
            {
             console.log('Usuario creado¡¡¡, creando rol admin')  
             Roles.addUsersToRoles(id, ['admin']);
             }
       }
  catch (e) { console.log (e.reason);  }

          // if (id!==null) 
          //   {
          //    console.log('Usuario creado¡¡¡, creando rol admin')  
          //    Roles.addUsersToRoles(id, ['admin']);
          //  }

          //  else  console.log('Error , rol no admin no creado');




  }
});

