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

Template.contact_form.onRendered(function() {

	if (Meteor.user()) {

		const user = Meteor.user();

		this.find('[name=surname]').value = user.familyName;
		this.find('[name=name]').value = user.firstName;
		if (user.secondName)
			this.find('[name=sndname]').value = user.secondName;
		this.find('[name=email]').value = user.emails[0].address;

	}

});

Template.contact_form.events({

	'submit form.contact_form':function(event, template) {

		event.preventDefault();

		const surname = event.target.surname.value;
		const name = event.target.name.value;
		const sndname = event.target.sndname.value;  // Optional
		const email = event.target.email.value;
		const tel = event.target.tel.value;  // Optional
		const theme = event.target.theme.value;
		const message = event.target.message.value;
		const date = new Date();

		// Add form to app DB
		let form = {
			familyName: surname,
			firstName: name,
			email: email,
			theme: theme,
			message: message,
			processed: false,
			createdAt: date
		}

		if (sndname) form.secondName = sndname;
		if (tel) form.tel = tel;
		if (Meteor.userId()) form.user = Meteor.userId();

		// Send form to email

		if (surname && name && email && theme && message) {

			let signed_message = message+"\n\n"+name+" "+sndname+" "+surname+", "+date;
			if (tel) {
				signed_message += ", тел."+tel;
			}

			const mail = {
				to: "serj.dukareff@gmail.com",
				from: email,
				subject: "Контактная форма: "+theme,
				text: signed_message
			}

			// Send form to the DB and email
			Meteor.call('addCform', form);
			//Meteor.call('sendEmail', mail);

			// Clear form and show alert note
			template.find('form.contact_form').reset();
			$('.alert-note').hide();
			$('p.contact_form_sent').show();

		}
		else {
			$('.alert-note').show();
			$('p.contact_form_sent').hide();
		}
		
	}

});