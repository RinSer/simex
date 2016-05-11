import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

Template.users.onCreated(function() {

	this.autorun(() => {
		this.subscribe('usersData');
	});

	this.admin_group = new ReactiveVar(false);

});

Template.users.onRendered(function() {

	$('section.users li').click(function() {

		$('li.current').removeClass('current');
		$(this).addClass('current');

	});

});

Template.users.helpers({

	users:function() {

		if (Template.instance().admin_group.get()) {

			return Meteor.users.find({admin: true});

		}
		else {

			return Meteor.users.find({admin: false});

		}

	},

	admins:function() {

		return Template.instance().admin_group.get();

	}

});

Template.users.events({

	'click li.users':function(event, template) {

		template.admin_group.set(false);

	},

	'click li.admins':function(event, template) {

		template.admin_group.set(true);

	},

	'click section.users h3':function(event, template) {

		$('div.new_admin').toggle('fast');

	},

	'submit form.add_admin':function(event, template) {

		event.preventDefault();

		const name = event.target.name.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		const pcheck = event.target.password_check.value;
		let admin_data = {name, email, password};
		admin_data.admin = true;

		if (password === pcheck) {
			Meteor.call('addUser', admin_data, function(err, data) {

				if (err) {
					$('.register_error').show();
				}
				else {
					template.find('form.add_admin').reset();
					$('div.new_admin').toggle('fast');
				}

			});
		}

	},

	'keyup #password_check':function(event, template) {

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

		const pcheck = template.find('[name=password_check]').value;

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

Template.user_row.onCreated(function() {

	const userId = this.data._id;
	this.autorun(() => {
		this.subscribe('userCforms', userId);
	});

});

Template.user_row.helpers({

	forms:function() {

		const userId = Template.instance().data._id;
		return Cforms.find({user: userId}).count() > 0 ? Cforms.find({user: userId}) : false;

	},

	orders:function() {

		const userId = Template.instance().data._id;
		return false;

	}

});

Template.admin_row.events({

	'click td.delete_admin':function(event, template) {

		Meteor.call('deleteUser', template.data._id);

	}

});