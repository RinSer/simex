import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

// Modal template
Template.modal.onCreated(function() {

	$(document).keyup(function(event) {

		if (event.keyCode === 27) {
			Session.set('modal', false);
		}

		if (event.keyCode == 13) {
			$('form').submit();
		}

	});

});

Template.modal.helpers({

	need_register:function() {

		return Session.get('register');

	}

});

Template.modal.events({

	'click .modal_exit':function(event, template) {

		Session.set('modal', false);

	}

});

// Login template
Template.login.events({

	'submit form':function(event, template) {

		event.preventDefault();

		const email = event.target.email.value;
		const password = event.target.password.value;

		Meteor.loginWithPassword(email, password, function(err, data) {
			if (err) {
				$('.login_error').show();
			}
			else {
				Session.set('modal', false);
			}
		});

	}

});

// Register template
Template.register.events({

	'submit form':function(event, template) {

		event.preventDefault();

		const name = event.target.name.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		const pcheck = event.target.pcheck.value;

		if (password === pcheck) {
			Meteor.call('addUser', {name, email, password}, function(err, data) {

				if (err) {
					$('.register_error').show();
				}
				else {
					Meteor.loginWithPassword(email, password);
					Session.set('modal', false);
				}

			});
		}

	},

	'keyup #pcheck':function(event, template) {

		event.preventDefault();

		const password = template.find('[name=password]').value;
		const pcheck = event.currentTarget.value;

		if (password !== pcheck) {
			$('.login_error').show();
		}
		else {
			$('.login_error').hide();
		}

	},

	'keyup #password':function(event, template) {

		event.preventDefault();

		const pcheck = template.find('[name=pcheck]').value;

		if (pcheck !== '') {

			const password = event.currentTarget.value;

			if (password !== pcheck) {
				$('.login_error').show();
			}
			else {
				$('.login_error').hide();
			}

		}

	}

});