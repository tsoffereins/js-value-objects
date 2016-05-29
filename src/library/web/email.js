(function()
{
	/**
	 * The regular expression used to validate an email address.
	 * 
	 * @type RegExp
	 */
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	ValueObject.define('Email', {

		/**
		 * The objects to extend.
		 * 
		 * @type object
		 */
		extend: String,

		/**
		 * Determine if the value is a valid email address.
		 * 
		 * @param  string  value
		 * @return Boolean
		 */
		validate: function(value)
		{
			return regex.test(value);
		},

		/**
		 * Get the domain part of the email address.
		 * 
		 * @return string
		 */
		getDomain: function()
		{
			return this.value.split('@').pop();
		},

		/**
		 * Get the local part of the email address.
		 * 
		 * @return string
		 */
		getLocal: function()
		{
			return this.value.split('@').shift();
		}
	});
})();