//---------------------------------------
// Place Model
//---------------------------------------
var Place = Backbone.Model.extend({
  initialize: function() { },

  localStorage: new Store("places"),

  clear: function() {
    this.destroy();
  }
});
