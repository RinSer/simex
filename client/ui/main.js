import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

// Main template
Template.SimexLayout.onCreated(function() {

	Session.set('modal', false);
	Session.set('cart_modal', false);
	Session.set('cart', {biomodels: [], simulators: []});

});

Template.SimexLayout.helpers({

	onmodal:function() {

		return Session.get('modal');

	},

	oncart:function() {

		return Session.get('cart_modal');

	}

});
