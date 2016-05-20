import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

// Add custom fields to user Accounts
Accounts.onCreateUser(function(options, user) {
	user.firstName = options.firstName;
	user.secondName = options.secondName || false;
	user.familyName = options.familyName;
	user.admin = options.admin || false;
	user.address = options.address || false;
	return user;
});

// Publish additional user data if logged in
Meteor.publish('userData', function() {
	if (!this.userId) return null;
	return Meteor.users.find(this.userId, {fields: {
		firstName: 1,
		secondName: 1,
		familyName: 1,
		address: 1,
		admin: 1
	}});
});

// Publish Biomodels data for header
Meteor.publish('biomodelsHeaderData', function() {

	return Biomodels.find({}, {fields: {title: 1, pic: 1}});

});

// Publish Biomodels data
Meteor.publish('biomodelsData', function() {

	return Biomodels.find({}, {fields: {title: 1, description: 1, pic: 1, photos: 1, price: 1}});

});

Meteor.publish('biomodelsSearchData', function(search_text) {

	return Biomodels.find({$text: {$search: search_text}}, 
		{fields: {score: {$meta: 'textScore'}, 
				title: 1, 
				description: 1, 
				pic: 1, 
				photos: 1, 
				price: 1},
				sort: {score: {$meta: 'textScore'}}});

});

Meteor.publish('biomodelsCartData', function() {

	return Biomodels.find({}, {fields: {title: 1, pic: 1, price: 1}});

});

// Publish a biomodel data
Meteor.publish('biomodelData', function(biomodelId) {

	return Biomodels.find({_id: biomodelId}, {fields: {
													title: 1, 
													description: 1,
													full_description: 1,
													photos: 1,
													pic: 1,
													price: 1
												}});

});

// Publish simulators data
Meteor.publish('simulatorsData', function() {

	return Simulators.find({}, {fields: {title: 1, description: 1, photo: 1, price: 1}});

});

// Publish SIMEX GI price
Meteor.publish('simexgiData', function() {

	return Simulators.find({title: "SIMEX GI"}, {fields: {price: 1}});

});

// Publish simulators cart data
Meteor.publish('simulatorsCartData', function() {

	return Simulators.find({}, {fields: {title: 1, price: 1}});

});

// Publish product info
Meteor.publish('productInfo', function(product) {

	return ProductInfo.find({product: product}, {fields: {text: 1}});

});

// Publish manual steps data
Meteor.publish('manualStepsData', function() {

	return ManualSteps.find({}, {fields: {index: 1, description: 1, photos: 1}, sort: {index: 1}});

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

// Publish footer Contacts data
Meteor.publish('footerContacts', function() {

	return Contacts.find({}, {fields: {email: 1, tel: 1}});

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

	return Meteor.users.find({}, {fields: {firstName: 1, secondName: 1, familyName: 1, emails: 1, address: 1, admin: 1}});

});

// Publish orders data for admin
Meteor.publish('ordersData', function() {

	return Orders.find({});

});

// Publish orders data for each user
Meteor.publish('userOrders', function(userId) {

	return Orders.find({user: userId}, {field: {_id: 1, user: 1, createdAt: 1}});

});