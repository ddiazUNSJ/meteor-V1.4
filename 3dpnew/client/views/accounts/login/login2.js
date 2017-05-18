import './login2.html';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Autoform} from 'meteor/aldeed:autoform';
import { Schema } from '/both/collections/inscripcion.js';
import { Meteor } from 'meteor/meteor';

Template.Login2Form.events(
{});
Template.Login2Form.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  formCss : function() {
    if(this.class) {
      return this.class
    }else {
      return "";
    }
  },
    Login2FormSchema: function() {
    return Schema.Login;
  },
    
    
});

/*****************************************************************************/
/* Contact: Lifecycle Hooks */
/*****************************************************************************/
Template.Login2Form.created = function () { 
};

Template.Login2Form.rendered = function () {
};

Template.Login2Form.destroyed = function () {
};

