import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

// Add custom fields to user Accounts
Accounts.onCreateUser(function(options, user) {
	user.name = options.name;
	user.admin = options.admin || false;
	user.address = options.address || false;
	return user;
});

// Publish additional user data if logged in
Meteor.publish('userData', function() {
	if (!this.userId) return null;
	return Meteor.users.find(this.userId, {fields: {
		name: 1,
		address: 1,
		admin: 1
	}});
});