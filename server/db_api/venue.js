var _ = require('lodash')

// Constructor for Venue objects before the 
function Venue(name, capacity, location, genres) {
		this.name = name;
		this.capacity = capacity;
		this.location = location;
		this.genres = genres;
}

// Constructor for Venue objects from the database.
function NodeVenue(_node) {
	_.extend(this, _node.properties)
		
		//if (this.capacity)
		//this.capacity = this.capacity.toNumber();
}

exports.Venue = Venue;
exports.NodeVenue = NodeVenue;