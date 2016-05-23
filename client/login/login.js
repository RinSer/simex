import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';

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

		const firstName = event.target.firstName.value;
		const secondName = event.target.secondName.value ? event.target.secondName.value : false;
		const familyName = event.target.familyName.value;
		const email = event.target.email.value;
		const address = event.target.address.value ? event.target.address.value: false;
		const password = event.target.password.value;
		const pcheck = event.target.pcheck.value;

		if (password === pcheck) {
			Meteor.call('addUser', {
									firstName, 
									secondName,
									familyName,
									email,
									address,
									password
						}, function(err, data) {

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


Template.user_profile.onCreated(function() {

	this.autorun(() => {
		this.change_profile = new ReactiveVar(false);
	});

});

Template.user_profile.helpers({

	profile:function() {

		return Meteor.user();

	},

	profile_change:function() {

		return Template.instance().change_profile.get();

	}

});

Template.user_profile.events({

	'click .delete_profile':function(event, template) {
		
		if (Meteor.user()) {

			let sure = confirm("Вы уверены, что хотите удалить свой аккаунт?");

			if (sure) {

				const id = Meteor.user()._id;

				Meteor.logout();

				Meteor.call('deleteUser', id, function(err, data) {

					if (err) {
						console.log(err);
					}
					else {
						document.location.reload(true);
					}

				});

			}

		}

	},

	'click .change_profile':function(event, template) {

		template.change_profile.set(true);

	},

	'submit form':function(event, template) {

		event.preventDefault();

		const userId = Meteor.userId();
		const firstName = event.target.firstName.value;
		const secondName = event.target.secondName.value;
		const familyName = event.target.familyName.value;
		const email = event.target.email.value;
		const address = event.target.address.value;
		const password = event.target.password.value;
		const pcheck = event.target.pcheck.value;

		let newData = {};

		if (firstName) newData.firstName = firstName;
		if (secondName) newData.secondName = secondName;
		if (familyName) newData.familyName = familyName;
		if (address) newData.address = address;

		if (!firstName && !secondName && !familyName && !address) {
			newData = false;
		}

		if (newData) {

			Meteor.call('changeUser', userId, newData, function(err, data) {

				if (err) {
					template.change_profile.set(true);
					$('.register_error').show();
					console.log(err);
				}
				else {
					template.change_profile.set(false);
				}

			});

		}

		if (email) {

			const old_email = Meteor.user().emails[0].address;

			Meteor.call('changeUserEmail', userId, old_email, email, function(err, data) {

				if (err) {
					template.change_profile.set(true);
					$('.register_error').show();
					console.log(err);
				}
				else {
					template.change_profile.set(false);
				}

			});

		}

		if (password && password === pcheck) {

			Meteor.call('changeUserPassword', userId, password);

			document.location.reload(true);

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