import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

Meteor.methods({

	// Send an email
	sendEmail: function (mail) {

		check([mail.to, mail.from, mail.subject, mail.text], [String]);
		// Let other method calls from the same client start running,
	    // without waiting for the email sending to complete.
	    // this.unblock();

	    
	   
		    console.log(process.env.MAIL_URL);
		    Email.send({
		    	to: mail.to,
		    	from: mail.from,
		    	subject: mail.subject,
		    	text: mail.text
		    });

	    
	}

});