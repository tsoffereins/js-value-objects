(function()
{
	ValueObject.define('Zipcode', {

		/**
		 * Allow zipcodes to be entered with or without a space and case insensitive.
		 * 
		 * @param  string  value
		 * @return string
		 */
		parse: function(value)
		{
			if (value.indexOf(' ') === -1)
			{
				value = value.substr(0, 4) + ' ' + value.substr(4, 2);
			}

			return value.toUpperCase().replace(/\s+/, ' ');
		},

		/**
		 * Determine if the value consists of: 4 digits, 1 space and 2 uppercase characters.
		 * 
		 * @param  string  value
		 * @return Boolean
		 */
		validate: function(value)
		{
			return /^[\d]{4} [A-Z]{2}$/.test(value);
		}
	});
})();