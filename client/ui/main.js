import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';

// Main template
Template.body.onCreated(function() {

	Session.set('modal', false);

});

Template.body.helpers({

	onmodal:function() {

		return Session.get('modal');

	},

});
