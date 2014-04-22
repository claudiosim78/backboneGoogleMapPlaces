//---------------------------------------
// Place List View
// --------------
// The DOM element for a list of places.
//---------------------------------------
var PlaceListView = Backbone.View.extend({

    el:  $("#places_holder"),

    initialize: function(options) {
      this.map = options.map;
      this.model.on('add', this.added_place, this);
      this.list_container = $('#places_list_holder ul', this.$el);
      this.render();
    },

    //----------------------------------
    // Events and event handlers
    //----------------------------------
    events: {
      'keypress #autocomplete'  : "updateOnEnter"
    },

    //event handler for "new place" action
    popup_new_place: function (){
      this.model.add_new(this.getPlace());
    },

    //---------------------------------------
    // create and returns the proper place object
    //---------------------------------------
    getPlace: function() {
      var place =  autocomplete.getPlace();      
      var newPlace = {};
          newPlace.name = place.formatted_address;
          newPlace.id = place.id;
          newPlace.descr = "<div>"+newPlace.name+"</div>";
          newPlace.pos = {"lat":place.geometry.location["k"], "lon":place.geometry.location["A"]};
      return newPlace;
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.popup_new_place();
    },

    //----------------------------------
    // END Events and event handlers
    //----------------------------------

    //---------------------------------------
    // If a new place is added, create the proper views and render
    //---------------------------------------
    added_place : function (place){
      var marker_view = new PlaceMarkerView({ model: place, map: this.map });
      var item_view = new PlaceListItemView({ model: place, marker_view : marker_view });
      $(this.list_container).append(item_view.render().el);
    },

    //---------------------------------------
    // Render all
    //---------------------------------------
    render: function() {
      this.model.each (this.added_place, this);
    }
});