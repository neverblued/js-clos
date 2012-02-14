/* JavaScript "CLOS", v.0.1 (alpha)
 * (c) Дмитрий Пинский <demetrius@neverblued.info>
 * Допускаю использование и распространение согласно
 * LLGPL -> http://opensource.franz.com/preamble.html
 */

var CLOS = {};
CLOS.generics = {};

CLOS.generic = function(name){
	this.name = name;
	this.methods = [];
};
CLOS.method = function(clause, body){
	this.clause = clause;
	this.body = body;
};
CLOS.isA = function(example, standard){
	if(standard === undefined){
		return true;
	}
	if(example === standard){
		return true;
	}
	if(typeof(example) == standard){
		return true;
	}
	return false;
}
CLOS.method.prototype.check = function(parameters){
	var i;
	for(i in this.clause){
		if(CLOS.isA(parameters[i], this.clause[i])){
			continue;
		}
		return false;
	}
	return true;
};

CLOS.defGeneric = function(name){
	CLOS.generics[name] = new CLOS.generic(name);
};
CLOS.getGeneric = function(name){
	if(!CLOS.generics[name]){
		throw 'CLOS error: generic ' + name + ' is not defined';
	}
	return CLOS.generics[name];
};

CLOS.defMethod = function(name, parameters, body){
	var generic = CLOS.getGeneric(name);
	generic.methods[generic.methods.length] = new CLOS.method(parameters, body);
};

CLOS.call = function(name){
	var generic = CLOS.getGeneric(name),
		parameters = Array.prototype.slice.call(arguments, 1),
		method, i;
	for(i in generic.methods){
		method = generic.methods[i];
		if(method.check(parameters)){
			return method.body.apply(parameters);
		}
	}
	throw 'CLOS error: cannot find method ' + name + ' for ' + parameters;
};

/*CLOS.init = function(object){
	object.clos = {};
	object.clos.prototype = CLOS;
	object.clos.object = object;
};*/
