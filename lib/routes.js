import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';

Router.configure({

	layoutTemplate: 'SimexLayout',
	notFoundTemplate: 'nopage',
	loadingTemplate: 'loading'

});

Router.route('/', function() {

	this.render('start');

});

Router.route('/news', function() {

	this.render('news');

});

Router.route('/about', function() {

	this.render('about');

});

Router.route('/biomodels', function() {

	this.render('biomodels');

});

Router.route('/biomodels/:id', function() {

	this.render('biomodel', {
		data:function() {
			return {id: this.params.id};
		}
	});

});

Router.route('/search=:text', function() {

	this.render('search', {
		data:function() {
			return {search_text: this.params.text};
		}
	});

});

Router.route('/search')

Router.route('/simulator', function() {

	this.render('simulators');

});

Router.route('/manual', function() {

	this.render('manual');

});

Router.route('/validity', function() {

	this.render('validity');

});

Router.route('/contacts', function() {

	this.render('contacts');

});


// Admin routes
Router.route('/cforms', function() {

	if (Meteor.user()) {
		if (Meteor.user().admin)
			this.render('cforms');
		else
			this.render('nopage');
	}
	else {
		this.render('nopage');
	}

});

Router.route('/cforms/:_id', function() {

	if (Meteor.user()) {
		if (Meteor.user().admin) {
			this.render('cform', {
				data: function() {
					if (Cforms.findOne({_id: this.params._id}))
						return Cforms.findOne({_id: this.params._id});
				}
			});
		}
		else {
			this.render('nopage');
		}
	}
	else {
		this.render('nopage');
	}

});

Router.route('/users', function() {

	if (Meteor.user()) {
		if (Meteor.user().admin)
			this.render('users');
		else
			this.render('nopage');
	}
	else {
		this.render('nopage');
	}

});

Router.route('/users/:_id', function() {

	if (Meteor.user()) {
		if (Meteor.user().admin) {
			this.render('user', {
				data: function() {
					if (Meteor.users.findOne({_id: this.params._id}))
						return Meteor.users.findOne({_id: this.params._id});
				}
			});
		}
		else {
			this.render('nopage');
		}
	}
	else {
		this.render('nopage');
	}

});

Router.route('/orders', function() {

	if (Meteor.user()) {
		if (Meteor.user().admin)
			this.render('orders');
		else
			this.render('nopage');
	}
	else {
		this.render('nopage');
	}

});

Router.route('/orders/:_id', function() {

	if (Meteor.user()) {
		if (Meteor.user().admin) {
			this.render('order', {
				data: function() {
					if (Orders.findOne({_id: this.params._id}))
						return Orders.findOne({_id: this.params._id});
				}
			});
		}
		else {
			this.render('nopage');
		}
	}
	else {
		this.render('nopage');
	}

});

Router.route('/newsletter', function() {

	if (Meteor.user()) {
		if (Meteor.user().admin)
			this.render('newsletter');
		else
			this.render('nopage');
	}
	else {
		this.render('nopage');
	}

});