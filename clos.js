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

clos.is = function(example, standard){
	if(_.isUndefined(standard)){
		return true;
	}
	if(_.isEqual(example, standard)){
		return true;
	}
	if(standard.validate && standard.validate(example)){
		return true;
	}
	if(clos.isInstance(example, standard)){
		return true;
	}
	return false;
};

clos.type = function(name, validate){
	this.name = name;
	this.validate = validate;
	clos[name] = clos.types[name] = this;
};

clos.types = {};
new clos.type('boolean', _.isBoolean);
new clos.type('number', _.isNumber);
new clos.type('string', _.isString);
new clos.type('array', _.isArray);

clos.isInstance = function(example, standard){
	if(_.isEqual(example.prototype, standard)){
		return true;
	}
	var origin = example.origin;
	if(!origin){
		return false;
	}
	if(_.isArray(origin)){
		return _.any(origin, function(parent){
			return clos.is(parent, standard);
		});
	}else{
		return clos.is(origin, standard);
	}
};

// symbol

clos.symbols = {};

clos.symbol = function(name, origin){
	this.name = name;
	this.origin = origin || [];
	clos.symbols[name] = this;
};

// generic

clos.generics = {};

clos.generic = function(name){
	this.name = name;
	this.methods = [];
	clos.generics[name] = this;
};

clos.generic.prototype.lambda = function(){
	var generic = this;
	var lambda = function(){
		return generic.call.apply(generic, arguments);
	};
	lambda.generic = generic;
	lambda.toString = function(){
		return generic.toString();
	};
	return lambda;
};

clos.generic.prototype.call = function(){
	var generic = this,
		parameters = arguments,
		methods = generic.find.apply(generic, parameters);
	if(!methods.length){
		throw new clos.noMethod(generic, parameters);
	}
	methods = methods.sort(generic.order);
	var result;
	_.any(methods, function(method){
		return result = method.call.apply(method, parameters);
	});
	return result;
};

clos.generic.prototype.find = function(){
	var generic = this,
		parameters = arguments;
	return _.filter(generic.methods, function(method){
		if(method.check(parameters)){
			return method;
		}
	});
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
		return clos.is(parameters[index], clause);
	});
};

clos.generic.prototype.order = function(method1, method2){
	return method1.clause.length - method2.clause.length;
};

clos.method.prototype.call = function(){
	return this.body.apply(undefined, arguments);
};

// pretty print

clos.error.prototype.toString = function(){
	return '<error from="clos">' + this.message + '</error>';
};

clos.symbol.prototype.toString = function(){
	return '<symbol name="' + this.name + '" />';
};

clos.type.prototype.toString = function(){
	return '<type name="' + this.name + '" />';
};

clos.generic.prototype.toString = function(){
	return '<generic name="' + this.name + '" />';
};
