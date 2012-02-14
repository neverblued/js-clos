// our domain

var floor = {};
var carpet = {};
var ball = {};
var glass = {};
var stick = {};

var bumpOutput = function(x, y, result){
	alert(x + ' + ' + y + ' bump = ' + result);
};
var errorOutput = function(error){
	alert('[error] ' + error);
};

// definitions

CLOS.defGeneric('bump');
CLOS.gefMethod('bump', [ball, floor], function(x, y){
	bumpOutput(x, y, 'bounce');
});
CLOS.gefMethod('bump', [glass, floor], function(x, y){
	bumpOutput(x, y, 'crash');
});
CLOS.gefMethod('bump', [stick, floor], function(x, y){
	bumpOutput(x, y, 'knock');
});
CLOS.gefMethod('bump', [undefined, carpet], function(x, y){
	bumpOutput(x, y, 'silence');
});

// test

var tests = [
	function(){
		CLOS.call('bump', glass, floor); // crash
	},
	function(){
		CLOS.call('bump', stick, carpet); // silence
	},
	function(){
		CLOS.call('bump', floor, stick); // undefined method
	},
	function(){
		CLOS.call('put', glass, floor); // undefined generic
	}
];
for(var i in tests){
	var test = tests[i];
	try{
		test();
	}
	catch(error){
		errorOutput(error);
	}
}
