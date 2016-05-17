import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveArray } from 'meteor/templates:array';
import { Meteor } from 'meteor/meteor';

Template.biomodels.onCreated(function() {

	this.autorun(() => {
		this.subscribe('biomodelsData');
		if (Meteor.user()) {
			if (Meteor.user().admin)
				this.new_biomodel = new ReactiveVar(false);
		}
	});

});

Template.biomodels.helpers({

	biomodels:function() {

		return Biomodels.find({});

	},

	admin:function() {

		if (Meteor.user()) {

			let user = Meteor.user();

			return user.admin;

		}

	},

	add_biomodel:function() {

		return Template.instance().new_biomodel.get();

	}

});

Template.biomodels.events({

	'click .biomodel_add':function(event, template) {

		const new_biomodel = template.new_biomodel.get();

		template.new_biomodel.set(!new_biomodel);

	}

});

Template.new_biomodel.onCreated(function() {

	this.add_biomodel_photo = new ReactiveVar(false);
	this.photos = new ReactiveArray();

});

Template.new_biomodel.helpers({

	add_biomodel_photo:function() {

		return Template.instance().add_biomodel_photo.get();

	},

	photos:function() {

		return Template.instance().photos.get();

	}

});

Template.new_biomodel.events({

	'click .add_biomodel_photos':function(event, template) {

		template.add_biomodel_photo.set(!template.add_biomodel_photo.get());

	},

	'click .add_biomodel_photo':function(event, template) {

		const photo_url = template.find('[name=biomodel_photo]').value;

		template.photos.push(photo_url);

		template.find('[name=biomodel_photo]').value = '';

	},

	'click .biomodel_remove_photo':function(event, template) {

		const photo_index = event.currentTarget.getAttribute('class')[0];

		template.photos.splice(photo_index, 1);

	},

	'click .save_biomodel':function(event, template) {

		const title = template.find('[name=biomodel_title]').value;
		const description = template.find('[name=biomodel_description]').value;
		const full_description = template.find('[name=biomodel_full_description]').value;
		const price = template.find('[name=biomodel_price]').value;
		const pic = template.find('[name=biomodel_pic]').value;
		const photos = template.photos.get();

		Meteor.call('addBiomodel', {title, description, full_description, price, pic, photos}, 
			function(err, data) {
				if (err) {
					console.log(err);
				}
				else {
					template.find('[name=biomodel_title]').value = '';
					template.find('[name=biomodel_description]').value = '';
					template.find('[name=biomodel_full_description]').value = '';
					template.find('[name=biomodel_price]').value = '';
					template.find('[name=biomodel_pic]').value = '';
					template.photos.set([]);

					template.add_biomodel_photo.set(false);
				}
		});

	}

});

Template.each_biomodel.onCreated(function() {

	this.autorun(() => {
		this.added = new ReactiveVar(false);
	});

});

Template.each_biomodel.helpers({

	admin:function() {

		if (Meteor.user()) {

			let user = Meteor.user();

			return user.admin;

		}

	},

	added:function() {

		return Template.instance().added.get();

	}

});

Template.each_biomodel.events({

	'click .delete_biomodel':function(event, template) {

		Meteor.call('deleteBiomodel', template.data._id);

	},

	'click .add_to_cart':function(event, template) {

		var cart = Session.get('cart');
		cart.push(template.data._id);
		Session.set('cart', cart);
		template.added.set(true);

	}

});

Template.biomodel.onCreated(function() {

	this.autorun(() => {
		if (Router.current().params.id) {
			Session.set('photo_index', 0);
			this.data.id = Router.current().params.id;
			this.subscribe('biomodelData', this.data.id);
			$('.cart_alert').hide();
		}
	});

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

		const biomodelId = Template.instance().data.id;
		const index = Session.get('photo_index');
		if (Biomodels.findOne({_id: biomodelId})) {
			let biomodel = Biomodels.findOne({_id: biomodelId});
			if (biomodel.photos) {
				return biomodel.photos[index];
			}
			else {
				return null;
			}
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

Template.biomodel.events({

	'click .add_to_cart':function(event, template) {

		var cart = Session.get('cart');
		cart.push(template.data.id);
		Session.set('cart', cart);
		$('.cart_alert').show();

	}

});

Template.biomodel_img.onRendered(function() {

	$('.biomodel_img').click(function() {
		$('.current_img').removeClass('current_img');
		$(this).addClass('current_img');
	});

});

Template.biomodel_img.helpers({

	current:function() {

		let main_photo = Template.instance().data.current_photo;
		const this_photo = Template.instance().data.photo;

		if (this_photo.localeCompare(main_photo) === 0) {
			return true;
		}
		else {
			return false;
		}

	}

});

Template.biomodel_img.events({

	'click .biomodel_img':function(event, template) {

		const this_img = event.currentTarget;
		let main_img_index = $(this_img).attr('class')[0];

		Session.set('photo_index', main_img_index);

	}

});