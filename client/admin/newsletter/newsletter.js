import { Template } from 'meteor/templating';

Template.newsletter.onCreated(function() {

	this.autorun(() => {
		this.subscribe('usersData');
	});

});

Template.newsletter.onRendered(function() {

	$('button#copy').click(function() {

		const text = $('p#emails').text();

		window.prompt("Чтобы копировать нажми: Ctrl+C, Enter", text);

	});

});

Template.newsletter.helpers({

	users:function() {

		return Meteor.users.find({news: true}, {fields: {emails: 1}});

	}

});