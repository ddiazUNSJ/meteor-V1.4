import { Accounts } from 'meteor/accounts-base';
Accounts.config({
  sendVerificationEmail : true,
   forbidClientAccountCreation: true
});

/*Accounts.onCreateUser(function(options, user) {
  if(Meteor.users.find().count() > 0)
    throw new Meteor.Error(401, "No registration possible!");
 
  if(options.profile)
    user.profile = options.profile;
  
  user.email = 'bicobic@gmx.de';
  
  return user;
});


Meteor.methods({
  'createUserWithRole': function(data, role) 
  {
    var userId;

    Meteor.call('createUserNoRole', data, function(err, result) {
      if (err) {
        return err;
      }
      Roles.addUsersToRoles(result, role);
      return userId = result;
    });
    return userId;
   },

  'createUserNoRole': function(data) {
    //Do server side validation
    return Accounts.createUser({
      email: data.email,
      password: data.password,
      profile: data.profile
    });
  }
});
*/