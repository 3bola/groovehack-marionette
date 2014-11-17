Groovehack.module("Entities", function(Entities, Groovehack) {
  var API, initializeVenues;
  Entities.Venue = Backbone.Model.extend({
    urlRoot: "/api/venues",
    defaults: {
      name: "Name"
    }
  });
  Entities.VenueCollection = Backbone.Collection.extend({
    url: "/api/venues",
    model: Entities.Venue,
    comparator: "name"
  });
  initializeVenues = function() {
    var venues;
    venues = new Entities.VenueCollection([
      {
        id: 1,
        name: "Venue 1"
      }, {
        id: 2,
        name: "Venue 2"
      }
    ]);
    venues.forEach(function(venue) {
      return venue.save();
    });
    return venues.models;
  };
  API = {
    getVenueEntities: function() {
      var defer, promise, venues;
      venues = new Entities.VenueCollection();
      defer = $.Deferred();
      venues.fetch({
        success: function(data) {
          return defer.resolve(data);
        }
      });
      promise = defer.promise();
      $.when(promise).done(function(venues) {
        var models;
        if (venues.length === 0) {
          models = initializeVenues();
          return venues.reset(models);
        }
      });
      return promise;
    },
    getVenueEntity: function(venueId) {
      var defer, venue;
      venue = new Entities.Venue({
        id: venueId
      });
      defer = $.Deferred();
      setTimeout(function() {
        return venue.fetch({
          success: function(data) {
            return defer.resolve(data);
          },
          error: function(data) {
            return defer.resolve(void 0);
          }
        });
      }, 2000);
      return defer.promise();
    }
  };
  Groovehack.reqres.setHandler("venue:entities", function() {
    return API.getVenueEntities();
  });
  Groovehack.reqres.setHandler("venue:entity", function() {
    return API.getVenueEntity();
  });
  return this;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL3ZlbnVlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVLENBQUMsTUFBWCxDQUFrQixVQUFsQixFQUE4QixTQUFDLFFBQUQsRUFBVyxVQUFYLEdBQUE7QUFFN0IsTUFBQSxxQkFBQTtBQUFBLEVBQUEsUUFBUSxDQUFDLEtBQVQsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFmLENBRWhCO0FBQUEsSUFBQSxPQUFBLEVBQVMsYUFBVDtBQUFBLElBRUEsUUFBQSxFQUNDO0FBQUEsTUFBQSxJQUFBLEVBQU0sTUFBTjtLQUhEO0dBRmdCLENBQWpCLENBQUE7QUFBQSxFQVNBLFFBQVEsQ0FBQyxlQUFULEdBQTJCLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBcEIsQ0FDMUI7QUFBQSxJQUFBLEdBQUEsRUFBSyxhQUFMO0FBQUEsSUFDQSxLQUFBLEVBQU8sUUFBUSxDQUFDLEtBRGhCO0FBQUEsSUFFQSxVQUFBLEVBQVksTUFGWjtHQUQwQixDQVQzQixDQUFBO0FBQUEsRUFpQkEsZ0JBQUEsR0FBbUIsU0FBQSxHQUFBO0FBQ2xCLFFBQUEsTUFBQTtBQUFBLElBQUEsTUFBQSxHQUFhLElBQUEsUUFBUSxDQUFDLGVBQVQsQ0FBeUI7TUFDbkM7QUFBQSxRQUFBLEVBQUEsRUFBSSxDQUFKO0FBQUEsUUFBTyxJQUFBLEVBQU0sU0FBYjtPQURtQyxFQUVuQztBQUFBLFFBQUEsRUFBQSxFQUFJLENBQUo7QUFBQSxRQUFPLElBQUEsRUFBTSxTQUFiO09BRm1DO0tBQXpCLENBQWIsQ0FBQTtBQUFBLElBSUEsTUFBTSxDQUFDLE9BQVAsQ0FBZSxTQUFDLEtBQUQsR0FBQTthQUNkLEtBQUssQ0FBQyxJQUFOLENBQUEsRUFEYztJQUFBLENBQWYsQ0FKQSxDQUFBO1dBTUEsTUFBTSxDQUFDLE9BUFc7RUFBQSxDQWpCbkIsQ0FBQTtBQUFBLEVBMEJBLEdBQUEsR0FFQztBQUFBLElBQUEsZ0JBQUEsRUFBa0IsU0FBQSxHQUFBO0FBQ2pCLFVBQUEsc0JBQUE7QUFBQSxNQUFBLE1BQUEsR0FBYSxJQUFBLFFBQVEsQ0FBQyxlQUFULENBQUEsQ0FBYixDQUFBO0FBQUEsTUFDQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLFFBQUYsQ0FBQSxDQURSLENBQUE7QUFBQSxNQUVBLE1BQU0sQ0FBQyxLQUFQLENBQ0M7QUFBQSxRQUFBLE9BQUEsRUFBUyxTQUFDLElBQUQsR0FBQTtpQkFDUixLQUFLLENBQUMsT0FBTixDQUFjLElBQWQsRUFEUTtRQUFBLENBQVQ7T0FERCxDQUZBLENBQUE7QUFBQSxNQUtBLE9BQUEsR0FBVSxLQUFLLENBQUMsT0FBTixDQUFBLENBTFYsQ0FBQTtBQUFBLE1BTUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFQLENBQWUsQ0FBQyxJQUFoQixDQUFxQixTQUFDLE1BQUQsR0FBQTtBQUNwQixZQUFBLE1BQUE7QUFBQSxRQUFBLElBQUcsTUFBTSxDQUFDLE1BQVAsS0FBaUIsQ0FBcEI7QUFDQyxVQUFBLE1BQUEsR0FBUyxnQkFBQSxDQUFBLENBQVQsQ0FBQTtpQkFDQSxNQUFNLENBQUMsS0FBUCxDQUFhLE1BQWIsRUFGRDtTQURvQjtNQUFBLENBQXJCLENBTkEsQ0FBQTthQVVBLFFBWGlCO0lBQUEsQ0FBbEI7QUFBQSxJQWFBLGNBQUEsRUFBZ0IsU0FBQyxPQUFELEdBQUE7QUFDZixVQUFBLFlBQUE7QUFBQSxNQUFBLEtBQUEsR0FBWSxJQUFBLFFBQVEsQ0FBQyxLQUFULENBQWU7QUFBQSxRQUFBLEVBQUEsRUFBSSxPQUFKO09BQWYsQ0FBWixDQUFBO0FBQUEsTUFDQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLFFBQUYsQ0FBQSxDQURSLENBQUE7QUFBQSxNQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7ZUFDVixLQUFLLENBQUMsS0FBTixDQUNDO0FBQUEsVUFBQSxPQUFBLEVBQVMsU0FBQyxJQUFELEdBQUE7bUJBQ1IsS0FBSyxDQUFDLE9BQU4sQ0FBYyxJQUFkLEVBRFE7VUFBQSxDQUFUO0FBQUEsVUFFQSxLQUFBLEVBQU8sU0FBQyxJQUFELEdBQUE7bUJBQ04sS0FBSyxDQUFDLE9BQU4sQ0FBYyxNQUFkLEVBRE07VUFBQSxDQUZQO1NBREQsRUFEVTtNQUFBLENBQVgsRUFNRSxJQU5GLENBRkEsQ0FBQTthQVNBLEtBQUssQ0FBQyxPQUFOLENBQUEsRUFWZTtJQUFBLENBYmhCO0dBNUJELENBQUE7QUFBQSxFQXFEQSxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQWxCLENBQTZCLGdCQUE3QixFQUErQyxTQUFBLEdBQUE7V0FDOUMsR0FBRyxDQUFDLGdCQUFKLENBQUEsRUFEOEM7RUFBQSxDQUEvQyxDQXJEQSxDQUFBO0FBQUEsRUF3REEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFsQixDQUE2QixjQUE3QixFQUE2QyxTQUFBLEdBQUE7V0FDNUMsR0FBRyxDQUFDLGNBQUosQ0FBQSxFQUQ0QztFQUFBLENBQTdDLENBeERBLENBQUE7U0EyREEsS0E3RDZCO0FBQUEsQ0FBOUIsQ0FBQSxDQUFBIiwiZmlsZSI6ImVudGl0aWVzL3ZlbnVlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiR3Jvb3ZlaGFjay5tb2R1bGUgXCJFbnRpdGllc1wiLCAoRW50aXRpZXMsIEdyb292ZWhhY2spIC0+XG5cblx0RW50aXRpZXMuVmVudWUgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmRcblxuXHRcdHVybFJvb3Q6IFwiL2FwaS92ZW51ZXNcIlxuXG5cdFx0ZGVmYXVsdHM6XG5cdFx0XHRuYW1lOiBcIk5hbWVcIlxuXG5cdCNFbnRpdGllcy5jb25maWd1cmVTdG9yYWdlIEVudGl0aWVzLlZlbnVlXG5cblx0RW50aXRpZXMuVmVudWVDb2xsZWN0aW9uID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmRcblx0XHR1cmw6IFwiL2FwaS92ZW51ZXNcIlxuXHRcdG1vZGVsOiBFbnRpdGllcy5WZW51ZVxuXHRcdGNvbXBhcmF0b3I6IFwibmFtZVwiXG5cblxuXHQjRW50aXRpZXMuY29uZmlndXJlU3RvcmFnZSBFbnRpdGllcy5WZW51ZUNvbGxlY3Rpb25cblxuXHRpbml0aWFsaXplVmVudWVzID0gLT5cblx0XHR2ZW51ZXMgPSBuZXcgRW50aXRpZXMuVmVudWVDb2xsZWN0aW9uIFtcblx0XHRcdCggaWQ6IDEsIG5hbWU6IFwiVmVudWUgMVwiIClcblx0XHRcdCggaWQ6IDIsIG5hbWU6IFwiVmVudWUgMlwiIClcblx0XHRdXG5cdFx0dmVudWVzLmZvckVhY2ggKHZlbnVlKSAtPlxuXHRcdFx0dmVudWUuc2F2ZSgpXG5cdFx0dmVudWVzLm1vZGVsc1xuXG5cdEFQSSA9XG5cblx0XHRnZXRWZW51ZUVudGl0aWVzOiAtPlxuXHRcdFx0dmVudWVzID0gbmV3IEVudGl0aWVzLlZlbnVlQ29sbGVjdGlvbigpXG5cdFx0XHRkZWZlciA9ICQuRGVmZXJyZWQoKVxuXHRcdFx0dmVudWVzLmZldGNoXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKSAtPlxuXHRcdFx0XHRcdGRlZmVyLnJlc29sdmUoZGF0YSlcblx0XHRcdHByb21pc2UgPSBkZWZlci5wcm9taXNlKClcblx0XHRcdCQud2hlbihwcm9taXNlKS5kb25lICh2ZW51ZXMpIC0+XG5cdFx0XHRcdGlmIHZlbnVlcy5sZW5ndGggaXMgMFxuXHRcdFx0XHRcdG1vZGVscyA9IGluaXRpYWxpemVWZW51ZXMoKVxuXHRcdFx0XHRcdHZlbnVlcy5yZXNldChtb2RlbHMpXG5cdFx0XHRwcm9taXNlXG5cblx0XHRnZXRWZW51ZUVudGl0eTogKHZlbnVlSWQpIC0+XG5cdFx0XHR2ZW51ZSA9IG5ldyBFbnRpdGllcy5WZW51ZSBpZDogdmVudWVJZFxuXHRcdFx0ZGVmZXIgPSAkLkRlZmVycmVkKClcblx0XHRcdHNldFRpbWVvdXQgLT5cblx0XHRcdFx0dmVudWUuZmV0Y2hcblx0XHRcdFx0XHRzdWNjZXNzOiAoZGF0YSkgLT5cblx0XHRcdFx0XHRcdGRlZmVyLnJlc29sdmUgZGF0YVxuXHRcdFx0XHRcdGVycm9yOiAoZGF0YSkgLT5cblx0XHRcdFx0XHRcdGRlZmVyLnJlc29sdmUgdW5kZWZpbmVkXG5cdFx0XHQsIDIwMDBcblx0XHRcdGRlZmVyLnByb21pc2UoKVxuXG5cdEdyb292ZWhhY2sucmVxcmVzLnNldEhhbmRsZXIgXCJ2ZW51ZTplbnRpdGllc1wiLCAtPlxuXHRcdEFQSS5nZXRWZW51ZUVudGl0aWVzKClcblxuXHRHcm9vdmVoYWNrLnJlcXJlcy5zZXRIYW5kbGVyIFwidmVudWU6ZW50aXR5XCIsIC0+XG5cdFx0QVBJLmdldFZlbnVlRW50aXR5KClcblxuXHRAIl19