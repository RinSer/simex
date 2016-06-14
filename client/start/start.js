import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

Template.start.onCreated(function() {

	this.autorun(() => {
		this.subscribe('startHeadingData');
		this.subscribe('startData');
		if (Meteor.user()) {
			if (Meteor.user().admin)
				this.add_item = new ReactiveVar(false);
		}
	});

});

Template.start.helpers({

	items:function() {

		return Start.find({});

	},

	add_item:function() {

		return Template.instance().add_item.get();

	},

	heading:function() {

		return StartHeading.findOne();

	},

	optionsHelper:function() {

		return {
			collection: "startheading",
			wysiwyg: true,
			title: "Кликни, чтобы редактировать",
			field: "text"
		};

	},

	admin:function() {

		if (Meteor.user()) {

			let user = Meteor.user();

			return user.admin;

		}

	}

});

Template.start.events({

	'click #register_now':function(event, template) {

		Session.set('modal', true);
		Session.set('register', true);

	},

	'click .add_item':function(event, template) {

		template.add_item.set(!template.add_item.get());

	},

	'click .save_item':function(event, template) {

		const title = template.find('[name=title]').value;
		const description = template.find('[name=description]').value;
		const photo = template.find('[name=photo]').value;

		const data = {title, description, photo};

		Meteor.call('addStart', data, function(err, data) {

			if (err) {
				console.log(err);
			}
			else {
				template.add_item.set(false);
			}

		});

	}

});

Template.start_item.helpers({

	admin:function() {

		if (Meteor.user()) {

			let user = Meteor.user();

			return user.admin;

		}

	},

	optionsHelper:function() {

		return {
			collection: "start",
			wysiwyg: true,
			title: "Кликни, чтобы редактировать"
		};

	}

});

Template.start_item.events({

	'click .delete_item':function(event, template) {

		const id = template.data.item._id;

		Meteor.call('deleteStart', id);

	}

});