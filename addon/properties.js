import Ember from 'ember';

var setProperties = Ember.setProperties;
var getProperties = Ember.getProperties;

var Remember = Ember.ObjectProxy.extend({
	parentController: null,
	/**
	 * Restore properties to their original values
	 */
	revert: function() {
		var parentController = this.get('parentController');
		var remembered = this.get('content');
		setProperties(parentController, remembered);
	},
	/**
	 * Forget remembered values
	 */
	forget: function() {
		this.set('content', {});
	}
});

/**
 * Returns computed property that will evaluate to object that will store
 * values of specified properties at the time of initialization.
 * @params propName {string} - one or more properties to remember
 * @return 
 */
export default function rememberProperties() {
	var props = [].slice.call(arguments);

	function rememberHandler() {
		return Remember.create({
			parentController: this,
			content: getProperties(this, props)
		});
	}

	return Ember.computed(rememberHandler);
}

