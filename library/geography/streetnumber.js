(function()
{
	ValueObject.create('Streetnumber', {

		/**
		 * Parse the value by removing spaces and making it uppercase.
		 * 
		 * @param  string  value
		 * @return string
		 */
		parse: function(value)
		{
			return value.toUpperCase().replace(/\s+/, '');
		},

		/**
		 * Determine if the value consists of: 4 digits, 1 space and 2 uppercase characters.
		 * 
		 * @param  string  value
		 * @return Boolean
		 */
		validate: function(value)
		{
			return /^[\d]+([A-Z]{1})?$/.test(value);
		}
	});
})();