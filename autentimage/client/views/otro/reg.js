// import './Register2.html';
// import {Meteor} from 'meteor/meteor';
// import {Session} from 'meteor/session';
// import {Router, RouteController} from 'meteor/iron:router';
// /*****************************************************************************/
// /* Register2: Event Handlers and Helpersss .js*/
// /*****************************************************************************/
// Template.Register2.events({
//   /*
//    * Example:
//    *  'click .selector': function (e, tmpl) {
//    *
//    *  }
//    */
  
  
//   'submit form': function(event, template) {
//     event.preventDefault();
    
//     var inputName = $(event.target).find('#inputName').val().trim();
//     var inputPassword = $(event.target).find('#inputPassword').val().trim();
    
//      Accounts.createUser({username:inputName, password:inputPassword}, function(err){
//      if (err)
//      {
//        console.log(err);
//        Router.go('ErrorReg');
//       }
//      else
//        console.log('success!');
//        Session.set('userOk', true)
//     //    Router.go("Overlog");
     
//     //   var currentRoute = Router.current();
//     //     Session.set('errorl', true);
//     //    currentRoute.render('Errorlog');
//     //    currentRoute.next();
//      });
    
//   }  

// });


Template.Register2.helpers({
  dirFile: function() {
    //var user = Meteor.users.findOne(Meteor.userId());
    //var imagen=Images.findOne(user.profile.avatarID).link();
   // Images.findOne({}).link();
   var imagen=dropboxF.findOne({}).link();
   
    return imagen;
   },

   firstName: function() {
    var user = Meteor.users.findOne(Meteor.userId());
      if (user) {
           console.log(user.profile.nombre);
           return user.profile.nombre;
      } else {
          console.log('No user with id', user);
          return "";
        }
    
  },


	avatar :function(){
   var user = Meteor.users.findOne(Meteor.userId());
    console.log(user.profile.nombre);
  console.log(user.profile.avatarID);
   
   var imagen=Images.findOne(user.profile.avatarID);
   console.log(imagen.path);
  //  var avatar=Images.find(_id:profile.avatarID);
		return imagen.path;
  //  return "img/a2.jpg";
	},



    nombre:function(){
    	return "Cacho";
    },
    apellido:function(){
    	return "de Bs As";
    }
  
});

// /*****************************************************************************/
// /* Register2: Lifecycle Hooks */
// /*****************************************************************************/
// Template.Register2.created = function () {
// };

// Template.Register2.rendered = function () {
// };

// Template.Register2.destroyed = function () {
// };
Template.Register2.events({

// 'click #irAAvatar': function(){

//     Router.go("subirfoto");
// 	},


});