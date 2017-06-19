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

 // Initialize dataTables
 //$('#datatable').DataTable().
    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            { extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]

    });
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

       dropboxF.insert({
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

  https://www.dropbox.com/s/7xz58cs78xkor6v/oDS2rBA4rbSzQgpdd-original.png?dl=0
  "https://dl.dropboxusercontent.com/s/7xz58cs78xkor6v/oDS2rBA4rbSzQgpdd-original.png?dl=0"
};


