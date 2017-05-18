import './resetF.html';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Autoform} from 'meteor/aldeed:autoform';
import { Schema } from '/both/collections/inscripcion.js';
import { Meteor } from 'meteor/meteor';

Template.RForm.events(
{});
Template.RForm.helpers({
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
    resetearFormSchema: function() {
    return  Schema.ResetearPassword;//Schema.ResetearPassword;
  }
  ,
    inscriFormSchema: function() {
    return Schema.InscriSchema;
  }
    
    
});

/*****************************************************************************/
/* Contact: Lifecycle Hooks */
/*****************************************************************************/
Template.RForm.created = function () { 
};

Template.RForm.rendered = function () {
};

Template.RForm.destroyed = function () {
};

