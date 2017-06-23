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
},

getNombre: function(idUser){
console.log('obteniendo nombre de usuario');
	return Meteor.users.find({ _id: idUser }, { $set: { 'profile.avatarID': idAvatar }});
},
nombreRepetido: function(idUser,nameArg){
	var count = dropboxF.collection.find({ name: nameArg }).count();
      console.log("Encontre " + count+ " nombre");
      return count > 0;

	}
})