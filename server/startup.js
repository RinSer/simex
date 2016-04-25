import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // Create dev users
  const init_users = [
  	// Admin users
  	{
  		name: "Serj",
  		email: "serj.dukareff@gmail.com",
  		password: "simex",
  		admin: true
  	},
  	{
  		name: "Simex",
  		email: "simex@simex.train",
  		password: "biomodel",
  		admin: true
  	},
  	// Client users
  	{
        name: "test1",
        email: "test1@test.com",
        password: "123",
        address: "test1 address"
    },
    {
        name: "test2",
        email: "test2@test.com",
		password: "123",
        address: "test2 address"
    },
    {
        name: "test3",
        email: "test3@test.com",
        password: "123",
        address: "test3 address"
    },
    {
        name: "test4",
        email: "test4@test.com",
        password: "123",
        address: "test4 address"
    },
    {
        name: "test5",
        email: "test5@test.com",
        password: "123",
        address: "test5 address"
    }
  ];
  // Add users if none exist
  if (Meteor.users.find().count() === 0) {
  	_.each(init_users, function(user) {
  		Accounts.createUser(user);
  		console.log("Created user "+user.name);
  	});
  }
});
