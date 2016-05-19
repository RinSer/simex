import { Template } from 'meteor/templating';

Template.about.onCreated(function() {

	this.autorun(() => {
		this.subscribe('aboutData');
	});

});

Template.about.helpers({

	about:function() {

		if (About.findOne())
			return About.findOne();
		else
			return {title: false, text: false, quote: {person: false, text: false}};

	},

	optionsHelper:function() {

		return {
			collection: "about",
			wysiwyg: true,
			title: "Кликни, чтобы редактировать"
		};

	}

});