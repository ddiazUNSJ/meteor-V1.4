import './login.html';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
/*****************************************************************************/
/* Login: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Login.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   
  'click #logout': function(event, template) {
    event.preventDefault();
    
    Meteor.logout();
    Session.set('userOk', false);
    Router.go('/');
  },
//  'click #register': function(event, template) {
//    event.preventDefault();
//       
//    Router.go('register');
//  },
  
  /*
  'submit form': function(event, template) {
    event.preventDefault();
    
    var inputName = $(event.target).find('#inputName').val().trim();
    var inputPassword = $(event.target).find('#inputPassword').val().trim();
    
    Meteor.loginWithPassword(inputName, inputPassword, function(err){
      //Router.go('about');
   // Router.go('errorlog');
    if (err){
       console.log(err);
       Router.go('errorlog');
     }
     else
     {
       console.log('success!');
//  Router.go('overlog') ;
       Router.go('overview') ;

     }
     Session.set('userOk', true)
     
    });
    
  }  
  */


});


Template.Login.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Login: Lifecycle Hooks */
/*****************************************************************************/
Template.Login.created = function () {
};

Template.Login.rendered = function () {
};

Template.Login.destroyed = function () {
};


