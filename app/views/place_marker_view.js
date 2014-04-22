//---------------------------------------
// Place Marker View
// --------------
// The DOM element for a place marker...
//---------------------------------------
var PlaceMarkerView = Backbone.View.extend({

    tagName:  "li",

    initialize: function(options) {
      var self = this;

      self.model = options.model;
      self.model.on('remove', self.remove, self);

      self.map = options.map;

      var pos = self.model.get('pos');

      self.marker = new google.maps.Marker({
          map: self.map,
          position: new google.maps.LatLng(pos.lat, pos.lon),
          animation: google.maps.Animation.DROP,
          title: self.model.name,
          descr : self.model.get('descr'),
          id : self.model.get('id')
      });

      self.marker.infowindow = new google.maps.InfoWindow({
        content: self.marker.descr
      });

      google.maps.event.addListener(self.marker, 'mouseover', self.show_place_info);
      google.maps.event.addListener(self.marker, 'mouseout', self.hide_place_info);
      google.maps.event.addListener(self.marker, 'click', self.show_place_detail);
    },

    //---------------------------------------
    // Event handlers for marker events
    //---------------------------------------
    show_place_detail : function(){
      this.hide_place_info();
      App.show_content();
    },

    hide_place_info : function(){
      this.infowindow.close();
    },

    show_place_info : function(){
      this.infowindow.open(this.map, this);
    },

    render: function() { },

    remove : function(){
      this.marker.setMap(null);
      this.marker = null;
    }
});
