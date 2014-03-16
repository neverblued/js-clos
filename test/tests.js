QUnit.module('clos');

test('bump', function(){
	
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
		
	ok(clos.is(plaid, soft),
		plaid + ' is ' + soft);
		
	equal(bump(ball, plaid), 'silence',
		bump + ' ' + ball + ' and ' + plaid + ' is silence');
		
	ok(clos.is(stick, hard),
		stick + ' is ' + hard);
		
	equal(bump(stick, plaid), 'silence',
		bump + ' ' + stick + ' and ' + plaid + ' is silence');
		
	equal(bump(stick, floor), 'knock',
		bump + ' ' + stick + ' and ' + floor + ' is knock');
		
	throws(function(){ bump(stick, tea); }, clos.noMethod,
		'no method to ' + bump + ' ' + stick + ' and ' + tea);
});
