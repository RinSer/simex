import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

//Header template
Template.header.onCreated(function() {

	this.autorun(() => {
		if (Meteor.userId()) this.subscribe('userData');
	});
	
});

Template.header.onRendered(function() {

	$('nav a').click(function() {
		$('.active').removeClass('active');
		$(this).addClass('active');
		if ($(window).width() < 768) {
			$('nav > ul').toggle('slow');
		}
	});

	$('.mob_menu_button').click(function() {
		$('nav > ul').toggle('slow');
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

		Meteor.logout();

	}

});