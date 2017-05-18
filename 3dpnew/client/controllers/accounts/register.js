import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Router, RouteController} from 'meteor/iron:router';

RegisterController = RouteController.extend({
  yieldTemplates: {
    'Headlog': {to: 'Header'},
    'Footer': {to: 'Footer'}
  },    
  
  
  waitOn: function () {
  },

  data: function () {
  },

  action: function () {
    this.render('Register');
    
  },
  
  onBeforeAction: function() {
     this.next();
  },
     
});
