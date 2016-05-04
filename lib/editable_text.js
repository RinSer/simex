import { EditableText } from 'meteor/babrahams:editable-text';
import { Meteor } from 'meteor/meteor';

EditableText.userCanEdit = function(doc, Collection) {

	if (Meteor.user())
		return Meteor.user().admin;

}