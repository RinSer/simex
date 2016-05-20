import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveArray } from 'meteor/templates:array';

Template.news.onCreated(function() {

	this.autorun(() => {
		this.subscribe('newsData');
	});

	this.addNews = new ReactiveVar(false);

});

Template.news.helpers({

	news:function() {
		return News.find({}, {sort: {createdAt: -1}});
	},

	admin:function() {

		if (Meteor.user()) {

			if (Meteor.user().admin)
				return true;

		}

		return false;

	},

	add_news:function() {

		return Template.instance().addNews.get();

	}

});

Template.news.events({


	'click .news_add':function(event, template) {

		event.preventDefault();

		template.addNews.set(!template.addNews.get());

	}

});

Template.news_quote.onCreated(function() {

	this.autorun(() => {
		this.subscribe('newsSloganData');
	});

});

Template.news_quote.helpers({

	slogan:function() {
		if (NewsSlogan.findOne())
			return NewsSlogan.findOne();
		else
			return {title: false, quote: false, text: false};
	},

	optionsHelper:function() {

		return {
			collection: "newsslogan",
			wysiwyg: true,
			title: "Кликни, чтобы редактировать"
		};

	}

});

Template.each_news.onCreated(function() {

	this.slideCounter = new ReactiveVar(0);
	this.slide = new ReactiveVar(null);
	const items = this.data.photos.length;

	const interval = Math.floor(Math.random()*(8-3))+3;

	this.slide.set(Meteor.setInterval(() => {

		if (this.slideCounter.get() < items-1) {
			$('.'+this.data._id+' i.fa-circle').addClass('fa-circle-o').removeClass('fa-circle');
			this.slideCounter.set(this.slideCounter.get()+1);
			$('.'+this.data._id+' i.'+this.slideCounter.get()).removeClass('fa-circle-o').addClass('fa-circle');
		}
		else {
			$('.'+this.data._id+' i.fa-circle').addClass('fa-circle-o').removeClass('fa-circle');
			this.slideCounter.set(0);
			$('.'+this.data._id+' i.'+this.slideCounter.get()).removeClass('fa-circle-o').addClass('fa-circle');
		}

	}, interval*1000));

});

Template.each_news.onRendered(function() {

	$('.'+this.data._id+' i.'+this.slideCounter.get()).removeClass('fa-circle-o').addClass('fa-circle');

});

Template.each_news.helpers({

	photo:function() {

		const current_photo_number = Template.instance().slideCounter.get();
		const photos_total = Template.instance().data.photos.length;
		const photos = Template.instance().data.photos;

		return photos[current_photo_number];

	},

	admin:function() {

		if (Meteor.user()) {

			if (Meteor.user().admin)
				return true;

		}

		return false;

	},

	mobile:function() {

		return (window.outerWidth < 768);

	}

});

Template.each_news.events({

	'click .news':function(event, template) {

		Meteor.clearInterval(template.slide.get());

	},

	'click .news_img':function(event, template) {

		Meteor.clearInterval(template.slide.get());

		if (template.slideCounter.get() < template.data.photos.length-1) {
			$('.'+template.data._id+' i.fa-circle').addClass('fa-circle-o').removeClass('fa-circle');
			template.slideCounter.set(template.slideCounter.get()+1);
			$('.'+template.data._id+' i.'+template.slideCounter.get()).removeClass('fa-circle-o').addClass('fa-circle');
		}
		else {
			$('.'+template.data._id+' i.fa-circle').addClass('fa-circle-o').removeClass('fa-circle');
			template.slideCounter.set(0);
			$('.'+template.data._id+' i.'+template.slideCounter.get()).addClass('fa-circle');
		}

	},

	'click .news_dot':function(event, template) {

		event.preventDefault();

		Meteor.clearInterval(template.slide.get());

		const current_dot = event.currentTarget.getAttribute('class')[0];

		$('.'+template.data._id+' i.fa-circle').addClass('fa-circle-o').removeClass('fa-circle');
		template.slideCounter.set(current_dot);
		$('.'+template.data._id+' i.'+template.slideCounter.get()).addClass('fa-circle');

	},

	'click .news_remove':function(event, template) {

		event.preventDefault();

		Meteor.call('deleteNews', template.data._id, function(err, data) {

			if (err)
				console.log(err);

		});

	}

});

Template.new_news.onCreated(function() {

	this.addPhoto = new ReactiveVar(false);
	this.photos = new ReactiveArray();

	$(document).keyup(function(event) {

		event.preventDefault();

	});

});

Template.new_news.helpers({

	add_photo:function() {

		return Template.instance().addPhoto.get();

	},

	photos:function() {

		return Template.instance().photos.get();

	}

});

Template.new_news.events({

	'click button.news_add_photo':function(event, template) {

		event.preventDefault();

		template.addPhoto.set(!template.addPhoto.get());

	},

	'submit form.photo':function(event, template) {

		event.preventDefault();

		const description = event.target.description.value;
		const url = event.target.url.value;
		const text = event.target.text.value;

		template.photos.push({description, url, text});

		template.find('form.photo').reset();

	},

	'click .news_delete_photo':function(event, template) {

		event.preventDefault();

		const index = event.currentTarget.getAttribute('class')[0];

		template.photos.splice(index, 1);

	},

	'click .news_save':function(event, template) {

		const title = template.find('[name=title]').value;

		let link = null;
		if (template.find('[name=link]').checked) {
			const link_url = template.find('[name=link_url]').value;
			const link_text = template.find('[name=link_text]').value;
			link = {
				url: link_url,
				text: link_text
			};
		}

		const date = new Date();

		const doc = {

			title: title,
			photos: template.photos.get(),
			createdAt: date

		};

		if (link) {
			doc.link = link;
		}

		Meteor.call('addNews', doc, function(err, data) {

			if (!err) {
				template.photos = new ReactiveArray();
				template.addPhoto.set(false);
			}
			else {
				console.log(err);
			}

		});

		document.location.reload(true);

	}

});