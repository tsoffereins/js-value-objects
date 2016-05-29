(function()
{
	ValueObject.define('Gender', {

		/**
		 * Allow male and female as Boolean value (like stored in DB).
		 * 
		 * @param  string|int  value
		 * @return string
		 */
		parse: function(value)
		{
			if (value == 0 || value == 'm') return 'male';

			if (value == 1|| value == 'f') return 'female';
		},

		/**
		 * Determine if the value is either male or female.
		 * 
		 * @param  string  value
		 * @return Boolean
		 */
		validate: function(value)
		{
			return /^(male|female)$/.test(value);
		}
	});
})();