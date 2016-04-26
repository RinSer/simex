import { Router } from 'meteor/iron:router';

Router.configure({

	layoutTemplate: 'SimexLayout'

});

Router.route('/', function() {

	this.render('news');

});