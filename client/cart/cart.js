import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.cart_modal.onCreated(function() {

	this.autorun(() => {
		Session.set('stage', 0);
	});

});

Template.cart_modal.helpers({

	order:function() {

		if (Session.get('stage') > 0)
			return true;
		else
			return false;

	},

	placed:function() {

		if (Session.get('stage') === 2)
			return true;
		else
			return false;

	}

});

Template.cart_modal.events({

	'click .modal_exit':function(event, template) {

		Session.set('cart_modal', false);

	},

	'click .place_order':function(event, template) {

		if (Session.get('cart').biomodels.length > 0 || Session.get('cart').simulators.length > 0)
			Session.set('stage', 1);

	}

});

Template.cart.onCreated(function() {

	this.autorun(() => {
		this.subscribe('biomodelsCartData');
		this.subscribe('simulatorsCartData');

		const biomodelIds = Session.get('cart').biomodels;
		const simulatorIds = Session.get('cart').simulators;

		var items = {biomodels: [], simulators: []};

		if (biomodelIds.length > 0) {
			biomodelIds.forEach(function(id) {
				items.biomodels.push({biomodel: Biomodels.findOne({_id: id}), quantity: 1});
			});
		}

		if (simulatorIds.length > 0) {
			simulatorIds.forEach(function(id) {
				items.simulators.push({simulator: Simulators.findOne({_id: id}), quantity: 1});
			});
		}

		Session.set('order', items);
	});

});

Template.cart.helpers({

	biomodels:function() {

		return Session.get('order').biomodels;

	},

	simulators:function() {

		return Session.get('order').simulators;

	},

	total:function() {

		const biomodels = Session.get('order').biomodels;
		const simulators = Session.get('order').simulators;
		var total = 0;

		if (biomodels.length > 0) {
			biomodels.forEach(function(item) {
				total += Math.floor(item.biomodel.price*100)*item.quantity;
			});
		}

		if (simulators.length > 0) {
			simulators.forEach(function(item) {
				total += Math.floor(item.simulator.price*100)*item.quantity;
			});
		}

		return total/100;
	}

});

Template.biomodel_item.events({

	'click .remove_item':function(event, template) {

		var cart = Session.get('cart').biomodels;
		var order = Session.get('order').biomodels;
		const biomodelId = template.data.biomodel._id;
		var index;

		for (var i=0, len=order.length; i < len; i++) {

			if (order[i].biomodel._id.localeCompare(biomodelId) === 0) {
				index = i;
			}

		}

		cart.splice(index, 1);
		order.splice(index, 1);

		var session_cart = Session.get('cart');
		session_cart.biomodels = cart;
		Session.set('cart', session_cart);
		
		var session_order = Session.get('order');
		session_order.biomodels = order;
		Session.set('order', session_order);

	},

	'change input':function(event, template) {

		const new_quantity = event.currentTarget.value;
		var order = Session.get('order').biomodels;
		const biomodelId = template.data.biomodel._id;

		for (var i=0, len=order.length; i < len; i++) {

			if (order[i].biomodel._id.localeCompare(biomodelId) === 0) {
				order[i].quantity = new_quantity;
			}

		}

		var session_order = Session.get('order');
		session_order.biomodels = order;
		Session.set('order', session_order);
	}

});

Template.simulator_item.events({

	'click .remove_item':function(event, template) {

		var cart = Session.get('cart').simulators;
		var order = Session.get('order').simulators;
		const simulatorId = template.data.simulator._id;
		var index;

		for (var i=0, len=order.length; i < len; i++) {

			if (order[i].simulator._id.localeCompare(simulatorId) === 0) {
				index = i;
			}

		}

		cart.splice(index, 1);
		order.splice(index, 1);

		var session_cart = Session.get('cart');
		session_cart.simulators = cart;
		Session.set('cart', session_cart);
		
		var session_order = Session.get('order');
		session_order.simulators = order;
		Session.set('order', session_order);

	},

	'change input':function(event, template) {

		const new_quantity = event.currentTarget.value;
		var order = Session.get('order').simulators;
		const simulatorId = template.data.simulator._id;

		for (var i=0, len=order.length; i < len; i++) {

			if (order[i].simulator._id.localeCompare(simulatorId) === 0) {
				order[i].quantity = new_quantity;
			}

		}

		var session_order = Session.get('order');
		session_order.simulators = order;
		Session.set('order', session_order);
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

			const processed = false;
			const createdAt = new Date();

			order = {firstName, familyName, email, address, tel, processed, createdAt};

			if (secondName) order.secondName = secondName;

			if (Meteor.userId()) order.user = Meteor.userId();

			if (Session.get('order').biomodels) {

				order.biomodels = [];
				const biomodels = Session.get('order').biomodels;

				biomodels.forEach(function(item) {
					order.biomodels.push({
						biomodel: item.biomodel._id,
						quantity: item.quantity
					});
				});

			}

			if (Session.get('order').simulators) {

				order.simulators = [];
				const simulators = Session.get('order').simulators;

				simulators.forEach(function(item) {
					order.simulators.push({
						simulator: item.simulator._id,
						quantity: item.quantity
					});
				});

			}

			Meteor.call('addOrder', order, function(err, data) {

				if (err) {
					console.log(err);
				}
				else {
					Session.set('stage', 2);
					Session.set('cart', {biomodels:[],simulators:[]});
					Session.set('order', {});
				}

			});

		}
		else {
			$('.alert-note').show();
		}

	}

});