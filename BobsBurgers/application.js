$(document).ready(function(){
	prepareObjects();
});

function prepareObjects() {
	// On launch, initialize the grill and the order list
	list = new OrderList
	grills = new Grill
	list.startCooking();
	grills.watchForBurgers();
	prepareGrillPanel();
};

function OrderList() {
	this.orders = []
	this.startCooking = function(){
		setInterval(function(){
			// Create an order every 5 seconds
			this.orders.push(new Order)
			this.updateOrderList()
		}.bind(this), 5000)
	};
	this.updateOrderList = function(){
		// Send handlebars the template data to add an order to the list
		var order = this.orders[this.orders.length-1]
		var source = $('#order-template')
		var context = {type: order.type, orderNumber: order.id}
		handleTemplate(source, context, $('#orders'), true)
	};
};

var Order = (function() {
	// Order object, ID automatically increments with each one created
	var nextId = 1;
	return function Order(){
		this.type = _.sample(['Meat', 'Veggie']);
		this.id = nextId++
	}
})();

function Grill(grill, burger) {
	this.grills = []
	this.cookingTimer = 5
	this.clearGrill = function(){
		// Resets the grill to default, both on screen and in the object itself
		this.grills = []
		this.cookingTimer = 5
		$('.grill .individual-order').remove();
	};
	this.watchForBurgers = function(){
		// Check to see if at least 3 burgers are on the grill
		// If so, call cookBurger
		// Also check to see if burgers are finished cooking
		setInterval(function(){
			this.canItCook() ? this.cookBurger() : null
			this.cookingTimer == 0 ? this.finishBurgers() : null
		}.bind(this), 1000)
	};
	this.addToGrill = function(burger){
		// Adds a passed in burger to the grill
		this.grills.push(list.orders[burger-1])
	};
	this.canItCook = function(){
		// Return true or false, depending on length of grill array
		return this.grills.length >= 3
	};
	this.cookBurger = function(){
		this.cookingTimer --
	};
	this.finishBurgers = function() {
		// Create template for Completed Orders div
		// Returns the grill to its initial state, and unlocks the grill slots
		var type = this.grills[0].type
		var orderNumber = this.grills.map(function(num){return num.id})
		var source = $('#complete-order')
		var context = {type: type, orderNumber: orderNumber}
		handleTemplate(source, context, $('#complete-orders'), false)
		this.clearGrill();
		prepareGrillPanel();
	};
};

function handleTemplate(template, context, location, draggable){
	// Javascript templating function
	var source = $(template).html();
	var compiled = Handlebars.compile(source);
	var html = compiled(context)
	$(location).append(html)
	// Provides option to make templates draggable
	if (draggable) {
		$('.individual-order:last-child').draggable({
			revert: function(event, ui){
				$(this).data("uiDraggable").originalPosition = {top:0, left:0}
				return !event
			}
		});
	};
};


function prepareGrillPanel() {
	// Set the Grill divs as 'droppable'
	// Allow them to accept the order divs
	// Highlight when the correct orders are dragged
	$('.grill').droppable({
		accept: ".individual-order",
		activeClass: "highlight",
		disabled: false,

		drop: function(event, ui){
			// Return the order to the order list if it does not dock on the grill
			$(ui.draggable).detach().css({top:0, left:0}).appendTo(this);
			// Prevents items from being dragged off the grill once placed
			// Also prevents additional items from going on to the same grill
			$(ui.draggable).draggable({disabled: true})
			$(this).droppable({
				disabled: true
			})
			// Changes the classes that the Grill allows 
			// This prevents a veggie burger from going on to a meat grill, for example
			$('.grill').droppable("option", "accept", "." + $(ui.draggable).attr('id').match(/\w+/)[0])
			// Add the order object to the grill object for further calculations
			burgerId = $(ui.draggable).attr('id').match(/\d+/)[0]
			grills.addToGrill(burgerId)
		},
	});
};


