# ember-computed-remember

This addon provides computed property that remembers values at a specific point so that they could be restored later.

```javascript
import rememberProperties from 'ember-computed-remember/properties';

var Elephant = Ember.Object.extend({
	// specify what properties to remember
	remembered: rememberProperties('age', 'name', 'color'), 
	// when would you like these properties to be remembered?
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

jumbo.get('name');
> Jumbo Sr

jumbo.get('remembered.name');
// > Jumbo

// revert the values
jumbo.get('remembered').revert();

jumbo.get('name');
// > Jumbo

```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
