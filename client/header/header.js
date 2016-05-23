import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Router } from 'meteor/iron:router';

//Header template
Template.header.onCreated(function() {

	this.autorun(() => {
		if (Meteor.userId()) this.subscribe('userData');
		this.subscribe('biomodelsHeaderData');
	});

});

Template.header.onRendered(function() {

	$('a.menu_link').click(function() {
		if ($(window).width() < 767) {
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

	$('a.biomodels_a').click(function() {
		$('ul.biomodels_list').slideToggle();
	});

	$('a.products').click(function() {
		$('ul.products_ref').slideToggle();
	});

	$('a.product_link').click(function() {
		$('ul.products_ref').hide();
	});

	if ($(window).width() > 767) {

		$('a.biomodels_a, ul.biomodels_list').mouseenter(function() {
			$('ul.biomodels_list').show();
		});

		$('a.biomodels_a').mouseleave(function() {
			if ($('ul.biomodels_list').is(':hover') === false) {
				$('ul.biomodels_list').hide();
			}
		});

		$('ul.biomodels_list').mouseleave(function() {
			$('ul.biomodels_list').hide();
		});

		$('a.products, ul.products_ref').mouseenter(function() {
			$('ul.products_ref').show();
		});

		$('a.products').mouseleave(function() {
			if ($('ul.products_ref').is(':hover') === false) {
				$('ul.products_ref').hide();
			}
		});

		$('ul.products_ref').mouseleave(function() {
			$('ul.products_ref').hide();
		});

	}

});

Template.header.helpers({

	user_name:function() {

		if (Meteor.user()) {

			let user = Meteor.user();
			
			return user.emails[0].address;

		}

	},

	admin:function() {

		if (Meteor.user()) {

			let user = Meteor.user();

			return user.admin;

		}

	},

	biomodels:function() {

		return Biomodels.find({});

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

	},

	'click .cart_modal_on':function(event, template) {

		Session.set('cart_modal', true);

	},

	'click .biomodel_link':function(event, template) {

		$('ul.biomodels_list').hide();
		if ($(window).width() < 768) {
			$('nav > ul').toggle('slow');
		}

	},

	'change input.header_search':function(event, template) {

		const search_text = event.currentTarget.value;

		Router.go('/search='+search_text);

	}

});
