import { Template } from 'meteor/templating';

Template.validity.onCreated(function() {

	this.autorun(() => {
		this.subscribe('validityData');
	});

});

Template.validity.helpers({

	validity:function() {

		if (Validity.findOne())
			return Validity.findOne();
		else
			return {title: false, text: false, reference_title: false, references: false};

	},

	optionsHelper:function() {

		return {
			collection: "validity",
			wysiwyg: true,
			title: "Кликни, чтобы редактировать"
		};

	}

});