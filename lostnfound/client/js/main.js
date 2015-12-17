if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.lost_main.helpers({
    //counter: function () {
    //  return Session.get('counter');
    //}
  });

  Template.lost_main.events({
    //'click button': function () {
    //  // increment the counter when button is clicked
    //  Session.set('counter', Session.get('counter') + 1);
    //}
  });

  Template.lost_found.helpers({
    //counter: function () {
    //  return Session.get('counter');
    //}
  });

  Template.lost_found.events({
    //'click button': function () {
    //  // increment the counter when button is clicked
    //  Session.set('counter', Session.get('counter') + 1);
    //}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
