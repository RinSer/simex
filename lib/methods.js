import { Meteor } from 'meteor/meteor'

Meteor.methods({

	// Create a new user
	addUser: function(userData) {

		if (Meteor.isServer) Accounts.createUser(userData);

	},

	addNews: function(newsData) {

		News.insert(newsData);

	},

	deleteNews: function(id) {

		News.remove(id);

	}

});