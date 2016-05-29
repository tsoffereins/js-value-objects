# Value Object JS
The Value Object is a usefull, well known design pattern in a lot of languages. JavaScript is not one of them, until now. This plugin allows you to create your own 'Data types' as value object in order to better structure your application logic.

## Installation
`bower install --save value-object-js`

```
<script src="/bower_components/dist/value-object.min.js"></script>
<script>
	// Do your awesome stuff here
</script>
```

Besides the value-object.js file, this package also provides a set of predefined value objects like DateRang, Email, URL, YoutubeVideoURL and more. This library can be loaded on its own (value-object-library.min.js) or as part of the main file (value-ibject.with-library.min.js).

## Usage

### Define a value object

A value object only requires a name and a validation function testing the passed value.

```javascript
var Email = ValueObject.define('Email', function(value) {
	return /(.+)@(.+){2,}\.(.+){2,}/.test(value);
});
```

Using the defined value object is now as simple as instantiating any object using the `new` keyword. Defined value objects can also be found in the library. 

```javascript
var customerEmail = new Email('example.domain.com'); // Throws InvalidArgumentException

var customerEmail = new Email('example@domain.com'); // Works!

var customerEmail = new ValueObject.Library.Email('example@domain.com'); // Works!
```

The value object can now be handled like you would a String object.

```javascript
console.log(customerEmail); // logs an object

console.log('Hi! Mail me at: ' + customerEmail); // logs 'Hi! Mail me at: example@domain.com'
```

### Comparing value objects

Objects in javascript are equal on identity, not on value. Value objects, however, are equal on value and can be compared with strict equality. They even can be tested with `instanceOf`. 

```javascript
var email1 = new Email('example@domain.com');
var email2 = new Email('example@domain.com');

console.log(email1 === email2); // logs true
console.log(email1 instanceOf Email); // logs true
```

### Adding methods

An email address is basicly a string, so it would be helpful if we could use the same methods. This can be done by specifying which data type (or other value object!) should be extended in the definition. You can also add your own methods.

```javascript
var Email = ValueObject.create('Email', {

	// Extends all methods from String (like substr, split, match, etc.)
	extends: 'String',
	
	validate: function(value) { // your validation here };
	
	getDomainPart: function() {
		return this.value.split('@').pop();
	}
});

var email = new Email('example@domain.com');

console.log(email.substr(0, 7)); // logs 'example'
console.log(email.getDomainPart()); // logs 'domain.com'
```

## Documentation

For full documentation see http://dev.tsoffereins.com/value-object-js.

## Support

You can reach me via Twitter: @tsoffereins

Please file issues here at GitHub.
