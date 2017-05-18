import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Router, RouteController} from 'meteor/iron:router';

OverviewController = RouteController.extend({
  yieldTemplates: {
    'Header': {to: 'Header'},
    'Footer': {to: 'Footer'}
  },   
  
  waitOn: function () {
  },

  data: function () {
  },

  action: function () {
       var hashValue = this.params.hash;
       var _idValue = this.params._id;
      this.render();
    },

  onBeforeAction: function() {
//     Session.setDefault('contactFormButtonMessage', 'Send Message');
//     Session.setDefault('contactNameError', null);
//     Session.setDefault('contactEmailError', null);
//     Session.setDefault('contactMessageError', null);   
     this.next();
  },
  
  onAfterAction: function () {
    // now this is important : Deps.afterFlush ensures that iron-router rendering
    // process has finished inserting the current route template into DOM so we
    // can manipulate it via jQuery, if you skip this part the HTML element you
    // want to scroll to might not yet be present in the DOM (this is probably
    // why your code fails in the first place)    

    /*
    Does not work with new ironrouter version with meteor v1
    Iron:router automatically jumps to hash
    
    if (this.params.hash) {
      Deps.afterFlush(_.bind(function() {
        var scrollTop = $("#" + this.params.hash).offset().top;
        $("html,body").animate({
          scrollTop: scrollTop
        });
      }, this));
    }
    */
  }
});