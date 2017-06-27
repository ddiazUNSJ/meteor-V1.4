Template.adminUsers.helpers({

    isAdmin: function() {
        //var iduser = Meteor.userId();
        
        //var data = Meteor.users.findOne({_id: iduser});   
       var rol=Session.get('rol')
        return  (rol==='Administrador'); 

  },

   isAnim: function() {  

        return Session.get('rol')=='Animador'; 
  }
});