import './selpreinscri.html';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Roles} from 'meteor/alanning:roles';

//ver http://experimentsinmeteor.com/modal-dialogs-part-2/index.html

// this function can be used by your mini-pages routing
bounceNonUserAdmin = function() {
  if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
    this.redirect("/");
  }
}

function getFilteredUsers()
{
  // this converts the search string into a wildcard regex before calling getAppUsers
  var regex = null;
  if (Session.get("matchstring") != null) {
    regex = ".*" + Session.get("matchstring") + ".*";
  }
  var users = getAppUsers(regex);
  return users;
}

/****************************************************************/
//---------------Helpers de Administracion de pre-inscriptos---------------

Template.Selpreinscri.helpers({
  users: function() {
    if (!Roles.userIsInRole(Meteor.user(), ['admin','user-admin'])) {
      return null;
    }
    return getFilteredUsers();
  },
  useremail: function() {
    // bit of a pain because we can't just use emails[0].address with OAuth users
    var thisuser = Meteor.users.findOne({ _id: this._id });
    var email = contactEmail(thisuser);
    if (email == null) {
      return "";
    } else {
      return email;
    }
  },
  searchstring: function() {
    return Session.get("userFilter");
  },
  isNotMe: function() {
    if (Session.get("userFilter")) {
      return (this._id != Meteor.userId());
    } else {
      return true;
    }
  },
  showDeleteUserDialog: function() {
    return Session.get("showDeleteUserDialog");
  },
  showEditUserDialog: function() {
    return Session.get("showEditUserDialog");
  },
  showInfoUserDialog: function() {
    return Session.get("showInfoUserDialog");
  }
});


function getUIDFromEvent(event)
{
  return $(event.target).parent().parent().attr('uid')
}

var timerid = null;


/****************************************************************/
//---------------Event de Administracion de pre-inscriptos---------------
Template.Selpreinscri.events({
  'keypress .adminusersbar .search-query': function(event) {
    if (event.charCode == 13) {
	alert('you hit enter');
	event.stopPropagation();
	return false;
    }
  },
  'keyup .adminusersbar .search-query': function(event, template) {
    clearTimeout(timerid);
    timerid = setTimeout(function() {
	var search = template.find(".search-query").value;
	Session.set("userFilter", search);
      }, 1000);
    return false;
  },
  'click .adminusers .glyphicon-trash': function(event, template) {
    var id = getUIDFromEvent(event);
    if (id) {
      openDeleteUserDialog(id);
    }
  },
  'click .adminusers .glyphicon-edit': function(event, template) {
    var id = getUIDFromEvent(event);
    if (id) {
      openEditUserDialog(id);
    }
  },
  'click .adminusers .glyphicon-info-sign': function(event, template) {
    var id = getUIDFromEvent(event);
    if (id) {
      // Funcion que est en infoP.js
      openInfoUserDialog(id);
    }
  },
 'click #add': function(e) {
    e.preventDefault();

  
  }

});
