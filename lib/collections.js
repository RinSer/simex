import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Collection to store news
News = new Mongo.Collection('News');
// Set New collection schema
News.schema = new SimpleSchema({

	title: {type: String},
	photos: {type: [Object]},
	"photos.$.description": {type: String},
	"photos.$.url": {type: String},
	"photos.$.text": {type: String},
	createdAt: {type: Date}

});

News.attachSchema(News.schema);

