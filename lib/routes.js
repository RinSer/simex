import { Router } from 'meteor/iron:router';

Router.configure({

	layoutTemplate: 'SimexLayout'

});

Router.route('/', function() {

	this.render('news');

});

Router.route('/about', function() {

	this.render('about');

});

Router.route('/validity', function() {

	this.render('validity');

});

Router.route('/contacts', function() {

	this.render('contacts');

});