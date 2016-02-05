/*
	Modified version of the KO value binding used to trigger a class.
	default: hasValue
	for custom class use inputClass as a binding
	https://github.com/circuitcreature/Knockout-Bindings
*/
(function(){
	ko.bindingHandlers['hasValue'] = {
		init: function(element,valueAccessor, allBindings){
			var val = valueAccessor(),
				binds = allBindings(),
				class_name = ' hasValue';

			if(binds.hasOwnProperty('inputClass')){
				class_name = ' ' + binds.inputClass;
			}
			var update_binding = function(val){
				var obs = valueAccessor(),
					elm_val = ko.selectExtensions.readValue(element);
				obs(elm_val);
			};
			var update = function(){
				var nv = ko.utils.unwrapObservable( val() ),
					elm_v = ko.selectExtensions.readValue(element),
					reg = new RegExp(class_name,'g');
				element.className = element.className.replace(reg,'');

				if( nv || nv === 0 ){
					element.className += class_name;
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
