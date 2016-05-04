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

// Publish News data
Meteor.publish('newsData', function() {

	return News.find({}, {fields: {title: 1, photos: 1, link: 1, createdAt: 1}, sort: {createdAt: -1}});

});

// Publish NewsSlogan data
Meteor.publish('newsSloganData', function() {

	return NewsSlogan.find({}, {fields: {title: 1, quote: 1, text: 1}});

});

// Publish About data
Meteor.publish('aboutData', function() {

	return About.find({}, {fields: {title: 1, text: 1, quote: 1}});

});