import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection to store start page heading
StartHeading = new Mongo.Collection('startheading');
// Set StartHeading collection schema
StartHeading.schema = new SimpleSchema({

	text: {type: String}

});

StartHeading.attachSchema(StartHeading.schema);

// Collection to store start page data
Start = new Mongo.Collection('start');
// Set Start collection schema
Start.schema = new SimpleSchema({

	title: {type: String},
	description: {type: String},
	photo: {type: String}

});

Start.attachSchema(Start.schema);

// Collection to store biomodels
Biomodels = new Mongo.Collection('biomodels');
// Set Biomodels collection schema
Biomodels.schema = new SimpleSchema({

	title: {type: String},
	description: {type: String},
	full_description: {type: String},
	photos: {type: [String]},
	pic: {type: String},
	price: {type: Number, decimal: true}

});

Biomodels.attachSchema(Biomodels.schema);

// Collection to store simulators
Simulators = new Mongo.Collection('simulators');
// Set Simulators collection schema
Simulators.schema = new SimpleSchema({

	title: {type: String},
	description: {type: String},
	photo: {type: String},
	price: {type: Number, decimal: true}

});

Simulators.attachSchema(Simulators.schema);

// Collection to store product descriptions
ProductInfo = new Mongo.Collection('productinfo');
// Set ProductInfo schema
ProductInfo.schema = new SimpleSchema({

	product: {type: String},
	text: {type: String}

});

ProductInfo.attachSchema(ProductInfo.schema);

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

// Collection to store manual data
ManualSteps = new Mongo.Collection('manualsteps');
// Set ManualSteps collection schema
ManualSteps.schema = new SimpleSchema({

	index: {type: Number},
	description: {type: String},
	photos: {type: [String]}

});

ManualSteps.attachSchema(ManualSteps.schema);

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

// Collection to store contact forms
Cforms = new Mongo.Collection('cforms');
// Set Cforms collection schema
Cforms.schema = new SimpleSchema({

	user: {type: String, optional: true},
	familyName: {type: String},
	firstName: {type: String},
	secondName: {type: String, optional: true},
	email: {type: String},
	tel: {type: String, optional: true},
	theme: {type: String},
	message: {type: String},
	processed: {type: Boolean},
	createdAt: {type: Date}

});

Cforms.attachSchema(Cforms.schema);

// Collection to store orders
Orders = new Mongo.Collection('orders');
// Set orders collection schema
Orders.schema = new SimpleSchema({

	user: {type: String, optional: true},
	familyName: {type: String},
	firstName: {type: String},
	secondName: {type: String, optional: true},
	email: {type: String},
	address: {type: String},
	tel: {type: String},
	biomodels: {type: [Object], optional: true},
	"biomodels.$.biomodel": {type: String},
	"biomodels.$.quantity": {type: Number},
	simulators: {type: [Object], optional: true},
	"simulators.$.simulator": {type: String},
	"simulators.$.quantity": {type: Number},
	total: {type: Number, decimal: true},
	processed: {type: Boolean},
	createdAt: {type: Date}

});

Orders.attachSchema(Orders.schema);