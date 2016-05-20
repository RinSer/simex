import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

Template.search.onCreated(function() {

	this.autorun(() => {
		if (Router.current().params.text) {

			const search_text = Router.current().params.text;
			
			this.subscribe('biomodelsSearchData', search_text);

		}	
	});

});

Template.search.helpers({

	biomodels:function() {

		return Biomodels.find();

	}

});