(function()
{
	/**
	 * The regular expression used to validate an email address.
	 * 
	 * @type RegExp
	 */
	var regex = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
	
	ValueObject.create('URL', {

		/**
		 * The objects to extend.
		 * 
		 * @type object
		 */
		extend: String,

		/**
		 * Allow urls without http(s) to be passed, but make sure it will be there.
		 * 
		 * @param  string  value
		 * @return string
		 */
		parse: function(value)
		{
			if ( ! /^(https?).*$/.test(value))
			{
				value = 'http://' + value;
			}

			return value;
		},

		/**
		 * Determine if the value is a valid URL.
		 * 
		 * @param  string  value
		 * @return Boolean
		 */
		validate: function(value)
		{
			return regex.test(value);
		}
	});
})();