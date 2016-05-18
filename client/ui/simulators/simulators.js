import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveArray } from 'meteor/templates:array';
import { Meteor } from 'meteor/meteor';

Template.simulators.onCreated(function() {

	this.autorun(() => {
		this.subscribe('simulatorsData');
		this.subscribe('productInfo', "simulator");
		if (Meteor.user()) {
			if (Meteor.user().admin)
				this.add_simulator = new ReactiveVar(false);
		}
	});

});

Template.simulators.helpers({

	info:function() {

		if (ProductInfo.findOne())
			return ProductInfo.findOne();
		else
			return {title: false, description: false, photo: false, price: false};

	},

	optionsHelper:function() {

		return {
			collection: "productinfo",
			field: "text",
			wysiwyg: true,
			title: "Кликни, чтобы редактировать"
		};

	},

	simulators:function() {

		return Simulators.find({});

	},

	admin:function() {

		if (Meteor.user()) {

			let user = Meteor.user();

			return user.admin;

		}

	},

	add_simulator:function() {

		return Template.instance().add_simulator.get();

	}

});

Template.simulators.events({

	'click .simulator_add':function(event, template) {

		template.add_simulator.set(!template.add_simulator.get());

	}

});

Template.new_simulator.events({

	'submit form':function(event, template) {

		event.preventDefault();

		const title = event.target.simulator_title.value;
		const description = event.target.simulator_description.value;
		const photo = event.target.simulator_photo.value;
		const price = event.target.simulator_price.value;

		const data = {title, description, photo, price};

		Meteor.call('addSimulator', data, function(err, data) {

			if (err) {
				console.log(err);
			}
			else {
				template.find('form').reset();
			}

		});

	}

});

Template.each_simulator.onCreated(function() {

	this.autorun(() => {
		this.added = new ReactiveVar(false);
	});

});

Template.each_simulator.helpers({

	admin:function() {

		if (Meteor.user())
			return Meteor.user().admin;
		else
			return false;

	},

	added:function() {

		return Template.instance().added.get();

	}

});

Template.each_simulator.events({

	'click .delete_simulator':function(event, template) {

		const id = template.data._id;

		Meteor.call('deleteSimulator', id);

	}

});

Template.manual.onCreated(function() {

	this.autorun(() => {
		this.subscribe('manualStepsData');
		this.add_step = new ReactiveVar(false);
	});

});

Template.manual.helpers({

	steps:function() {

		if (ManualSteps.find({}))
			return ManualSteps.find({}, {sort: {index: 1}});
		else
			return {index: false, description: false, photos: false};

	},

	admin:function() {

		if (Meteor.user()) {

			return Meteor.user().admin;

		}

	},

	add_step:function() {

		return Template.instance().add_step.get();

	}

});

Template.manual.events({

	'click button#print_manual':function(event, template) {

		const original = document.body.innerHTML;
		const manual = template.find('#print_manual').innerHTML;

		document.body.innerHTML = manual;

		window.print();

		document.body.innerHTML = original;

	},

	'click .add_step':function(event, template) {

		template.add_step.set(!template.add_step.get());

	}

});

Template.new_manual_step.onCreated(function() {

	this.autorun(() => {

		this.add_photo = new ReactiveVar(false);
		this.photos = new ReactiveArray();

	});

});

Template.new_manual_step.helpers({

	add_step_photo:function() {

		return Template.instance().add_photo.get();

	},

	photos:function() {

		return Template.instance().photos.get();

	}

});

Template.new_manual_step.events({

	'click .add_step_photos':function(event, template) {

		template.add_photo.set(!template.add_photo.get());

	},

	'click .add_step_photo':function(event, template) {

		const photo_url = template.find('[name=step_photo]').value;

		template.photos.push(photo_url);

		template.find('[name=step_photo]').value = '';

	},

	'click .remove_step_photo':function(event, template) {

		const photo_index = event.currentTarget.getAttribute('class')[0];

		template.photos.splice(photo_index, 1);

	},

	'click .save_step':function(event, template) {

		const index = template.find('[name=step_index]').value;
		const description = template.find('[name=step_description]').value;
		const photos = template.photos.get();

		Meteor.call('addManualStep', {index, description, photos}, function(err, data) {

			if (err) {
				console.log(err);
			}
			else {
				template.find('[name=step_index]').value = '';
				template.find('[name=step_description]').value = '';
				template.photos.set([]);

				template.add_photo.set(false);
			}

		});

	}

});

Template.manual_step.helpers({

	photo:function() {

		const photos = Template.instance().data.step.photos;

		if (photos.length === 1) {
			return photos[0];
		}
		else {
			return false;
		}

	},

	admin:function() {

		if (Meteor.user()) {

			return Meteor.user().admin;

		}

	},

	optionsHelper:function() {

		return {
			collection: "manualsteps",
			wysiwyg: true,
			editor: "froala",
			title: "Кликни, чтобы редактировать"
		};

	}

});

Template.manual_step.events({

	'click .delete_step':function(event, template) {

		const id = template.data.step._id;
		
		Meteor.call('deleteManualStep', id);

	}

});