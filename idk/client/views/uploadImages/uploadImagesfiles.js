// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
// import { Images } from '/both/lib/image.collection.js';
//import { Schema } from '/both/collections/inscripcion.js';

import './uploadImagesfiles.html';

Template.uploadedImagesFiles.helpers({
  uploadedImagesFiles: function () {
    return Images.find();
  }
});

