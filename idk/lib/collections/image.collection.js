
// import {Mongo} from 'meteor/mongo';
// import {SimpleSchema} from 'meteor/aldeed:simple-schema';
// import {Meteor} from 'meteor/meteor';
// import { FilesCollection } from 'meteor/ostrio:files';




//export var Images = new FilesCollection({
 Images = new FilesCollection({

  collectionName: 'Images',
  allowClientCode: true, // Required to let you remove uploaded file
  storagePath:'/home/daniel/data2',

  downloadRoute: '/home/daniel/data2',
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
})

if (Meteor.isClient) {
  Meteor.subscribe('files.images.user');
}

// server
if (Meteor.isServer) {

  Meteor.publish('files.images.all', function () {
    return Images.collection.find({});
  });

  Meteor.publish('files.images.user', function publishFunction() {
   return Images.collection.find({userId: this.userId}, {sort: {date: -1}, limit: 10});
   // this.userId is provided by Meteor - http://docs.meteor.com/#publish_userId
  });
}


Schemas = {};
Posts   = new Meteor.Collection('posts');

Schemas.Posts = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  picture: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        uploadTemplate: 'uploadField', // <- Optional
        previewTemplate: 'uploadPreview' // <- Optional
      }
    }
  }
});


Posts.attachSchema(Schemas.Posts);