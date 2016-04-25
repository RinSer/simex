import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

//Header template
Template.header.onCreated(function() {

	this.autorun(() => {
		if (Meteor.userId()) this.subscribe('userData');
	});
	
});

Template.header.helpers({

	user_name:function() {

		if (Meteor.user()) {

			let user = Meteor.user();
			
			return user.name;

		}

	},

	admin:function() {

		if (Meteor.user()) {

			let user = Meteor.user();

			return user.admin;

		}

	}

});

Template.header.events({

	'click .modal_on':function(event, template) {

		Session.set('modal', true);

	},

	'click .register':function(event, template) {

		Session.set('register', true);

	},

	'click .login':function(event, template) {

		Session.set('register', false);

	},

	'click .logout':function(event, template) {

		event.preventDefault();

		Meteor.logout();

	},

	'click .mob_menu_button':function(event, template) {

		event.preventDefault();

		$('nav > ul').toggle('slow');

	}

});