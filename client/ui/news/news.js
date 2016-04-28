import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Reactive } from 'meteor/reactive-var';

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

Template.each_news.onCreated(function() {

	this.slideCounter = new ReactiveVar(0);
	this.slide = new ReactiveVar(null);
	const items = this.data.photos.length;

	const interval = Math.floor(Math.random()*(8-3))+3;

	this.slide.set(Meteor.setInterval(() => {

		if (this.slideCounter.get() < items-1) {
			this.slideCounter.set(this.slideCounter.get()+1);
		}
		else {
			this.slideCounter.set(0);
		}

	}, interval*1000));

});

Template.each_news.helpers({

	photo:function() {

		const current_photo_number = Template.instance().slideCounter.get();
		const photos_total = Template.instance().data.photos.length;
		const photos = Template.instance().data.photos;

		return photos[current_photo_number];

	}

});

Template.each_news.events({

	'click .news':function(event, template) {

		event.preventDefault();

		Meteor.clearInterval(template.slide.get());

	},

	'click .news_img':function(event, template) {

		event.preventDefault();

		if (template.slideCounter.get() < template.data.photos.length-1) {
			template.slideCounter.set(template.slideCounter.get()+1);
		}
		else {
			template.slideCounter.set(0);
		}

	}

});