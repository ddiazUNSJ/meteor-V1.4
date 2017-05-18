import './deletep.html';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Roles} from 'meteor/alanning:roles';
import {Modal} from'meteor/peppelg:bootstrap-3-modal';
///////////////////////////////////////////////////////////////////////////////
// Delete User Dialog

openDeleteUserDialog = function(userid) {
  if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
    return;
  }
  var user = Meteor.users.findOne({ _id: userid });
  if (user) {
    Session.set("dlgDeleteUserId", userid);
    Session.set("dlgUserName", displayName(user));
    Session.set("showDeleteUserDialog", true);
  }
};
Template.deleteUserDialog.events({
  'click .deleteuser .confirm': function (event, template) {
      if (AdminUser.deletingUser && !AdminUser.deletingUser(Session.get("dlgDeleteUserId"))) {
	// returning false from deletingUser cancels delete
	return false;
      }
      Meteor.call('deleteUser', {
        id: Session.get("dlgDeleteUserId")
      }, function (error, userId) {
        if (error) {
	  alert('Could not delete user! ' + error.reason);
	}
      });
    Session.set("showDeleteUserDialog", false);
    return false;
  },
  'click .deleteuser .cancel': function () {
    Session.set("showDeleteUserDialog", false);
    return false;
  }
});
Template.deleteUserDialog.helpers({
  username: function () {
    return Session.get("dlgUserName");
  }
});
