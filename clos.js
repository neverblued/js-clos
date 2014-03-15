var _ = require('underscore');
var clos = exports = module.exports = {};

// tool

var inherit = function(example, origin){
	example.prototype = Object.create(origin.prototype, {
		constructor: {value: example}
	});
};

// error

clos.error = function(){};

inherit(clos.error, Error);

clos.error.prototype.toString = function(){
	return 'CLOS error: ' + this.message + '!';
};

//clos.typeError = function(datum, expected){
//	this.message = 'expected ' + expected + ', but found ' + datum;
//};
//
//inherit(clos.typeError, clos.error);

clos.noMethod = function(generic, parameters){
	this.message = 'no ' + generic + ' for ' + _.invoke(parameters, 'toString').join(', ');
};

inherit(clos.noMethod, clos.error);

// identity

clos.isA = function(example, standard){
	if(standard === undefined){
		return true;
	}
	if(example === standard){
		return true;
	}
	if(clos.isInstance(example, standard)){
		return true;
	}
	return false;
};

clos.isInstance = function(example, standard){
	if(typeof example === standard){
		return true;
	}
	if(example.classes && _.isArray(example.classes)){
		if(_.any(example.classes, function(parent){
			return clos.isA(parent, standard);
		})){
			return true;
		}
	}
	return false;
};

// symbol

clos.symbols = {};

clos.symbol = function(name, classes){
	var symbol = clos.symbols[name];
	if(symbol){
		return symbol;
	}else{
		symbol = this;
	}
	symbol.name = name;
	symbol.classes = classes || [];
	clos.symbols[name] = symbol;
};

clos.symbol.prototype.toString = function(){
	return '#' + this.name;
};

// generic

clos.generics = {};

clos.generic = function(name){
	var generic = clos.generics[name];
	if(generic){
		return generic;
	}else{
		generic = this;
	}
	generic.name = name;
	generic.methods = [];
	clos.generics[name] = generic;
};

clos.generic.prototype.toString = function(){
	return '@' + this.name;
};

clos.generic.prototype.call = function(){
	var generic = this,
		parameters = arguments,
		methods = generic.find.apply(generic, parameters);
	if(!methods.length){
		throw new clos.noMethod(generic, parameters);
	}
	return _.map(methods, function(method){
		return method.call.apply(method, parameters);
	});
};

clos.generic.prototype.find = function(){
	var generic = this,
		parameters = arguments,
		methods = [];
	_.each(generic.methods, function(method){
		if(method.check(parameters)){
			methods.push(method);
		}
	});
	methods = methods.sort(generic.order);
	return methods;
};

// method

clos.method = function(generic, clause, body){
	this.clause = clause;
	this.body = body;
	generic.methods.push(this);
};

clos.method.prototype.check = function(parameters){
	var clause = this.clause;
	if(!_.isArray(clause)){
		clause = [clause];
	}
	var index = -1;
	return _.every(clause, function(clause){
		index++;
		return clos.isA(parameters[index], clause);
	});
};

clos.generic.prototype.order = function(method1, method2){
	return method1.clause.length - method2.clause.length;
};

clos.method.prototype.call = function(){
	return this.body.apply(undefined, arguments);
};
