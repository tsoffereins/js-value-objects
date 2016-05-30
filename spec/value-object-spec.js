
var ValueObject = require('../src/value-object');

describe('Defining a value object', function()
{
	it('should return a constructor', function()
	{
		var VO = ValueObject.define('VO', function() {});

		expect(typeof VO).toBe('function');
	});

	it('should store a reference in the library', function()
	{
		var VO = ValueObject.define('VO', function() {});

		expect(ValueObject.library.VO).toBe(VO);
	});

	it('should attach the name to the prototype', function()
	{
		var VO = ValueObject.define('VO', function() {});

		expect(VO.prototype.name).toBe('VO');
	});

	it('should convert the name to start with an uppercase character', function()
	{
		var VO = ValueObject.define('vo', function() {});

		expect(ValueObject.library.vo).toBeUndefined();
		expect(ValueObject.library.Vo).toBe(VO);
		expect(VO.prototype.name).toBe('Vo');
	});

	it('should throw an error if no validate method was passed', function()
	{
		expect(function() 
		{
			ValueObject.define('VO');

		}).toThrowError('ValueObject [VO] can not be created without a validate method.');
	});

	it('should attach the passed validate method to the constructor', function()
	{
		var validate = function() {};

		var VO = ValueObject.define('VO', validate);

		expect(VO.validate).toBe(validate);
	});

	it('should attach the passed validate method to the prototype', function()
	{
		var validate = function() {};

		var VO = ValueObject.define('VO', validate);

		expect(VO.prototype.validate).toBe(validate);
	});

	it('should allow the validate method to be passed via an object', function()
	{
		expect(function()
		{
			ValueObject.define('VO', { validate: function() {} });

		}).not.toThrow();
	});

	it('should accept an optional parse method that is attached to the prototype', function()
	{
		var parse = function() {};

		var VO = ValueObject.define('VO', { 
			validate: function() {}, 
			parse: parse
		});

		expect(VO.prototype.parse).toBe(parse);
	});

	it('should pass any defined non-special method or property on to the prototype as-is', function()
	{
		var method = function() {};
		var property = { foo: 'bar' };

		var VO = ValueObject.define('VO', { 
			validate: function() {}, 
			method: method,
			property: property
		});

		expect(VO.prototype.method).toBe(method);
		expect(VO.prototype.property).toBe(property);
	});

	it('should copy all methods from the optional extend-object', function()
	{
		var VO = ValueObject.define('VO', { 
			validate: function() {}, 
			extend: Number
		});

		expect(typeof VO.prototype.toFixed).toBe('function');
		expect(typeof VO.prototype.toExponential).toBe('function');
	});

	it('should not copy properties from the optional extend-object', function()
	{
		var VO = ValueObject.define('VO', { 
			validate: function() {}, 
			extend: String
		});

		expect(VO.prototype.length).toBeUndefined();
		expect(typeof VO.prototype.substr).toBe('function');
	});
});

describe('Instantiating a value object', function()
{
	var VO = ValueObject.define('VO', function() { return true; });

	var instance = new VO(1234);

	it('should return an instance of the created ValueObject', function()
	{
		expect(instance instanceof VO).toBe(true);
	});

	it('should return an instance of the global ValueObject', function()
	{
		expect(instance instanceof ValueObject).toBe(true);
	});

	it('should return an instance with the passed value', function()
	{
		expect(instance.value).toBe(1234);
	});

	it('should return an instance with an immutable value', function()
	{
		instance.value = 'changed to a string';

		expect(instance.value).toBe(1234);
	});

	it('should return the same object for the same value every time', function()
	{
		var instance2 = new VO(1234);
		var instance3 = new VO(1234);

		expect(instance).toBe(instance2);
		expect(instance).toBe(instance3);
		expect(instance2).toBe(instance3);
	});

	it('should store multiple arguments as an array of values', function()
	{
		var instance = new VO(1, 'test', false, null);

		expect(JSON.stringify(instance.value)).toBe(JSON.stringify([1, 'test', false, null]));
	});
});

describe('Instantiating a value object with a parsable value', function()
{
	var VO = ValueObject.define('VO', {
		parse: function(v) 
		{ 
			it('should pass the passed value to the parse method', function()
			{
				expect(v).toBe('parsable');
			});

			return 'parsed';
		},
		validate: function(v) 
		{ 
			it('should pass the parse result to the validate method', function()
			{
				expect(v).toBe('parsed');
			});

			return true;
		},
	});

	var instance = new VO('parsable');

	it('should store the passed value as an original property', function()
	{
		expect(instance.original).toBe('parsable');
	});

	it('should store the parsed value as the value', function()
	{
		expect(instance.value).toBe('parsed');
	});
});

describe('Instantiating a value object with an invalid value', function()
{
	var VO = ValueObject.define('VO', function() { return false; });

	it('should throw an error', function()
	{
		expect(function()
		{
			new VO('test');

		}).toThrowError(ValueObject.InvalidValueException, '[test] is not a valid value for VO.');
	});
});