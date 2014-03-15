QUnit.module('clos');

test('bump', function(){
	
	equal(bump.call(brittle, hard), 'crash',
		bump + ' ' + brittle + ' and ' + hard + ' is crash');
		
	ok(clos.isA(glass, brittle),
		glass + ' is ' + brittle);
		
	ok(clos.isA(floor, hard),
		floor + ' is ' + hard);
		
	equal(bump.call(glass, floor), 'crash',
		bump + ' ' + glass + ' and ' + floor + ' is crash');
		
	ok(clos.isA(ball, elastic),
		ball + ' is ' + elastic);
		
	equal(bump.call(ball, floor), 'bounce',
		bump + ' ' + ball + ' and ' + floor + ' is bounce');
		
	equal(bump.call(ball, plaid), 'silence',
		bump + ' ' + ball + ' and ' + plaid + ' is silence');
		
	ok(clos.isA(stick, hard),
		stick + ' is ' + hard);
		
	equal(bump.call(stick, plaid), 'silence',
		bump + ' ' + stick + ' and ' + plaid + ' is silence');
		
	equal(bump.call(stick, floor), 'knock',
		bump + ' ' + stick + ' and ' + floor + ' is knock');
		
	throws(function(){ bump.call(stick, tea); }, clos.noMethod,
		'no method to ' + bump + ' ' + stick + ' and ' + tea);
});
