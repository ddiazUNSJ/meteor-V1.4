import {Router, RouteController} from 'meteor/iron:router';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import { Mongo } from 'meteor/mongo';

Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase',
  trackPageView: true
});

Router._scrollToHash = function(hash) {
  var section = $(hash);
  if (section.length) {
    var sectionTop = section.offset().top;
    $("html, body").animate({
      scrollTop: sectionTop
    }, "slow");
  }
};



beforeHooks = {

 isPasswordEntry: function() {
               console.log("paso por onBeforeAction EnrollController");
              // Session.set('_resetPasswordToken', this.params.token);
              
//               pASO QUE HEMOS REALIZADO, PRUEBAS
//               1) PASAMOS METODO A CLIENTE, MISMO PROBLEMA DE ASINCRONISMO NO ENTREGA EL DATO 
//               2) PREGUNTAMOS DIRECTAMETE aQUI , MUESTRA PAGINA QUE ENROLL EN VEZ DE OVERVIEW
//               3) eN ACTION DEL CONTROLLER ASTERISQUIE EL RENDER DE ESTA PAGINA, APARENTEMENTE FUNCA
               if (this.ready())
                {
                   //var result=Meteor.call("isTokenExist", this.params.token);
                 /* Meteor.call("isTokenExist", this.params.token, function (error, result){
                  // Ojo aqui el scope es diferente this.render("xx"), no exite al igual que this.params.token
                  // por eso saco todo la variable de session _resetPasswordToken afuera y alli resuelvo
                 */
                    //var _tokenExist=isTokenExist(this.params.token);
                   // var _tokenExist=Meteor.call("isTokenExist", this.params.token);
                      var count =  Meteor.users.find({"services.password.reset.token": this.params.token}).count();
      
               //  if (_tokenExist) 
                    if(count>0)
                    {
                      Meteor.logout();
                  //    Router.current().next();
                        this.render()
                    }
                     else
                   {
                      
                     this.render('HeadLog',{to: 'Header'}); // Muestra encabezado que incluye inicio de sesion
                     this.render('Errorenroll');
                      //this.next();
                      }
                //  });
                };
                  
                 this.next();
            }, 

 isLoggedIn: function(){

if (! Meteor.user()  ) {  //usuario no logeado
    
    if (Meteor.loggingIn()) { // usuario no logeado pero logeandose ahora
      this.render('Loading');
      }
    else //
        
    {
       var ver=this.lookupTemplate();
       if(ver=="Enroll"){
        console.log("enroll detectada en isLoggedIn");
          }
        
       // if(ver=="Enroll")
       // {
       //   this.render('HeadLog',{to: 'Header'});    
       //   this.render(ver);
       // }
       if (ver=="ErrorReg" ||ver=="Errorlog" || ver=="Register" || ver=="Login"|| ver=="Errorenroll"  || ver=="Resetear"  )
        {
         this.render('HeadLog',{to: 'Header'});    
         this.render(ver);
          }
       else 
        {
        this.render('Header',{to: 'Header'}); // Muestra encabezado que incluye inicio de sesion
       // this.redirect('overview');
            this.render('Overview');
            Session.set('firstLogin', true);
            this.next();
            
       //  this.render('Login');
            
         }
     // this.render('Footer',{to: 'Footer'});
     
      }
    
  } else { //usuario logeado
      
    if(Session.equals('firstLogin', true)) 
    {
      this.redirect('overview');
      Session.set('firstLogin', false);
      } 
      else 
      {
       this.next();
       }
   // this.next();
  }


}

};
//******************************************
// Tienes que loguearte para acceder a la pagina
/*
beforeHooks = {
 isLoggedIn: function(){

if (! Meteor.user()  ) {
    if (Meteor.loggingIn()) {
      this.render('Loading');
    } else {
      this.render('HeadLog',{to: 'Header'}); // Muestra encabezado para Login
      var ver=this.lookupTemplate();
     
       if (ver=="Errorlog" || ver=="Register" || ver=="Signout" )
        {
         this.render(ver);
          }

       else 
        {
      this.render('Login');
         }
      this.render('Footer',{to: 'Footer'});
      Session.set('firstLogin', true);
    }
  } else {
    if(Session.equals('firstLogin', true)) {
      this.redirect('overview');
      Session.set('firstLogin', false);
    } else {
      this.next();
    }
   // this.next();
  }


}

};
*/


 Router.onBeforeAction(beforeHooks.isLoggedIn);
 //Router.onBeforeAction(beforeHooks.isLoggedIn, {only: ['about']});
Router.onBeforeAction(beforeHooks.isPasswordEntry, {only: ['enroll']});





Router.map(function () {


  // this.route('overview', { 
  //   path: '/:_id',
  //   action: function () {
  //     var hashValue = this.params.hash;
  //     var _idValue = this.params._id;
  //   }
  // });
  this.route('overview', {path: '/'});
  this.route('register', {path: '/accounts/register'});
  this.route('login', {path: '/accounts/login'});
  this.route('errorlog', {path: '/shared/errorlog'});
  this.route('signout', {path: '/signout'});
  this.route('overlog', {path: '/overlog'});
//  this.route('enroll', {path: '/accounts/enroll/:token'});
  this.route('errorenroll', {path: '/shared/errorenrroll'});
this.route('enroll', {path: '/accounts/enroll/:token'});
 this.route('resetear', {path: '/accounts/resetear'});
 this.route('listp',{path:'/gestionI/listp'});
 this.route('selpreinscri',{path:'gestionI/selpreinscri/selpreinscri'});
});


// this.route('signout', {
//     path: '/signout',
//     onBeforeAction: Meteor.logout
//   });

// onBeforeAction: function() {
//     //Session.setDefault('contactFormButtonMessage', 'Send Message');
//     Session.setDefault('contactNameError', null);
//     Session.setDefault('contactEmailError', null);
//     Session.setDefault('contactMessageError', null);   
//     this.next();
//   },

/*if (! Meteor.userId()) {
  this.render('HeadLog',{to: 'Header'});
  this.render('Login');
  this.render('Footer',{to: 'Footer'});
 
  } else {
    this.next();
  }
*/


/*var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render('Loading');
    } else {
      this.render('HeadLog',{to: 'Header'});
      this.render('Login');
      this.render('Footer',{to: 'Footer'});
      Session.set('firstLogin', true);
    }
  } else {
    if(Session.equals('firstLogin', true)) {
      this.redirect('register');
      Session.set('firstLogin', false);
    } else {
      this.next();
    }
  }
}*/

/*A route's name is now accessible at route.getName() (previously it was route.name). 
In particular, you'll need to write Router.current().route.getName().*/

