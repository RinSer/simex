import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';

// Main template
Template.SimexLayout.onCreated(function() {

	Session.set('modal', false);

});

Template.SimexLayout.helpers({

	onmodal:function() {

		return Session.get('modal');

	},

});
