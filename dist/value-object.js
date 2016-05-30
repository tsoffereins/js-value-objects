(function(root)
{
	/**
	 * Construct a new ValueObject.
	 * 
	 * @param  mixed  value
	 * @return object
	 */
	var ValueObject = root.ValueObject = function(value)
	{
		// To prevent the value from being changed we will assign it as an immutable 
		// property to the object. First it will be parsed to allow a bigger range 
		// of input. The original value will be stored seperately.
		defineImmutable(this, 'value', this.parse(value));

		defineImmutable(this, 'original', value);

		// The object can only exist with a valid value. If the value does not pass the
		// validation we will throw an exception. We allow custom exception handling,
		// but we have to make sure an exception is thrown, even if custom doesn't.
		if ( ! this.validate(this.value))
		{
			this.throwException();

			throw new InvalidValueException(this);
		}
	};

	/**
	 * Get the value of the object.
	 * 
	 * @return mixed
	 */
	ValueObject.prototype.valueOf = function()
	{
		return this.value;
	};

	/**
	 * Convert the object to a string.
	 * 
	 * @return string
	 */
	ValueObject.prototype.toString = function()
	{
		return this.value;
	};

	/**
	 * Parse the value before assigning it.
	 * 
	 * @param  mixed  value
	 * @return mixed
	 */
	ValueObject.prototype.parse = function(value)
	{
		return value;
	};

	/**
	 * Throw a custom exception.
	 * 
	 * @return void
	 */
	ValueObject.prototype.throwException = function()
	{
		// 
	};

	/**
	 * A map object used to store all created value objects.
	 * 
	 * @type object
	 */
	ValueObject.library = Object.create(null);

	/**
	 * Define a new ValueObject.
	 * 
	 * @param  string  name
	 * @param  function|object  definition
	 * @return object
	 */
	ValueObject.define = function(name, definition)
	{
		name = name.charAt(0).toUpperCase() + name.slice(1);

		// If the second argument that was passed is a function we expect it to be the 
		// validate function, because that is the only required method. We make an
		// object of definition containing that validate function as a method.
		if (typeof definition === 'function')
		{
			var validate = definition;

			definition = { validate: validate };
		}

		// A value object should always have a validate function, because it can only 
		// exist under certain conditions. If it is a function, it will be assigned 
		// to the prototype and the constructor to also support external use.
		if (typeof definition !== 'object' || typeof definition.validate !== 'function')
		{
			throw new Error('ValueObject [' + name + '] can not be created without a validate method.');
		}

		/**
		 * Construct a new custom ValueObject.
		 * 
		 * @param  mixed  value
		 * @return void
		 */
		var object = function(value)
		{
			ValueObject.call(this, value);
		};

		object.prototype = Object.create(ValueObject.prototype);

		// The definition-object that was passed will be treated as the blueprint for the 
		// new value object. Everyting in there will end up as a property or method 
		// of the object; also allowing you to 'override' inherited functions.
		for (var prop in definition)
		{
			object.prototype[prop] = definition[prop];
		}

		// Sometimes it might be handy to inherit the methods of native data types like 
		// String, Number or Date. In the 'extend' option we will expect that object
		// and copy all methods (no properties) to the value object.
		if (definition.extend)
		{
			copyMethods(object, definition.extend);
		}

		object.prototype.name = name;

		/**
		 * Construct the object using the Flyweight pattern.
		 * 
		 * @param  mixed  value
		 * @return object
		 */
		var constructor = function(value)
		{
			// It might be more convenient to pass more than one argument in some cases. 
			// If that is the case, we will bundle them in an array and pass 
			// them through to the constructor of the value object.
			if (arguments.length > 1)
			{
				value = Array.prototype.slice.call(arguments, 0);
			}

			return flyweight(object, value);
		};

		// To make sure we can still use the binary 'instanceof' operator on the value 
		// object, the constructor needs to have the same prototype as the returned 
		// object. We also add the validate method to allow external usage.
		constructor.prototype = object.prototype;

		constructor.validate = object.prototype.validate;

		ValueObject.library[name] = constructor;

		return constructor;
	};

	/**
	 * An exception indicating a failed validation.
	 * 
	 * @param  string|object  object
	 * @return void
	 */
	var InvalidValueException = ValueObject.InvalidValueException = function(object)
	{
		if (typeof object === 'object')
		{
			this.message = '[' + object.original + '] is not a valid value for ' + object.name + '.';
		}
		else
		{
			this.message = object;
		}

		this.type = object.name;
	};

	InvalidValueException.prototype = Error.prototype;

	/**
	 * Define an immutable property on a object.
	 * 
	 * @param  object  object  
	 * @param  string  property
	 * @param  mixed  value   
	 * @return void       
	 */
	var defineImmutable = function(object, property, value)
	{
		Object.defineProperty(object, property, {

			/**
			 * The value of the property.
			 * 
			 * @type mixed
			 */
			value: value,

			/**
			 * Indicates if the property is writeable.
			 * 
			 * @type Boolean
			 */
			writable: false,

			/**
			 * Indicates if the property shows up in loops.
			 * 
			 * @type Boolean
			 */
			enumerable: false
		});
	};

	/**
	 * Make an object 'extend' another object (or multiple) by copying its properties.
	 * 
	 * @param  object  object
	 * @param  object|array  types
	 * @return void
	 */
	var copyMethods = function(object, extend)
	{
		var proto = extend.prototype;

		var names = Object.getOwnPropertyNames(proto);

		// We will define the methods also enumerable and non-writable. But only if 
		// the method or propery does not already exist on the object to provide a 
		// way of overwriting those methods on forehand.
		for (var i in names)
		{
			var name = names[i];

			if ( ! (proto[name] instanceof Function)) continue;

			if (object.prototype[name]) continue;

			defineMethod(object.prototype, name, proto[name]);
		}
	};

	/**
	 * Define a method on an object.
	 * 
	 * @param  object  object
	 * @param  string  name
	 * @param  function  fn
	 * @return void
	 */
	var defineMethod = function(object, name, fn)
	{
		defineImmutable(object, name, function()
		{
			return fn.apply(this.value, arguments);
		});
	};

	/**
	 * A private map object used to store all flyweight objects.
	 * 
	 * @type object
	 */
	var db = Object.create(null);

	/**
	 * A Flyweight collection keeping track of all values.
	 * 
	 * @param  object  object
	 * @param  mixed  value
	 * @type object
	 */
	var flyweight = function(object, value)
	{
		var table = db[object.name];

		if ( ! table)
		{
			table = db[object.name] = Object.create(null);
		}

		// We need to store the value objects based on its value. In that way we can 
		// easily search if it already exists. Because the value might be anything 
		// and we can use strings as a key we need to encode it to JSON.
		var key = JSON.stringify(value);

		if (table[key]) return table[key];

		table[key] = new object(value);

		return table[key];
	};

	module.exports = ValueObject;

}(this));