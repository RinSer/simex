import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { ReactiveVar } from 'meteor/reactive-var';

Template.biomodels.onCreated(function() {

	this.autorun(() => {
		this.subscribe('biomodelsData');
	});

});

Template.biomodels.helpers({

	biomodels:function() {

		return Biomodels.find({});

	}

});

Template.biomodel.onCreated(function() {

	this.autorun(() => {
		if (Router.current().params.id) {
			this.photo_index = new ReactiveVar(0);
			this.data.id = Router.current().params.id;
			this.subscribe('biomodelData', this.data.id);
		}
	});

});

Template.biomodel.onRendered(function() {



});

Template.biomodel.helpers({

	biomodel:function() {

		const biomodelId = Template.instance().data.id;
		if (Biomodels.findOne({_id: biomodelId}))
			return Biomodels.findOne({_id: biomodelId});
		else
			return {title: false, description: false, photos: false, pic: false, full_description: false, price: false};

	},

	current_photo:function() {

		const index = Template.instance().photo_index.get();
		const biomodelId = Template.instance().data.id;
		if (Biomodels.findOne({_id: biomodelId})) {
			const biomodel = Biomodels.findOne({_id: biomodelId});
			const photo = biomodel.photos[index];

			return photo;
		}

	},

	optionsHelper:function() {

		return {
			collection: "biomodels",
			wysiwyg: true,
			title: "Кликни, чтобы редактировать"
		};

	}

});