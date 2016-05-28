(function()
{
	ValueObject.create('DateRange', {

		/**
		 * Create a date from the value.
		 * 
		 * @param  array  value
		 * @return object
		 */
		parse: function(value)
		{
			value = new Object(value);
			
			return { start: new Date(value[0]), end: new Date(value[1]) };
		},

		/**
		 * Determine if the value is a valid date range.
		 * 
		 * @param  object  value
		 * @return Boolean
		 */
		validate: function(value)
		{
			return typeof value === 'object'
				&& value.start != 'Invalid Date' 
				&& value.end != 'Invalid Date' 
				&& value.start < value.end;
		},

		/**
		 * Get the start date of the range.
		 * 
		 * @return Date
		 */
		getStartDate: function()
		{
			return this.value.start;
		},

		/**
		 * Get the end date of the range.
		 * 
		 * @return Date
		 */
		getEndDate: function()
		{
			return this.value.end;
		},

		/**
		 * Get the range timespan in milliseconds.
		 * 
		 * @return int
		 */
		getTime: function()
		{
			return this.value.end - this.value.start;
		},

		/**
		 * Get the range timespan in seconds.
		 * 
		 * @return number
		 */
		getSeconds: function()
		{
			return this.getTime() / 1000;
		},

		/**
		 * Get the range timespan in minutes.
		 * 
		 * @return number
		 */
		getMinutes: function()
		{
			return this.getSeconds() / 60;
		},

		/**
		 * Get the range timespan in hours.
		 * 
		 * @return number
		 */
		getHours: function()
		{
			return this.getMinutes() / 60;
		},

		/**
		 * Get the range timespan in days.
		 * 
		 * @return number
		 */
		getDays: function()
		{
			return this.getHours() / 24;
		},

		/**
		 * Get the range timespan in months.
		 * 
		 * @return number
		 */
		getMonths: function()
		{
			return this.getDays() / 31;
		},

		/**
		 * Get the range timespan in years.
		 * 
		 * @return number
		 */
		getYears: function()
		{
			return this.getMonths() / 12;
		},

		/**
		 * Determine if a given date is in the date range.
		 * 
		 * @param  Date|string  date
		 * @return Boolean
		 */
		isDateInRange: function(date)
		{
			date = date instanceof Date ? date : new Date(date);

			return date >= this.value.start && date <= this.value.end;
		}
	});
})();