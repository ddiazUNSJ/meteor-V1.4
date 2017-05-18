import './fdatos.html';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Autoform} from 'meteor/aldeed:autoform';
import { Schema } from '/both/collections/inscripcion.js';
import { Meteor } from 'meteor/meteor';




Template.DatosForm.events(
{});
Template.DatosForm.helpers({
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
    DatosFormSchema: function() {
    return Schema.User;// Schema.InscriViewSchema;
  },
    
    
});

/*****************************************************************************/
/* Contact: Lifecycle Hooks */
/*****************************************************************************/
Template.DatosForm.created = function () { 
};

Template.DatosForm.rendered = function () {
};

Template.DatosForm.destroyed = function () {
};

