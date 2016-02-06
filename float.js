/*
	The float binding will accept only floats with one decimal.
	use binding postivie: true if you require only posies.
	type = 'text' is required. HTML5 numbers does not play nice.
	https://github.com/circuitcreature/Knockout-Bindings.
*/
;(function(){
	ko.bindingHandlers['float'] = {
		init: function(element,valueAccessor, allBindings){
			var all = allBindings();
			if( all.hasOwnProperty('value') || all.hasOwnProperty('int')){
				throw new Error('The float binding cannot be used with value or int bindings.')
			}
			var val = valueAccessor(),
				positive = false;
			if(all.hasOwnProperty('positive') && allBindings().positive){
				positive = true;
			}
			var update_binding = function(val){
				var obs = valueAccessor(),
					elm_val = ko.selectExtensions.readValue(element);
				obs(elm_val);
			};
			var update = function(){
				var nv = ko.utils.unwrapObservable( val() ),
					elm_v = ko.selectExtensions.readValue(element);
				if(nv){
					var neg = '';
					nv = (nv += '').replace( /[^0-9.-]/g ,'');
					if(!positive && nv.charAt(0) == '-'){
						neg = '-';
					}
					nv = nv.replace(/-/g,'');
					nv = nv.split('.');
					var small = nv[1];
					nv = neg + nv[0];
					if(small){
						nv += '.' + small;
					}
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
