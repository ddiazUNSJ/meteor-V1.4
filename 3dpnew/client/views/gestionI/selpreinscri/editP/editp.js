import './editp.html';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Roles} from 'meteor/alanning:roles';
import {Modal} from'meteor/peppelg:bootstrap-3-modal';
///////////////////////////////////////////////////////////////////////////////
// Edit User Dialog
// *--> Esta funcion la usa para cargar algunos datos
//      el Template.editUserDialog.user 
//       y las variables de sesion editUserId, showEditUserDialog

openEditUserDialog = function(userid) {
  if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
    return;
  }
  Template.editUserDialog.user = Meteor.users.findOne({ _id: userid });
  if (Template.editUserDialog.user) {
    Session.set("editUserId", userid);
    Session.set("showEditUserDialog", true);
  }
};

//--> Eventos de editUserDialog
Template.editUserDialog.events({
  'click .edituser .save': function (event, template) {
    console.log(Session.get("editUserId") );
    if ($("form.edituser :input").jqBootstrapValidation("hasErrors")) {
       return;
    }
    var username = $.trim(template.find(".username").value);
    var email = template.find(".email").value;
    var roles = [];
    $('form.edituser input[name=roles]:checked').each(function() {
      roles.push($(this).val());
    });

    if (AdminUser.savingUser && !AdminUser.savingUser(Session.get('editUserId'), template)) {
      // returning false from savingUser cancels delete
      return false;
    }

    Meteor.call('updateUser', {
      id: Session.get("editUserId"),
      username: username,
      email: email,
      roles: roles,
      custom: AdminUser.customUserProps
    }, function (error) {
      if (error) {
	alert('Error saving user changes: ' + error.reason);
      }
    });
    Session.set("showEditUserDialog", false);
    return false;
  },

  'click .edituser .cancel': function () {
    Session.set("showEditUserDialog", false);
    return false;
  }
});


Template.editUserDialog.rendered = function() {
  $("form.edituser :input").jqBootstrapValidation();
};


//--> Helpers de editUserDialog
//    los diferentes datos que usa el template se cargan aqui 
Template.editUserDialog.helpers({
  user: function() {
    return Template.editUserDialog.user;
  },
  username: function() {
    return displayName(Template.editUserDialog.user);
  },
  useremail: function() {
    var email = contactEmail(Template.editUserDialog.user);
    return (email == null) ? "" : email;
  },
  roles: function() {
    return Roles.getAllRoles();
  },
  hasrole: function() {
    return Roles.userIsInRole(Template.editUserDialog.user, this.name);
  },
  checked: function() {
    return Roles.userIsInRole(Template.editUserDialog.user, this.name)?"checked":"";
  },
  prueba:function(){
    return Session.get("editUserId");
  }
});
