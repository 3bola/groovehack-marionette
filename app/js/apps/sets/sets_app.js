Groovehack.module('SetsApp', function(SetsApp, Groovehack) {
  var API;
  SetsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "sets": "listSets",
      "sets/:id": "showSet",
      "artists": "listArtists",
      "artist/:id": "showArtist",
      "venues": "listVenues",
      "venue/:id": "showVenue"
    }
  });
  API = {
    listSets: function() {
      SetsApp.List.Controller.listSets();
      return Groovehack.execute("set:active:header", "sets");
    },
    showSet: function(id) {
      SetsApp.Show.Controller.showSet(id);
      return Groovehack.execute("set:active:header", "sets");
    },
    listArtists: function() {
      SetsApp.List.Controller.listArtists();
      return Groovehack.execute("set:active:header", "artists");
    },
    showArtist: function(id) {
      SetsApp.Show.Controller.showArtist(id);
      return Groovehack.execute("set:active:header", "artists");
    },
    listVenues: function() {
      SetsApp.List.Controller.listVenues();
      return Groovehack.execute("set:active:header", "venues");
    },
    showVenue: function(id) {
      SetsApp.Show.Controller.showVenue(id);
      return Groovehack.execute("set:active:header", "venues");
    }
  };
  Groovehack.on("sets:list", function() {
    Groovehack.navigate("sets");
    return API.listSets();
  });
  Groovehack.on("artists:list", function() {
    Groovehack.navigate("artists");
    return API.listArtists();
  });
  Groovehack.on("venues:list", function() {
    Groovehack.navigate("venues");
    return API.listVenues();
  });
  Groovehack.on("set:show", function(id) {
    Groovehack.navigate("set/" + id);
    return API.showSet(id);
  });
  Groovehack.addInitializer(function() {
    return new SetsApp.Router({
      controller: API
    });
  });
  return this;
});

Groovehack.module('SetsApp.List', function(List, Groovehack, Backbone, Marionette, $, _) {
  return List.Controller = {
    listSets: function() {
      var fetchingSets, listLayout, listPanel;
      fetchingSets = Groovehack.request('set:entities');
      listLayout = new List.Layout();
      listPanel = new List.Panel();
      return $.when(fetchingSets).done(function(sets) {
        var setsListView;
        setsListView = new List.List({
          collection: sets
        });
        listLayout.on('show', function() {
          listLayout.panelRegion.show(listPanel);
          return listLayout.listRegion.show(setsListView);
        });
        return Groovehack.mainRegion.show(listLayout);
      });
    },
    listArtists: function() {
      var fetchingArtists, listLayout, listPanel;
      fetchingArtists = Groovehack.request('artist:entities');
      listLayout = new List.Layout();
      listPanel = new List.Panel();
      return $.when(fetchingArtists).done(function(artists) {
        var setsListView;
        setsListView = new List.List({
          collection: artists
        });
        listLayout.on('show', function() {
          listLayout.panelRegion.show(listPanel);
          return listLayout.listRegion.show(setsListView);
        });
        return Groovehack.mainRegion.show(listLayout);
      });
    },
    listVenues: function() {
      var fetchingVenues, listLayout, listPanel;
      fetchingVenues = Groovehack.request('venue:entities');
      listLayout = new List.Layout();
      listPanel = new List.Panel();
      return $.when(fetchingVenues).done(function(venues) {
        var setsListView;
        setsListView = new List.List({
          collection: venues
        });
        listLayout.on('show', function() {
          listLayout.panelRegion.show(listPanel);
          return listLayout.listRegion.show(setsListView);
        });
        return Groovehack.mainRegion.show(listLayout);
      });
    }
  };
});

