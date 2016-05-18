import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({

	// Create a new user
	addUser: function(userData) {

		if (Meteor.isServer) Accounts.createUser(userData);

	},

	changeUser: function(userId, userData) {

		if (Meteor.isServer) Meteor.users.update(userId, {$set: userData});

	},

	changeUserEmail: function(userId, oldEmail, newEmail) {

		if (Meteor.isServer) {

			Accounts.addEmail(userId, newEmail);
			Accounts.removeEmail(userId, oldEmail);

		}

	},

	changeUserPassword: function(userId, newPassword) {
	
		if (Meteor.isServer) Accounts.setPassword(userId, newPassword);

	},

	deleteUser: function(userId) {

		const userEmail = Meteor.users.findOne({_id: userId}).emails[0].address;
		if (Meteor.isServer) {

			Accounts.removeEmail(userId, userEmail);
			Meteor.users.remove(userId);

		} 

	},

	addBiomodel: function(biomodelData) {

		Biomodels.insert(biomodelData);

	},

	deleteBiomodel: function(id) {

		Biomodels.remove(id);

	},

	addSimulator: function(simulatorData) {

		Simulators.insert(simulatorData);

	},

	deleteSimulator: function(id) {

		Simulators.remove(id);

	},

	addManualStep: function(stepData) {

		ManualSteps.insert(stepData);

	},

	deleteManualStep: function(id) {

		ManualSteps.remove(id);

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