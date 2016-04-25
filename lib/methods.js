import { Meteor } from 'meteor/meteor'

Meteor.methods({

	// Create a new user
	addUser: function(userData) {

		if (Meteor.isServer) Accounts.createUser(userData);

	}

});