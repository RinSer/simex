Template.manual.onCreated(function() {

	this.autorun(() => {
		this.subscribe('manualStepsData');
	});

});

Template.manual.helpers({

	steps:function() {

		if (ManualSteps.find({}))
			return ManualSteps.find({});
		else
			return {index: false, description: false, photos: false};

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

	optionsHelper:function() {

		return {
			collection: "manualsteps",
			wysiwyg: true,
			editor: "froala",
			title: "Кликни, чтобы редактировать"
		};

	}

});