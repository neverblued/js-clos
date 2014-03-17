QUnit.module('clos');

test('plain', function(){
	
	ok(clos.is(false, clos.boolean), false + ' is ' + clos.boolean);
	ok(clos.is(42, clos.number), 42 + ' is ' + clos.number);
	ok(clos.is(bump.generic.methods.length, clos.number), 'generic.methods length is ' + clos.number);
	equal(typeof bump(brittle, hard), typeof 'crash/boom/bang', bump + ' result is String');
});

test('advanced', function(){
	
	equal(bump(brittle, hard), 'crash',
		bump + ' ' + brittle + ' and ' + hard + ' is crash');
	
	ok(clos.is(glass, brittle),
		glass + ' is ' + brittle);
	
	ok(clos.is(floor, hard),
		floor + ' is ' + hard);
	
	equal(bump(glass, floor), 'crash',
		bump + ' ' + glass + ' and ' + floor + ' is crash');
	
	ok(clos.is(ball, elastic),
		ball + ' is ' + elastic);
	
	equal(bump(ball, floor), 'bounce',
		bump + ' ' + ball + ' and ' + floor + ' is bounce');
	
	ok(clos.is(blanket, soft),
		blanket + ' is ' + soft);
	
	equal(bump(ball, blanket), 'silence',
		bump + ' ' + ball + ' and ' + blanket + ' is silence');
	
	ok(clos.is(stick, hard),
		stick + ' is ' + hard);
	
	equal(bump(stick, blanket), 'silence',
		bump + ' ' + stick + ' and ' + blanket + ' is silence');
	
	equal(bump(stick, floor), 'knock',
		bump + ' ' + stick + ' and ' + floor + ' is knock');
	
	throws(function(){ bump(stick, tea); }, clos.noMethod,
		'no method to ' + bump + ' ' + stick + ' and ' + tea);
});
