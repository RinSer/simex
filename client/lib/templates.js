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

// Modal template
Template.modal.events({

	'click .modal_exit':function(event, template) {

		Session.set('modal', false);

	},

})

//Header template
Template.header.events({

	'click .modal_on':function(event, template) {

		Session.set('modal', true);

	},

});