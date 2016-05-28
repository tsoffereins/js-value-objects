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
(function()
{
	ValueObject.create('Zipcode', {

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
(function()
{
	ValueObject.create('Gender', {

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
(function()
{
	/**
	 * The regular expression used to detect vimeo video URLs.
	 * 
	 * @type RegExp
	 */
	var regex = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;

	ValueObject.create('VimeoVideoURL', {

		/**
		 * The objects to extend.
		 * 
		 * @type object
		 */
		extend: String,

		/**
		 * Determine if the value is a valid youtube video URL.
		 * 
		 * @param  string  value
		 * @return Boolean
		 */
		validate: function(value)
		{
			return regex.test(value);
		},

		/**
		 * Get the id of the video from the URL.
		 * 
		 * @return string
		 */
		getVideoID: function()
		{
			var matches = this.value.match(regex);

			return matches.pop();
		}
	});
})();
(function()
{
	/**
	 * The regular expression used to detect youtube video URLs.
	 * 
	 * @type RegExp
	 */
	var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

	ValueObject.create('YoutubeVideoURL', {

		/**
		 * The objects to extend.
		 * 
		 * @type object
		 */
		extend: String,

		/**
		 * Determine if the value is a valid youtube video URL.
		 * 
		 * @param  string  value
		 * @return Boolean
		 */
		validate: function(value)
		{
			return regex.test(value);
		},

		/**
		 * Get the id of the video from the URL.
		 * 
		 * @return string
		 */
		getVideoID: function()
		{
			var matches = this.value.match(regex);

			return matches[1];
		}
	});
})();
(function()
{
	/**
	 * The regular expression used to validate an email address.
	 * 
	 * @type RegExp
	 */
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	ValueObject.create('Email', {

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