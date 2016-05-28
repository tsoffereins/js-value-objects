(function()
{
	ValueObject.create('Age', {

		/**
		 * The objects to extend.
		 * 
		 * @type object
		 */
		extend: Number,

		/**
		 * Parse the age to an integer.
		 * 
		 * @param  string|int  value
		 * @return int
		 */
		parse: function(value)
		{
			return parseInt(value);
		},

		/**
		 * Determine if the value is either male or female.
		 * 
		 * @param  ValueObject.Literal.Integer  value
		 * @return Boolean
		 */
		validate: function(value)
		{
			return value < 120 && value >= 0;
		}
	});
})();