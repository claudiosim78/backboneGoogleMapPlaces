// global collection of **Places**.
var Places = new PlaceList();

var map;
var autocomplete;
var places;
//default coordinates of London initially used for center the map, if Geolocation is not supported by the browser
var initial_position = {
  "lat" : 51.50722,
  "lon" : -0.12750
};

//---------------------------------------
// The Application
// ---------------
// Our overall **AppView** is the top-level piece of UI.
//---------------------------------------
var AppView = Backbone.View.extend({

    //--------------------------------------
    // Initialize places
    //--------------------------------------
    _initialize_places : function(){

      // autocomplete object associated with the UI input control.
      autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')));
      places = new google.maps.places.PlacesService(this.map);

      google.maps.event.addListener(autocomplete, 'place_changed', this._onPlaceChanged);

    },

    //--------------------------------------
    // Initialize map
    //--------------------------------------
    _initialize_map : function(position){

      var center = new google.maps.LatLng(position.lat, position.lon);

      var styles = [
        {
          elementType: "geometry",
          stylers: [
            { lightness: 33 },
            { saturation: -90 }
          ]
        }
      ];

      var mapOptions = {
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: center,
          styles: styles
      };

      map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);
      this.map = map;

    },

    //--------------------------------------
    // When the user selects a city, get the place details for the city and zoom the map in on the city
    //--------------------------------------
    _onPlaceChanged : function(){
      var place = autocomplete.getPlace();
      if (place.geometry) {
        map.panTo(place.geometry.location);
        //map.setZoom(9);
      } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
      }
    },
    //--------------------------------------
    // map & places bootstrap
    //--------------------------------------
    bootstrap: function() {
        this._initialize_map(initial_position);
        this._initialize_places();
        Places.fetch();
        //create views
        var list_view = new PlaceListView({model: Places, map: this.map});
    },

    //--------------------------------------
    // App Initialization
    //--------------------------------------
    initialize: function() {
      var self = this;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
              initial_position.lat = position.coords.latitude;
              initial_position.lon = position.coords.longitude;
              self.bootstrap();
          },
          function errorCallback(error) {
              self.bootstrap();
          },
          {
              maximumAge:Infinity,
              timeout:2000
          }
        );
      }
      else {
        self.bootstrap();
      }

    }
});

// Load the application once the DOM is ready
var App = null;
$(function(){
  App = new AppView();
});