Groovehack.module('SetsApp.List', function(List, Groovehack, Backbone, Marionette, $, _) {
  List.Layout = Marionette.LayoutView.extend({
    className: 'list-layout',
    template: T.sets.tmpl,
    regions: {
      panelRegion: "#list-panel",
      listRegion: "#list-list"
    }
  });
  List.Panel = Marionette.ItemView.extend({
    className: "panel",
    template: T.sets.list.panel.tmpl
  });
  List.Item = Marionette.ItemView.extend({
    tagName: "li",
    template: T.sets.list.item.tmpl
  });
  return List.List = Marionette.CompositeView.extend({
    className: "list",
    template: T.sets.list.tmpl,
    childView: List.Item,
    childViewContainer: "ul",
    initialize: function() {
      return this.listenTo(this.collection, "reset", function() {
        return this.attachHtml = function(collectionView, childView, index) {
          console.log('item', childView);
          return collectionView.$el.append(childView.el);
        };
      });
    },
    onRenderCollection: function() {
      return this.attachHtml = function(collectionView, childView, index) {
        return collectionView.$el.prepend(childView.el);
      };
    }
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHMvc2V0cy9zZXRzX2FwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsVUFBVSxDQUFDLE1BQVgsQ0FBa0IsU0FBbEIsRUFBNkIsU0FBQyxPQUFELEVBQVUsVUFBVixHQUFBO0FBRTNCLE1BQUEsR0FBQTtBQUFBLEVBQUEsT0FBTyxDQUFDLE1BQVIsR0FBaUIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFyQixDQUNmO0FBQUEsSUFBQSxTQUFBLEVBQ0U7QUFBQSxNQUFBLE1BQUEsRUFBYyxVQUFkO0FBQUEsTUFDQSxVQUFBLEVBQWMsU0FEZDtBQUFBLE1BRUEsU0FBQSxFQUFjLGFBRmQ7QUFBQSxNQUdBLFlBQUEsRUFBYyxZQUhkO0FBQUEsTUFJQSxRQUFBLEVBQWMsWUFKZDtBQUFBLE1BS0EsV0FBQSxFQUFjLFdBTGQ7S0FERjtHQURlLENBQWpCLENBQUE7QUFBQSxFQVNBLEdBQUEsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBeEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxVQUFVLENBQUMsT0FBWCxDQUFtQixtQkFBbkIsRUFBd0MsTUFBeEMsRUFGUTtJQUFBLENBQVY7QUFBQSxJQUdBLE9BQUEsRUFBUyxTQUFDLEVBQUQsR0FBQTtBQUNQLE1BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBeEIsQ0FBZ0MsRUFBaEMsQ0FBQSxDQUFBO2FBQ0EsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsbUJBQW5CLEVBQXdDLE1BQXhDLEVBRk87SUFBQSxDQUhUO0FBQUEsSUFNQSxXQUFBLEVBQWEsU0FBQSxHQUFBO0FBQ1gsTUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUF4QixDQUFBLENBQUEsQ0FBQTthQUNBLFVBQVUsQ0FBQyxPQUFYLENBQW1CLG1CQUFuQixFQUF3QyxTQUF4QyxFQUZXO0lBQUEsQ0FOYjtBQUFBLElB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R0FBRyxDQUFDLE1BQW5CLENBQTBCLFNBQVMsQ0FBQyxFQUFwQyxFQUZZO1FBQUEsRUFEZ0I7TUFBQSxDQUFoQyxFQURVO0lBQUEsQ0FMWjtBQUFBLElBV0Esa0JBQUEsRUFBb0IsU0FBQSxHQUFBO2FBQ2xCLElBQUMsQ0FBQSxVQUFELEdBQWMsU0FBQyxjQUFELEVBQWlCLFNBQWpCLEVBQTRCLEtBQTVCLEdBQUE7ZUFDWixjQUFjLENBQUMsR0FBRyxDQUFDLE9BQW5CLENBQTJCLFNBQVMsQ0FBQyxFQUFyQyxFQURZO01BQUEsRUFESTtJQUFBLENBWHBCO0dBRFUsRUFyQm9CO0FBQUEsQ0FBbEMsQ0FuSEEsQ0FBQSIsImZpbGUiOiJhcHBzL3NldHMvc2V0c19hcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIjIEFwcFxuXG5Hcm9vdmVoYWNrLm1vZHVsZSAnU2V0c0FwcCcsIChTZXRzQXBwLCBHcm9vdmVoYWNrKSAtPlxuXG4gIFNldHNBcHAuUm91dGVyID0gTWFyaW9uZXR0ZS5BcHBSb3V0ZXIuZXh0ZW5kXG4gICAgYXBwUm91dGVzOlxuICAgICAgXCJzZXRzXCI6ICAgICAgIFwibGlzdFNldHNcIlxuICAgICAgXCJzZXRzLzppZFwiOiAgIFwic2hvd1NldFwiXG4gICAgICBcImFydGlzdHNcIjogICAgXCJsaXN0QXJ0aXN0c1wiXG4gICAgICBcImFydGlzdC86aWRcIjogXCJzaG93QXJ0aXN0XCJcbiAgICAgIFwidmVudWVzXCI6ICAgICBcImxpc3RWZW51ZXNcIlxuICAgICAgXCJ2ZW51ZS86aWRcIjogIFwic2hvd1ZlbnVlXCJcblxuICBBUEkgPVxuICAgIGxpc3RTZXRzOiAtPlxuICAgICAgU2V0c0FwcC5MaXN0LkNvbnRyb2xsZXIubGlzdFNldHMoKVxuICAgICAgR3Jvb3ZlaGFjay5leGVjdXRlIFwic2V0OmFjdGl2ZTpoZWFkZXJcIiwgXCJzZXRzXCJcbiAgICBzaG93U2V0OiAoaWQpIC0+XG4gICAgICBTZXRzQXBwLlNob3cuQ29udHJvbGxlci5zaG93U2V0KGlkKVxuICAgICAgR3Jvb3ZlaGFjay5leGVjdXRlIFwic2V0OmFjdGl2ZTpoZWFkZXJcIiwgXCJzZXRzXCJcbiAgICBsaXN0QXJ0aXN0czogLT5cbiAgICAgIFNldHNBcHAuTGlzdC5Db250cm9sbGVyLmxpc3RBcnRpc3RzKClcbiAgICAgIEdyb292ZWhhY2suZXhlY3V0ZSBcInNldDphY3RpdmU6aGVhZGVyXCIsIFwiYXJ0aXN0c1wiXG4gICAgc2hvd0FydGlzdDogKGlkKSAtPlxuICAgICAgU2V0c0FwcC5TaG93LkNvbnRyb2xsZXIuc2hvd0FydGlzdChpZClcbiAgICAgIEdyb292ZWhhY2suZXhlY3V0ZSBcInNldDphY3RpdmU6aGVhZGVyXCIsIFwiYXJ0aXN0c1wiXG4gICAgbGlzdFZlbnVlczogLT5cbiAgICAgIFNldHNBcHAuTGlzdC5Db250cm9sbGVyLmxpc3RWZW51ZXMoKVxuICAgICAgR3Jvb3ZlaGFjay5leGVjdXRlIFwic2V0OmFjdGl2ZTpoZWFkZXJcIiwgXCJ2ZW51ZXNcIlxuICAgIHNob3dWZW51ZTogKGlkKSAtPlxuICAgICAgU2V0c0FwcC5TaG93LkNvbnRyb2xsZXIuc2hvd1ZlbnVlKGlkKVxuICAgICAgR3Jvb3ZlaGFjay5leGVjdXRlIFwic2V0OmFjdGl2ZTpoZWFkZXJcIiwgXCJ2ZW51ZXNcIlxuXG4gIEdyb292ZWhhY2sub24gXCJzZXRzOmxpc3RcIiwgLT5cbiAgICBHcm9vdmVoYWNrLm5hdmlnYXRlIFwic2V0c1wiXG4gICAgQVBJLmxpc3RTZXRzKClcblxuICBHcm9vdmVoYWNrLm9uIFwiYXJ0aXN0czpsaXN0XCIsIC0+XG4gICAgR3Jvb3ZlaGFjay5uYXZpZ2F0ZSBcImFydGlzdHNcIlxuICAgIEFQSS5saXN0QXJ0aXN0cygpXG5cbiAgR3Jvb3ZlaGFjay5vbiBcInZlbnVlczpsaXN0XCIsIC0+XG4gICAgR3Jvb3ZlaGFjay5uYXZpZ2F0ZSBcInZlbnVlc1wiXG4gICAgQVBJLmxpc3RWZW51ZXMoKVxuXG4gIEdyb292ZWhhY2sub24gXCJzZXQ6c2hvd1wiLCAoaWQpIC0+XG4gICAgR3Jvb3ZlaGFjay5uYXZpZ2F0ZSBcInNldC9cIiArIGlkXG4gICAgQVBJLnNob3dTZXQoaWQpXG5cbiAgR3Jvb3ZlaGFjay5hZGRJbml0aWFsaXplciAtPlxuICAgIG5ldyBTZXRzQXBwLlJvdXRlclxuICAgICAgY29udHJvbGxlcjogQVBJXG5cbiAgQFxuXG4jIENvbnRyb2xsZXJzXG5cbkdyb292ZWhhY2subW9kdWxlICdTZXRzQXBwLkxpc3QnLCAoTGlzdCwgR3Jvb3ZlaGFjaywgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cbiAgTGlzdC5Db250cm9sbGVyID1cblxuICAgIGxpc3RTZXRzOiAtPlxuXG4gICAgICBmZXRjaGluZ1NldHMgPSBHcm9vdmVoYWNrLnJlcXVlc3QgJ3NldDplbnRpdGllcydcblxuICAgICAgbGlzdExheW91dCA9IG5ldyBMaXN0LkxheW91dCgpXG4gICAgICBsaXN0UGFuZWwgPSBuZXcgTGlzdC5QYW5lbCgpXG5cbiAgICAgICQud2hlbihmZXRjaGluZ1NldHMpLmRvbmUgKHNldHMpIC0+XG5cbiAgICAgICAgc2V0c0xpc3RWaWV3ID0gbmV3IExpc3QuTGlzdFxuICAgICAgICAgIGNvbGxlY3Rpb246IHNldHNcblxuICAgICAgICBsaXN0TGF5b3V0Lm9uICdzaG93JywgLT5cbiAgICAgICAgICBsaXN0TGF5b3V0LnBhbmVsUmVnaW9uLnNob3cgbGlzdFBhbmVsXG4gICAgICAgICAgbGlzdExheW91dC5saXN0UmVnaW9uLnNob3cgc2V0c0xpc3RWaWV3XG5cbiAgICAgICAgR3Jvb3ZlaGFjay5tYWluUmVnaW9uLnNob3cgbGlzdExheW91dFxuXG4gICAgbGlzdEFydGlzdHM6IC0+XG5cbiAgICAgIGZldGNoaW5nQXJ0aXN0cyA9IEdyb292ZWhhY2sucmVxdWVzdCAnYXJ0aXN0OmVudGl0aWVzJ1xuXG4gICAgICBsaXN0TGF5b3V0ID0gbmV3IExpc3QuTGF5b3V0KClcbiAgICAgIGxpc3RQYW5lbCA9IG5ldyBMaXN0LlBhbmVsKClcblxuICAgICAgJC53aGVuKGZldGNoaW5nQXJ0aXN0cykuZG9uZSAoYXJ0aXN0cykgLT5cblxuICAgICAgICBzZXRzTGlzdFZpZXcgPSBuZXcgTGlzdC5MaXN0XG4gICAgICAgICAgY29sbGVjdGlvbjogYXJ0aXN0c1xuXG4gICAgICAgIGxpc3RMYXlvdXQub24gJ3Nob3cnLCAtPlxuICAgICAgICAgIGxpc3RMYXlvdXQucGFuZWxSZWdpb24uc2hvdyBsaXN0UGFuZWxcbiAgICAgICAgICBsaXN0TGF5b3V0Lmxpc3RSZWdpb24uc2hvdyBzZXRzTGlzdFZpZXdcblxuICAgICAgICBHcm9vdmVoYWNrLm1haW5SZWdpb24uc2hvdyBsaXN0TGF5b3V0XG5cbiAgICBsaXN0VmVudWVzOiAtPlxuXG4gICAgICBmZXRjaGluZ1ZlbnVlcyA9IEdyb292ZWhhY2sucmVxdWVzdCAndmVudWU6ZW50aXRpZXMnXG5cbiAgICAgIGxpc3RMYXlvdXQgPSBuZXcgTGlzdC5MYXlvdXQoKVxuICAgICAgbGlzdFBhbmVsID0gbmV3IExpc3QuUGFuZWwoKVxuXG4gICAgICAkLndoZW4oZmV0Y2hpbmdWZW51ZXMpLmRvbmUgKHZlbnVlcykgLT5cblxuICAgICAgICBzZXRzTGlzdFZpZXcgPSBuZXcgTGlzdC5MaXN0XG4gICAgICAgICAgY29sbGVjdGlvbjogdmVudWVzXG5cbiAgICAgICAgbGlzdExheW91dC5vbiAnc2hvdycsIC0+XG4gICAgICAgICAgbGlzdExheW91dC5wYW5lbFJlZ2lvbi5zaG93IGxpc3RQYW5lbFxuICAgICAgICAgIGxpc3RMYXlvdXQubGlzdFJlZ2lvbi5zaG93IHNldHNMaXN0Vmlld1xuXG4gICAgICAgIEdyb292ZWhhY2subWFpblJlZ2lvbi5zaG93IGxpc3RMYXlvdXRcblxuIyBMaXN0IHZpZXdcblxuR3Jvb3ZlaGFjay5tb2R1bGUgJ1NldHNBcHAuTGlzdCcsIChMaXN0LCBHcm9vdmVoYWNrLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT5cblxuICAjIExpc3RhbiBsYXlvdXR0aVxuICBMaXN0LkxheW91dCA9IE1hcmlvbmV0dGUuTGF5b3V0Vmlldy5leHRlbmRcbiAgICBjbGFzc05hbWU6ICdsaXN0LWxheW91dCdcbiAgICB0ZW1wbGF0ZTogVC5zZXRzLnRtcGwsXG4gICAgcmVnaW9uczpcbiAgICAgIHBhbmVsUmVnaW9uOiBcIiNsaXN0LXBhbmVsXCJcbiAgICAgIGxpc3RSZWdpb246IFwiI2xpc3QtbGlzdFwiXG5cbiAgIyBMaXN0YW4gcGFuZWVsaSwgam9zc2EgdHVsZWUgb2xlbWFhbiBsaXN0YW4gZmlsdHRlcsO2aW50aSBqYSBqw6RyamVzdGVseXRvaW1pbm5vdFxuICBMaXN0LlBhbmVsID0gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmRcbiAgICBjbGFzc05hbWU6IFwicGFuZWxcIlxuICAgIHRlbXBsYXRlOiBULnNldHMubGlzdC5wYW5lbC50bXBsXG5cbiAgIyBUaHVtYm5haWxpXG4gIExpc3QuSXRlbSA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kXG4gICAgdGFnTmFtZTogXCJsaVwiXG4gICAgdGVtcGxhdGU6IFQuc2V0cy5saXN0Lml0ZW0udG1wbFxuXG4gICMgTGlzdGFuw6RreW3DpFxuICBMaXN0Lkxpc3QgPSBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcuZXh0ZW5kXG4gICAgY2xhc3NOYW1lOiBcImxpc3RcIlxuICAgIHRlbXBsYXRlOiBULnNldHMubGlzdC50bXBsXG4gICAgY2hpbGRWaWV3OiBMaXN0Lkl0ZW1cbiAgICBjaGlsZFZpZXdDb250YWluZXI6IFwidWxcIlxuXG4gICAgaW5pdGlhbGl6ZTogLT5cbiAgICAgIEBsaXN0ZW5UbyBAY29sbGVjdGlvbiwgXCJyZXNldFwiLCAtPlxuICAgICAgICBAYXR0YWNoSHRtbCA9IChjb2xsZWN0aW9uVmlldywgY2hpbGRWaWV3LCBpbmRleCkgLT5cbiAgICAgICAgICBjb25zb2xlLmxvZyAnaXRlbScsIGNoaWxkVmlld1xuICAgICAgICAgIGNvbGxlY3Rpb25WaWV3LiRlbC5hcHBlbmQgY2hpbGRWaWV3LmVsXG5cbiAgICBvblJlbmRlckNvbGxlY3Rpb246IC0+XG4gICAgICBAYXR0YWNoSHRtbCA9IChjb2xsZWN0aW9uVmlldywgY2hpbGRWaWV3LCBpbmRleCkgLT5cbiAgICAgICAgY29sbGVjdGlvblZpZXcuJGVsLnByZXBlbmQgY2hpbGRWaWV3LmVsIl19