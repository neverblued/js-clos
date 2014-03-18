JS-CLOS
=======

Javascript object system inspired by Common Lisp.

Example
-------

	```javascript
	new clos.symbol('hard');
	new clos.symbol('brittle');
	
	new clos.generic('bump');
	
	new clos.method(clos.generics['bump'], [
		clos.symbols['brittle'],
		clos.symbols['hard']
	], function(brittle, hard){
		return 'crash';
	});
	
	new clos.symbol('floor', ['hard']);
	new clos.symbol('glass', ['brittle']);
	
	ok(clos.is(42, clos.number),
		'42 is ' + clos.number);
	
	var hard = clos.symbols['hard'];
	var floor = clos.symbols['floor'];
	var glass = clos.symbols['glass'];
	
	ok(clos.is(floor, hard),
		floor + ' is ' + hard);
	
	var bump = clos.generics['bump'].lambda();

	equal(bump(glass, floor), 'crash',
		bump + ' ' + glass + ' and ' + floor + ' is crash');
	```

Test
----

	npm test
