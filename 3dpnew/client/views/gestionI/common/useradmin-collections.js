// user admin collections

import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Router, RouteController} from 'meteor/iron:router';
import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email';
import { Roles } from 'meteor/alanning:roles';
import { Tracker } from 'meteor/tracker';

getAppUsers = function(regex, pagemax, curpage) {
  var userid = (Meteor.isClient) ? Meteor.userId() : this.userId;
  var user = Meteor.users.findOne({ _id: userid });
  if (!Roles.userIsInRole(user, ['admin','user-admin'])) {
    // user can't get list of users because they're not an admin
    // so notify Meteor that we're done with the collection
    return this.ready();
  }
  var users = null;
  if (regex) {
    users = Meteor.users.find({
      $or: [{ 'profile.name': { $regex: regex, $options: 'i' } },
	    { 'emails.address': { $regex: regex, $options: 'i' } }] }
	    , {sort: {'profile.name': 1}});
  } else {
    var page = 0;
    users = Meteor.users.find({}, {sort: {'profile.name': 1}});
  }
  return users;
}

getAllRoles = function() {
  return Meteor.roles.find({}, {sort: {'profile.name': 1}});
}


//-----------------------------------------------------------------------
////////PRINCIPAL desde aqui se llama los metodos de arriba///////////////
if (Meteor.isClient) {  
  // subscribe to published data

  Tracker.autorun(function () {
    // //Si el que se ha logeado es admin suscribe name y email address de todoslos usuarios
    // Meteor.subscribe("appUsers", Session.get("userFilter"), Session.get("usersPerPage"), Session.get("userPage"));
    // // suscribe todos los roles disponibles
    // Meteor.subscribe("allRoles");
    
  });
}
if (Meteor.isServer) {
  //Si el que se ha logeado es admin publica name y email address de todoslos usuarios
  Meteor.publish("appUsers", getAppUsers);
  
}
