Template.TmplModalRemove.helpers({

	data: function(){

		return Meteor.users.findOne({_id: Session.get('usuarioId')});
	}

});





Template.TmplModalRemove.events({

	"click  #confirmTrue": function(){

		if (Meteor.userId()) {

			var data = Meteor.users.findOne({_id: Session.get('usuarioId')});

			swal("Se eliminaran los datos de", data.profile.name);
			
			Meteor.users.remove({_id: Session.get('usuarioId')});

		}
	}

});
