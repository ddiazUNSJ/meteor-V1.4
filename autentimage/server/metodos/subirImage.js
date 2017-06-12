/*isEmailExisting: function(emailToCheck) {
    console.log("emailToCheck; " + emailToCheck );
     // var count = Meteor.users.find({'email': emailToCheck}).count();
      var count = Meteor.users.find({ emails: { $elemMatch: { address: emailToCheck} } }).count();
      console.log("Encontre " + count+ " emails");
      return count > 0;
   },
*/
Meteor.methods({

cargarAvatarUsu: function(idUser, idAvatar){

console.log('cargando avatar en server');
	return Meteor.users.update({ _id: idUser }, { $set: { 'profile.avatarID': idAvatar }});
}

})