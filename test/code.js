var clos = exports.clos = require('./../clos'),

	hard = exports.hard = new clos.symbol('hard'),
	soft = exports.soft = new clos.symbol('soft'),
	brittle = exports.brittle = new clos.symbol('brittle'),
	elastic = exports.elastic = new clos.symbol('elastic'),
	liquid = exports.liquid = new clos.symbol('liquid'),
	
	floor = exports.floor = new clos.symbol('floor', [hard]),
	stick = exports.stick = new clos.symbol('stick', [hard]),
	plaid = exports.plaid = new clos.symbol('plaid', [soft]),
	ball = exports.ball = new clos.symbol('ball', [elastic]),
	glass = exports.glass = new clos.symbol('glass', [brittle]),
	tea = exports.tea = new clos.symbol('tea', [liquid]),
	
	bump = exports.bump = new clos.generic('bump');

new clos.method(bump, [undefined, soft], function(x, y){
	return 'silence';
});

new clos.method(bump, [hard, hard], function(x, y){
	return 'knock';
});

new clos.method(bump, [brittle, hard], function(x, y){
	return 'crash';
});

new clos.method(bump, [elastic, hard], function(x, y){
	return 'bounce';
});
