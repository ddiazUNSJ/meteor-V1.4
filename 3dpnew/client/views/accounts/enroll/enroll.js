import './enroll.html';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
/*****************************************************************************/
/* Enroll: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Enroll.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  /*
    'click #logout': function(event, template) {
    event.preventDefault();
    
    Meteor.logout();
    Router.go('/');
  }
    
  'click #register': function(event, template) {
    event.preventDefault();
       
    Router.go('register');
  },
  
  'submit form': function(event, template) {
    event.preventDefault();
     var inputUserName = $(event.target).find('#inputUserName').val().trim();
     var inputPassword = $(event.target).find('#inputPassword').val().trim();
    
    var token=Session.get('_resetPasswordToken');
   
   Accounts.resetPassword(token, inputPassword, function(err){
      if (err){
        console.log(err);
        Session.set('_tokenInvalido',err.reason );
        Router.go('errorenroll');
        }
      else
       {
        Accounts.setUsername(Meteor.userId(), inputUserName);   
        Session.set('_tokenInvalido',"" );
        console.log('success!');
        Router.go('overview') ;
        }
      Session.set('userOk', true)
       });
    
    } 
    */


});


Template.Enroll.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Enroll: Lifecycle Hooks */
/*****************************************************************************/
Template.Enroll.created = function () {
};

Template.Enroll.rendered = function () {
};

Template.Enroll.destroyed = function () {
};


