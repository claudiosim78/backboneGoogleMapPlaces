//---------------------------------------
// Place Collection
// ---------------
// The collection of places is backed by *localStorage* instead of a remote
// server.
//---------------------------------------
var PlaceList = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: Place,

  localStorage: new Store("places"),

  add_new: function(place){
    this.create(place);
  },

  // Places are sorted by their name
  comparator: function(place) {
    return place.get('name');
  },

  remove_all: function (){
    var model;
    while (model = this.pop()){
      model.destroy();
    }
  }
});