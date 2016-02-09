# Knockout-Bindings

Custom Knockout bindings.
Every binding is pure Javascript & Knockout for compatibility.

hasValue:
	Modified version of the value binding. It will add a class "hasValue",or custom class(es) using inputClass, to your input element.  

int
	Modified version of the value binding. It will accept any value and make it an integer. To force positive use: data-bind="int: {value: observable, positive: true}"
