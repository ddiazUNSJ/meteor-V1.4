
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
    return Schemas.User;// Schema.InscriViewSchema;
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

