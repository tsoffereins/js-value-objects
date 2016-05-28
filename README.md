# Value Object JS
The Value Object is a usefull, well known design pattern in a lot of languages. JavaScript is not one of them, until now. This library allows you to create your own 'Data types' as value object in order to better structure your application logic.

## Installation
`bower install --save value-object-js`

## Usage

### Create a value object

A value object is only requires a name and a validate function. 
```var Email = ValueObject.create('Email', function(value) {
	return /(.+)@(.+){2,}\.(.+){2,}/.test(value);
});```

Using the value object is now as simple as creating any object using the `new` keyword for creating a new instance from a value. Whenever the

```var customer1Email = new Email(123); // Throws exception
var customer2Email = new Email('example.domain.com'); // Throws exception
var customer3Email = new Email('example@domain'); // Throws exception
var customer4Email = new Email('example@domain.com'); // Works!```

## Documentation

## Support