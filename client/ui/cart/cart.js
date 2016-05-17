import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';

Template.cart_modal.onCreated(function() {

	this.autorun(() => {
		this.stage = new ReactiveVar(0);
	});

});

Template.cart_modal.helpers({

	order:function() {

		if (Template.instance().stage.get() == 1)
			return true;

	}

});

Template.cart_modal.events({

	'click .modal_exit':function(event, template) {

		Session.set('cart_modal', false);

	},

	'click .place_order':function(event, template) {

		if (Session.get('cart').length > 0)
			template.stage.set(1);

	}

});

Template.cart.onCreated(function() {

	this.autorun(() => {
		this.subscribe('biomodelsCartData');

		//const ids = ["t5fMkjdBbvQkZhqCP", "SW44J4eTk7Y8ykGQ4"];
		const ids = Session.get('cart');

		var items = [];

		ids.forEach(function(id) {
			items.push({biomodel: Biomodels.findOne({_id: id}), quantity: 1});
		});

		Session.set('order', items);
	});

});

Template.cart.helpers({

	items:function() {

		return Session.get('order');

	},

	total:function() {

		const order = Session.get('order');
		var total = 0;

		order.forEach(function(item) {
			total += Math.floor(item.biomodel.price*100)*item.quantity;
		});

		return total/100;
	}

});

Template.cart_item.events({

	'click .remove_item':function(event, template) {

		var cart = Session.get('cart');
		var order = Session.get('order');
		const biomodelId = template.data.biomodel._id;
		var index;

		for (var i=0, len=order.length; i < len; i++) {

			if (order[i].biomodel._id.localeCompare(biomodelId) === 0) {
				index = i;
			}

		}

		cart.splice(index, 1);
		order.splice(index, 1);

		Session.set('cart', cart);
		Session.set('order', order);

	},

	'change input':function(event, template) {

		const new_quantity = event.currentTarget.value;
		var order = Session.get('order');
		const biomodelId = template.data.biomodel._id;

		for (var i=0, len=order.length; i < len; i++) {

			if (order[i].biomodel._id.localeCompare(biomodelId) === 0) {
				order[i].quantity = new_quantity;
				console.log(order[i]);
			}

		}

		Session.set('order', order);
	}

});

Template.order_form.onRendered(function() {

	if (Meteor.user()) {

		const user = Meteor.user();

		this.find('[name=firstName]').value = user.firstName;
		if (user.secondName)
			this.find('[name=secondName]').value = user.secondName;
		this.find('[name=familyName]').value = user.familyName;
		this.find('[name=email]').value = user.emails[0].address;
		if (user.address)
			this.find('[name=address]').value = user.address;

	}

});

Template.order_form.events({

	'submit form':function(event, template) {

		event.preventDefault();

		const firstName = event.target.firstName.value;
		const secondName = event.target.secondName.value;
		const familyName = event.target.familyName.value;
		const email = event.target.email.value;
		const address = event.target.address.value;
		const tel = event.target.tel.value;

		if (firstName && familyName && email && address && tel) {

		}
		else {
			$('.alert-note').show();
		}

	}

});