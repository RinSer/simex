import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({

	// Create a new user
	addUser: function(userData) {

		if (Meteor.isServer) Accounts.createUser(userData);

	},

	deleteUser: function(userId) {

		if (Meteor.isServer) Meteor.users.remove(userId);

	},

	addNews: function(newsData) {

		News.insert(newsData);

	},

	deleteNews: function(id) {

		News.remove(id);

	},

	// Add new cform
	addCform:function(formData) {

		Cforms.insert(formData);

	},

	deleteCform:function(id) {

		Cforms.remove(id);

	},

	changeCformStatus:function(id, value) {

		Cforms.update({_id: id}, {$set: {processed: value}});

	}

});