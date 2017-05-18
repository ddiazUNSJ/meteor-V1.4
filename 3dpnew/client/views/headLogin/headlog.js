import './headlog.html';
import {Router} from 'meteor/iron:router';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
/*****************************************************************************/
/* HeadLog: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.HeadLog.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  
});

Template.HeadLog.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  activeIfTemplateIs: function (template) {
    var currentRoute = Router.current();
    return currentRoute && template === currentRoute.lookupTemplate() ? 'active' : '';
  }  
});


/*****************************************************************************/
/* HeadLog: Lifecycle Hooks */
/*****************************************************************************/
Template.HeadLog.created = function () {
};

Template.HeadLog.rendered = function () {
};

Template.HeadLog.destroyed = function () {
};


