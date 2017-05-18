import './inscri.html';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Autoform} from 'meteor/aldeed:autoform';
import { Schema } from '/both/collections/inscripcion.js';
import { Meteor } from 'meteor/meteor';

Template.InscriForm.events(
{});
Template.InscriForm.helpers({
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
    inscriFormSchema: function() {
    return Schema.InscriSchema;
  }
});

/*****************************************************************************/
/* Contact: Lifecycle Hooks */
/*****************************************************************************/
Template.InscriForm.created = function () { 
};

Template.InscriForm.rendered = function () {
};

Template.InscriForm.destroyed = function () {
};
