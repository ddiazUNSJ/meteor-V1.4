import './overlog.html';
/*****************************************************************************/
/* Overview: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Overlog.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Overlog.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Overview: Lifecycle Hooks */
/*****************************************************************************/
Template.Overlog.created = function () {
};

Template.Overlog.rendered = function () {
  $('.waypoint').waypoint(function() {
    $(this).addClass('show');
  }, {offset:'80%'});  
};

Template.Overlog.destroyed = function () {
};


