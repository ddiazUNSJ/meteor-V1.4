import './headlist.html';
import {Router, RouteController} from 'meteor/iron:router';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';

/*****************************************************************************/
/* HeadLog: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.HeadList.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  
});

Template.HeadList.helpers({
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
Template.HeadList.created = function () {
};

Template.HeadList.rendered = function () {
};

Template.HeadList.destroyed = function () {
};


