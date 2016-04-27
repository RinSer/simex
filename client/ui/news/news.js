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
	this.untouched = new ReactiveVar(true);
	const items = this.data.photos.length;

	function increment_counter() {

		
	}

	};

	while (this.untouched.get()) {

		if ()

	}

});

Template.each_news.helpers({

	photo:function() {

		const current_photo_number = Template.instance().slideCounter.get();
		const photos_total = Template.instance().data.photos.length;
		const photos = Template.instance().data.photos;

		console.log(photos[current_photo_number]);
		return photos[current_photo_number];

	}

});

Template.each_news.events({

	'click h2':function(event, template) {

		event.preventDefault();

		console.log(template);

	}

});