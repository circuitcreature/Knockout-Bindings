/*
	The int binding will accept any int, all other chars are removed.
	use an object to require postivie: int: {value: (), positive: true}.
	input type = 'text' is required. HTML5 numbers does not play nice.
	https://github.com/circuitcreature/Knockout-Bindings.
*/
;(function(){
	ko.bindingHandlers['int'] = {
		init: function(element,valueAccessor, allBindings){
			var all = allBindings();
			if(all.hasOwnProperty('value') || all.hasOwnProperty('float')){
				throw new Error('The int binding cannot be used with value or float bindings.')
			}
			var val = valueAccessor(),
				positive = false;
			if(({}).toString.call(val) == '[object Object]'){
				if(val.hasOwnProperty('value')){
					val = val.value;
				}else{
					throw new Error('The int binding is in object form and requires a "value" property.')
				}
				if(val.hasOwnProperty('positive') && val.positive){
					positive = true;
				}
			}
			var update_binding = function(){
				var obs = val,
					elm_val = ko.selectExtensions.readValue(element);
				obs(elm_val);
			};
			var update = function(){
				var nv = ko.utils.unwrapObservable( val() );
				if(!nv){ return; }
				var elm_v = ko.selectExtensions.readValue(element);
				if(positive){
					nv = (nv += '').replace( /[^0-9]/g ,'');
				}else{
					nv = (nv += '').replace( /(?!^-)[^0-9]/g ,'');
				}
				if(nv !== elm_v){
					ko.selectExtensions.writeValue(element, nv)
				}
			};
			ko.computed(update, null, {disposeWhenNodeIsRemoved: element});
			element.addEventListener('change',function(){
				update_binding();
			});
			if(allBindings().hasOwnProperty('valueUpdate')){
				element.addEventListener(allBindings()['valueUpdate'],function(){
					update_binding();
				});
			}
		}
	};
})();
