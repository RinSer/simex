import { Template } from 'meteor/templating';

Template.news.onCreated(function() {

	this.autorun(() => {
		this.subscribe('newsData');
	});

});

Template.news.helpers({

	news:function() {
		return News.find({});
	}

});