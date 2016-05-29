(function()
{
	/**
	 * The regular expression used to detect vimeo video URLs.
	 * 
	 * @type RegExp
	 */
	var regex = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;

	ValueObject.define('VimeoVideoURL', {

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