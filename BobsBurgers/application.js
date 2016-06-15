$(document).ready(function(){
	prepareObjects();
});

function prepareObjects() {
	// On launch, initialize the grill and the order list
	list = new OrderList
	list.startOrders();
	grillMaster = new GrillMaster
	grillMaster.startCooking();

};

function OrderList() {
	this.orders = []
	this.startOrders = function(){
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

function GrillMaster(grill, burger) {
	this.grills = [new Grill(1), new Grill(2), new Grill(3), new Grill(4), new Grill(5)]
	this.addToGrill = function(grill, burger){
		this.grills[grill-1].addToGrill(list.orders[burger-1]);
	};
	this.startCooking = function(){
		for (var i = 0; i < this.grills.length; i++) {
			this.grills[i].prepareGrill();
			this.grills[i].watchForBurgers();
		};
	};
};

function Grill(id){
	this.id = id
	this.burgers = []
	this.cookingTimer = 5
	this.clearGrill = function(){
		// Resets the grill to default, both on screen and in the object itself
		this.burgers = []
		this.cookingTimer = 5
		$("#grill-"+this.id+" .individual-order").remove();
		this.prepareGrill();
	};
	this.addToGrill = function(burger){
		// Adds a passed in burger to the grill
		this.burgers.push(burger)
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
	this.canItCook = function(){
		// Return true or false, depending on length of grill array
		return this.burgers.length >= 3
	};
	this.cookBurger = function(){
		this.cookingTimer --
	};
	this.finishBurgers = function() {
		// Create template for Completed Orders div
		// Returns the grill to its initial state, and unlocks the grill slots
		var type = this.burgers[0].type
		var orderNumber = this.burgers.map(function(num){return num.id})
		var source = $('#complete-order')
		var context = {type: type, orderNumber: orderNumber}
		handleTemplate(source, context, $('#complete-orders'), false)
		this.clearGrill();
	};
	// Set the Grill divs as 'droppable'
	// Allow them to accept the order divs
	// Highlight when the correct orders are dragged
	this.prepareGrill = function(){
		$('#grill-'+this.id).droppable({
			accept: ".individual-order",
			activeClass: "highlight",
			disabled: false,

			drop: function(event, ui){
				// Return the order to the order list if it does not dock on the grill
				$(ui.draggable).detach().css({top:0, left:0}).appendTo(this);
				// Prevents items from being dragged off the grill once placed
				// Also prevents additional items from going on to the same grill
				$(ui.draggable).draggable({disabled: true})
				// Changes the classes that the Grill allows 
				// This prevents a veggie burger from going on to a meat grill, for example
				$('#'+this.id).droppable("option", "accept", "." + $(ui.draggable).attr('id').match(/\w+/)[0])
				// Add the order object to the grill object for further calculations
				grillId = $(this).attr('id').match(/\d+/)[0]
				burgerId = $(ui.draggable).attr('id').match(/\d+/)[0]
				grillMaster.addToGrill(grillId, burgerId)
			}
		});		
	};
}

function handleTemplate(template, context, location, draggable){
	// Javascript templating function
	var source = $(template).html();
	var compiled = Handlebars.compile(source);
	var html = compiled(context)
	$(location).append(html)
	// Provides option to make templates draggable
	if (draggable) {
		$('.individual-order:last-child').draggable({
			snap: ".grill",
			snapMode: 'inner',
			revert: function(event, ui){
				$(this).data("uiDraggable").originalPosition = {top:0, left:0}
				return !event
			}
		});
	};
};

