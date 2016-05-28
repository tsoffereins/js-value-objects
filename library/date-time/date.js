(function()
{
	ValueObject.create('Date', {

		/**
		 * The objects to extend.
		 * 
		 * @type object
		 */
		extend: Date,

		/**
		 * Create a date from the value.
		 * 
		 * @param  string  value
		 * @return Date
		 */
		parse: function(value)
		{
			return new Date(value);
		},

		/**
		 * Determine if the value is a valid date.
		 * 
		 * @param  Date  value
		 * @return Boolean
		 */
		validate: function(value)
		{
			return value != 'Invalid Date';
		}
	});
})();