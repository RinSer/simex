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

	$('.active').removeClass('active');
	const current_url = window.location.pathname;
	$('nav a').each(function() {

		if ($(this).attr('href').localeCompare(current_url) === 0) {
			$(this).addClass('active');
		}

	});

	$('#logo_img').click(function() {

			$('.active').removeClass('active');
			const current_url = window.location.pathname;
			$('nav a').each(function() {

			if ($(this).attr('href').localeCompare(current_url) === 0) {
				$(this).addClass('active');
			}

		});

	});

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

	let offset = $('nav').offset();
	$(window).scroll(function() {

		if ($('body').scrollTop() > offset.top) {
			$('nav').addClass('fixed');
		}
		else {
			$('nav').removeClass('fixed');
		}

	});

	$('a.products').click(function() {
		$('ul.products_ref').slideToggle();
	});

	$('a.products, ul.products_ref').mouseenter(function() {
		$('ul.products_ref').show();
	});

	$('ul.products_ref').mouseleave(function() {
		$('ul.products_ref').hide();
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


Template.admin_panel.onRendered(function() {

	$('.active').removeClass('active');
	const current_url = window.location.pathname;
	$('ul.admin_menu a').each(function() {

		if ($(this).attr('href').localeCompare(current_url) === 0) {
			$(this).addClass('active');
		}

	});

	$('ul.admin_menu a').click(function() {
		$('.active').removeClass('active');
		$(this).addClass('active');
	});

});