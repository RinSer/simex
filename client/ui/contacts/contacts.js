import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { GoogleMaps } from 'meteor/dburles:google-maps';

Template.contacts.onCreated(function() {

	this.autorun(() => {
		this.subscribe('contactsData');

		GoogleMaps.ready('simexMap', function(map) {

			let marker = new google.maps.Marker({
				position: map.options.center,
				map: map.instance,
				title: "SIMEX"
			});

		});
	});

});

Template.contacts.onRendered(function() {

	GoogleMaps.load();

});

Template.contacts.helpers({

	contacts:function() {

		if (Contacts.findOne())
			return Contacts.findOne();
		else
			return {address: false, email: false, tel: false, web: false,
				location: {latitude: false, longitude: false}};

	},

	optionsHelper:function() {

		return {
			collection: "contacts",
			wysiwyg: true,
			title: "Кликни, чтобы редактировать"
		};

	},

	admin:function() {

		if (Meteor.user())
			return Meteor.user().admin;
		else
			return false;

	},

	mapOptions:function() {

		if (GoogleMaps.loaded() && Contacts.findOne()) {

			let lat = Contacts.findOne().location.latitude;
			let lng = Contacts.findOne().location.longitude;
			return {
				center: new google.maps.LatLng(lat, lng),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

		}

	}

});

Template.contacts.events({

	'click button.contacts_reload':function(event, template) {

		document.location.reload(true);

	}

});