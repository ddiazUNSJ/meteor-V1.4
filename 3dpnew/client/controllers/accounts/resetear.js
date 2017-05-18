import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Router, RouteController} from 'meteor/iron:router';


ResetearController = RouteController.extend({
  yieldTemplates: {
    'HeadLog': {to: 'Header'},
    'Footer': {to: 'Footer'}
  },    
  
  waitOn: function () {
  },

  data: function () {
  },

  action: function () {
    this.render();
  },
  onBeforeAction: function() {
     this.next();
     
  }
});
