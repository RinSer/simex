import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection to store news
News = new Mongo.Collection('news');
// Set New collection schema
News.schema = new SimpleSchema({

	title: {type: String},
	photos: {type: [Object]},
	"photos.$.description": {type: String},
	"photos.$.url": {type: String},
	"photos.$.text": {type: String},
	link: {type: Object, optional: true},
	"link.url": {type: String},
	"link.text": {type: String},
	createdAt: {type: Date}

});

News.attachSchema(News.schema);

// Collection to store news page slogan data
NewsSlogan = new Mongo.Collection('newsslogan');
// Set NewsSlogan collection schema
NewsSlogan.schema = new SimpleSchema({

	title: {type: String},
	quote: {type: String},
	text: {type: String}

});

NewsSlogan.attachSchema(NewsSlogan.schema);

// Collection to store about data
About = new Mongo.Collection('about');
// Set About collection schema
About.schema = new SimpleSchema({

	title: {type: String},
	text: {type: String},
	quote: {type: Object},
	"quote.person": {type: String},
	"quote.text": {type: String}

});

About.attachSchema(About.schema);

// Collection to store validity data
Validity = new Mongo.Collection('validity');
// Set Validity collection schema
Validity.schema = new SimpleSchema({

	title: {type: String},
	text: {type: String},
	reference_title: {type: String},
	references: {type: String}

});

Validity.attachSchema(Validity.schema);

// Collection to store contacts data
Contacts = new Mongo.Collection('contacts');
// Set Contacts collection schema
Contacts.schema = new SimpleSchema({

	address: {type: String},
	email: {type: String},
	tel: {type: String},
	web: {type: String},
	location: {type: Object},
	"location.latitude": {type: Number, decimal: true},
	"location.longitude": {type: Number, decimal: true}

});

Contacts.attachSchema(Contacts.schema);