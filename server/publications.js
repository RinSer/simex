import { Accounts } from 'meteor/accounts-base';

// Add custom fields to user Accounts
Accounts.onCreateUser(function(options, user) {
	user.name = options.name;
	user.admin = options.admin || false;
	user.client = options.client || false;
	user.address = options.address || false;
	return user;
});