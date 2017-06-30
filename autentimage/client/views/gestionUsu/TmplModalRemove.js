Template.TmplModalRemove.helpers({

	data: function(){

		return Albums.findOne({_id: Session.get('albumID')});
	}

});





Template.TmplModalRemove.events({

	"click  #confirmTrue": function(){

		if (Meteor.userId()) {

			var data = Albums.findOne({_id: Session.get('albumID')});

			var title = "Album is Removed";

			var msg = data.artistName + " / " + data.albumTitle;

			toastr.success(msg, title);

			Albums.remove({_id: Session.get('albumID')});

		}
	}

});
