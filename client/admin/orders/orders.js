import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

Template.orders.onCreated(function() {

	this.autorun(() => {
		this.subscribe('ordersData');
	});

	this.status = new ReactiveVar(0);

});

Template.orders.onRendered(function() {

	$('section.orders li').click(function() {

		$('li.current').removeClass('current');
		$(this).addClass('current');

	});

});

Template.orders.helpers({

	orders:function() {

		if (Orders.find().count() > 0) {

			switch (Template.instance().status.get()) {

				case 0:
					return Orders.find({}, {sort:{createdAt: -1}});
				case 1:
					return Orders.find({processed: false}, {sort:{createdAt: -1}});
				case 2:
					return Orders.find({processed: true}, {sort:{createdAt: -1}});
					
			}

		}

	}

});

Template.orders.events({

	'click .all_orders':function(event, template) {

		template.status.set(0);

	},

	'click .new_orders':function(event, template) {

		template.status.set(1);

	},

	'click .processed_orders':function(event, template) {

		template.status.set(2);

	}

});

Template.order.onCreated(function() {

	this.autorun(() => {
		this.subscribe('ordersData');
	});

});

Template.order.helpers({

	biomodels:function() {

		if (Template.instance().data) {

			Template.instance().subscribe('biomodelsCartData');
			
			var biomodels = [];

			if (Template.instance().data.biomodels.length > 0) {
				
				Template.instance().data.biomodels.forEach(function(item) {

					let biomodel = Biomodels.findOne({_id: item.biomodel});
					let quantity = item.quantity;
					biomodels.push({biomodel, quantity});

				});

			}

			if (biomodels.length > 0)
				return biomodels;
			else
				return false;

		}

	},

	simulators:function() {

		if (Template.instance().data) {

			Template.instance().subscribe('simulatorsCartData');
			
			var simulators = [];

			if (Template.instance().data.simulators.length > 0) {
				
				Template.instance().data.simulators.forEach(function(item) {

					let simulator = Simulators.findOne({_id: item.simulator});
					let quantity = item.quantity;
					simulators.push({simulator, quantity});

				});

			}

			return simulators;

		}

	}

});

Template.order.events({

	'change .processed':function(event, template) {

		event.preventDefault();

		const id = template.data._id;
		const processed = !template.data.processed;

		Meteor.call('changeOrderStatus', id, processed);

	},

	'click a.back':function(event, template) {

		event.preventDefault();

		history.back();

	}

});