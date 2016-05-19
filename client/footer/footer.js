Template.footer.onCreated(function() {

	this.autorun(() => {
		this.subscribe('footerContacts');
	});

});

Template.footer.helpers({

	tel:function() {

		if (Contacts.findOne())
			return Contacts.findOne().tel;

	},

	email:function() {

		if (Contacts.findOne())
			return Contacts.findOne().email;

	}

});