//---------------------------------------
// Place List Item View
// --------------
// The DOM element for a place in a list of places.
//---------------------------------------
var PlaceListItemView = Backbone.View.extend({

  tagName : 'li',

  initialize: function(options) {
    this.marker_view = options.marker_view; //retain instance of google marker
    this.model.on('remove', this.remove, this); //subscribe to remove events on model
    this.render();
  },

  //----------------------------------
  // Events and event handlers
  //----------------------------------
  events: {
    'mouseover a': 'show_place_info',
    'mouseout a': 'hide_place_info',
    'click button': 'ask_delete_place',
    'click a.detail': 'show_place_info'
  },

  //show marker bubble
  show_place_info : function(){
    this.marker_view.show_place_info.call(this.marker_view.marker);
  },

  //hide marker bubble
  hide_place_info : function(){
    this.marker_view.hide_place_info.call(this.marker_view.marker);
  },

  //clicked on "delete"
  ask_delete_place : function(){
    var r = confirm("Do you really want to delete " + this.model.attributes.name + " from your places?");
      if (r == true){
        this.delete_place();
      }
      else{
        return false;
      }
  },

  //delete place
  delete_place : function(){
    this.model.clear();
  },
  //----------------------------------
  // END Events and event handlers
  //----------------------------------

  render: function() {
    this.$el.html('<div><a class="detail" title="' + this.model.get('name') + '" href="#" place_id="' + this.model.get('id') + '">' + this.model.get('name') + '</a> <button class="close">×</button></div>');
    return this;
  },

  remove: function() {
    this.$el.remove();
  }
});