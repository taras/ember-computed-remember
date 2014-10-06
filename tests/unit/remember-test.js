import Ember from 'ember';
import rememberProperties from 'ember-computed-remember/properties';

module('remember computed property');

test('remembers specified properties', function(){

	var Elephant = Ember.Object.extend({
		remembered: rememberProperties('age', 'name', 'color'),
		remember: function() {
			this.get('remembered');
		}.on('init')
	});

	var jumbo = Elephant.create({
		name: 'Jumbo',
		age: 31,
		color: 'grey'
	});

	equal(jumbo.get('remembered.name'), 'Jumbo');
	equal(jumbo.get('remembered.age'), 31);

	jumbo.set('name', 'Jumbo Sr');
	jumbo.set('age', 80);

	equal(jumbo.get('name'), 'Jumbo Sr');
	equal(jumbo.get('age'), 80);
	equal(jumbo.get('remembered.name'), 'Jumbo', 'rememberd value is unchanged after initial value is changed');
	equal(jumbo.get('remembered.age'), 31, 'remembered value is unchanged after initial value is changed');

});

test('can revert to original values', function(){

	var Elephant = Ember.Object.extend({
		remembered: rememberProperties('age', 'name', 'color'),
		remember: function() {
			this.get('remembered');
		}.on('init')
	});

	var jumbo = Elephant.create({
		name: 'Jumbo',
		age: 31,
		color: 'grey'
	});

	jumbo.set('name', 'Jumbo Sr');
	jumbo.set('age', 80);

	equal(jumbo.get('name'), 'Jumbo Sr');
	equal(jumbo.get('age'), 80);

	jumbo.get('remembered').revert();

	equal(jumbo.get('name'), 'Jumbo', 'restore copied original values');
	equal(jumbo.get('age'), 31, 'restore copied original values');

});

test('can forget original values', function() {

	var Elephant = Ember.Object.extend({
		remembered: rememberProperties('age', 'name', 'color'),
		remember: function() {
			this.get('remembered');
		}.on('init')
	});

	var jumbo = Elephant.create({
		name: 'Jumbo',
		age: 31,
		color: 'grey'
	});

	jumbo.set('name', 'Jumbo Sr');
	jumbo.set('age', 80);

	jumbo.get('remembered').forget();

	equal(jumbo.get('remembered.name'), void 0);
	equal(jumbo.get('remembered.age'), void 0);
});

