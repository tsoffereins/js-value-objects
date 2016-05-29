(function()
{
	/**
	 * The regular expression used to detect youtube video URLs.
	 * 
	 * @type RegExp
	 */
	var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

	ValueObject.define('YoutubeVideoURL', {

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