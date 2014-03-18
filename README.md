JS-CLOS
=======

Javascript object system inspired by Common Lisp.

Example
-------

	ok(clos.is(42, clos.number),
		'42 is ' + clos.number);

	new clos.generic('bump');

	new clos.symbol('brittle');
	new clos.symbol('hard');

	new clos.method(bump, [clos.symbols['brittle'], clos.symbols['hard']], function(x, y){
		return 'crash';
	});

	new clos.symbol('glass', ['brittle']);
	new clos.symbol('floor', ['hard']);

	var bump = clos.generics['bump'].lambda();
	var glass = clos.symbols['glass'];
	var floor = clos.symbols['floor'];
	var hard = clos.symbols['hard'];

	ok(clos.is(floor, hard),
		floor + ' is ' + hard);

	equal(bump(glass, floor), 'crash',
		bump + ' ' + glass + ' and ' + floor + ' is crash');

Test
----

	npm test
