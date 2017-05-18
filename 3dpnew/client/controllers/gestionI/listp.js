import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Router, RouteController} from 'meteor/iron:router';
import { Mongo } from 'meteor/mongo';

ListpController = RouteController.extend({
  yieldTemplates: {
    'HeadList': {to: 'Header'},
    'Footer': {to: 'Footer'}
  },    
  
  waitOn: function () { //},
 //Session.set('_tokenExist', "undefined");
   // var ver=this.lookupTemplate();

     return  Meteor.subscribe('users'); },

  data: function() {
                  
                // if(this.ready()){
                //   Session.set('_resetPasswordToken', this.params.token);
                //   return {enrolledUser: Meteor.users.findOne()};
                // }
  },

  action: function () {
    this.render();

  //  this.render();
   /* if (Session.get('_tokenExist')=="true")
     { 
       Meteor.logout();
       this.render();
       }   
     
     if (Session.get('_tokenExist')== "undefined")
     { 
       this.render('Loading');
     }
     if (Session.get('_tokenExist')=="false")
     {
        this.render('Header',{to: 'Header'}); // Muestra encabezado que incluye inicio de sesion
        this.render('Overview');
      //  this.next();
        }*/
   },
  /*onBeforeAction: function() {
                Meteor.logout();
                console.log("paso por onBeforeAction EnrollController");
                Session.set('_resetPasswordToken', this.params.token);
                 console.log("set _resetPasswordToken"); 
                this.subscribe('enrolledUser', this.params.token).wait();
                this.next();
       }*/
});
