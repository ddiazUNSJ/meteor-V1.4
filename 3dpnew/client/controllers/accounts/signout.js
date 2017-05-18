import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Router, RouteController} from 'meteor/iron:router';

SignoutController = RouteController.extend({
  yieldTemplates: {
    'Header': {to: 'Header'},
    'Footer': {to: 'Footer'}
  },    
  
  waitOn: function () {
  },

  data: function () {
  },

  action: function () {
    this.render();
    //  this.render('Overview').data();
  //    this.redirect('Overview');
      
  },
  onBeforeAction: function() {
    Meteor.logout();
//     sweetAlert('Usuario Desconectado !!', ', Haga click para continuar',  'success');
     this.next();
     
  }
});
