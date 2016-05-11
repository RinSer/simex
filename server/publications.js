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

// Publish Validity data
Meteor.publish('validityData', function() {

	return Validity.find({}, {fields: {title: 1, text: 1, reference_title: 1, references: 1}});

});

// Publish Contacts data
Meteor.publish('contactsData', function() {

	return Contacts.find({}, {fields: {address: 1, email: 1, tel: 1, web: 1, location: 1}});

});

// Publish Cforms data
Meteor.publish('cformsData', function() {

	return Cforms.find({}, {fields: {
		user: 1,
		familyName: 1,
		firstName: 1,
		secondName: 1,
		email: 1,
		tel: 1,
		theme: 1,
		message: 1,
		processed: 1,
		createdAt: 1
	}, sort: {createdAt: -1}});

});

// Publish cforms data for each user
Meteor.publish('userCforms', function(userId) {

	return Cforms.find({user: userId}, {fields: {_id: 1, user: 1, theme: 1}, sort: {createdAt: -1}});

});

// Publish users data for admin
Meteor.publish('usersData', function() {

	return Meteor.users.find({}, {fields: {name: 1, emails: 1, address: 1, admin: 1}});

});