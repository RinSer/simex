import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

Template.cforms.onCreated(function() {

	this.autorun(() => {
		this.subscribe('cformsData');
	});

	this.status = new ReactiveVar(0);

});

Template.cforms.onRendered(function() {

	$('section.cforms li').click(function() {

		$('li.current').removeClass('current');
		$(this).addClass('current');

	});

});

Template.cforms.helpers({

	forms:function() {

		switch (Template.instance().status.get()) {

			case 0:
				return Cforms.find({}, {sort:{createdAt: -1}});
			case 1:
				return Cforms.find({processed: false}, {sort:{createdAt: -1}});
			case 2:
				return Cforms.find({processed: true}, {sort:{createdAt: -1}});

		}

	}

});

Template.cforms.events({

	'click .all_cforms':function(event, template) {

		template.status.set(0);

	},

	'click .new_cforms':function(event, template) {

		template.status.set(1);

	},

	'click .processed_cforms':function(event, template) {

		template.status.set(2);

	}

});

Template.cform.onCreated(function() {

	this.autorun(() => {
		this.subscribe('cformsData');
	});

});

Template.cform.events({

	'change .processed':function(event, template) {

		event.preventDefault();

		const id = template.data._id;
		const processed = !template.data.processed;

		Meteor.call('changeCformStatus', id, processed);

	},

	'click a.back':function(event, template) {

		event.preventDefault();

		history.back();

	}

});