// import './subir.html';

/*****************************************************************************/
/* subir: Event Handlers and Helpersss .js*/
/*****************************************************************************/

Template.subirfoto.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.subirfoto.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* subir: Lifecycle Hooks */
/*****************************************************************************/
Template.subirfoto.created = function () {
};

Template.subirfoto.rendered = function () {

      // Set options for cropper plugin

    var $image = $(".image-crop > img")
    $($image).cropper({
        aspectRatio: 1.618,
        preview: ".img-preview",
        done: function(data) {
            // Output the result data for cropping image.
        }
    });

    var $inputImage = $("#inputImage2");
    if (window.FileReader) {
        $inputImage.change(function() {
            var fileReader = new FileReader(),
                files = this.files,
                file;

            if (!files.length) {
                return;
            }

            file = files[0];

            if (/^image\/\w+$/.test(file.type)) {
                fileReader.readAsDataURL(file);
                fileReader.onload = function () {
                    $inputImage.val("");
                    $image.cropper("reset", true).cropper("replace", this.result);
                };
            } else {
                showMessage("Please choose an image file.");
            }
        });
    } else {
        $inputImage.addClass("hide");
    }

    $("#download").click(function() {

      var url = $image.cropper("getCroppedCanvas").toDataURL();
      // Insertar avatar en imagenes gestionadas por ostrio files 

       Images.insert({
                    file: url,
                    isBase64: true, // <— Mandatory
                    fileName: 'pic.png', // <— Mandatory
                    onUploaded: function (error, fileObj) {
                        if (error) {
                          alert('Error during upload: ' + error);
                        } else {
                          Meteor.call('cargarAvatarUsu', fileObj.userId,fileObj._id);
                          alert('File "' + fileObj.name + '" successfully uploaded');
                          console.log(fileObj._id);

                        }
                     
                      },
                      streams: 'dynamic',
                      chunkSize: 'dynamic'
                    });



     // console.log( $image.cropper("getCroppedCanvas").toDataURL());
     window.open( $image.cropper("getCroppedCanvas").toDataURL());
    //    window.open($image.cropper("getDataURL"));
    });

    $("#zoomIn").click(function() {
        $image.cropper("zoom", 0.1);
    });

    $("#zoomOut").click(function() {
        $image.cropper("zoom", -0.1);
    });

    $("#rotateLeft").click(function() {
        $image.cropper("rotate", 45);
    });

    $("#rotateRight").click(function() {
        $image.cropper("rotate", -45);
    });

    $("#setDrag").click(function() {
        $image.cropper("setDragMode", "crop");
    });

};

Template.subirfoto.destroyed = function () {
};


