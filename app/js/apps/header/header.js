Groovehack.module('HeaderApp', function(Header, Groovehack) {
  var API;
  API = {
    listHeader: function() {
      return Header.List.Controller.listHeader();
    }
  };
  Groovehack.commands.setHandler('set:active:header', function(name) {
    return Groovehack.HeaderApp.List.Controller.setActiveHeader(name);
  });
  Header.on('start', function() {
    return API.listHeader();
  });
  return this;
});

Groovehack.module('HeaderApp.List', function(List, Groovehack, Backbone, Marionette) {
  List.Header = Marionette.ItemView.extend({
    template: templates.header.item.tmpl,
    tagName: 'li',
    events: {
      'click a': 'navigate'
    },
    navigate: function(e) {
      e.preventDefault();
      return this.trigger('navigate', this.model);
    },
    onRender: function() {
      if (this.model.selected) {
        return this.$el.addClass('active');
      }
    }
  });
  List.Headers = Marionette.CompositeView.extend({
    template: templates.header.tmpl,
    childView: List.Header,
    childViewContainer: 'ul',
    events: {
      'click #logo': 'logoClicked'
    },
    logoClicked: function(e) {
      e.preventDefault();
      return this.trigger('logo:clicked');
    }
  });
  return List.Controller = {
    listHeader: function() {
      var headers, links;
      links = Groovehack.request('header:entities');
      headers = new List.Headers({
        collection: links
      });
      headers.on('logo:clicked', function() {
        return Groovehack.trigger('welcome:show');
      });
      headers.on('childview:navigate', function(childView, model) {
        var trigger;
        trigger = model.get('navigationTrigger');
        return Groovehack.trigger(trigger);
      });
      return Groovehack.headerRegion.show(headers);
    },
    setActiveHeader: function(headerUrl) {
      var headerToSelect, links;
      links = Groovehack.request('header:entities');
      headerToSelect = links.find(function(header) {
        return header.get('url' === headerUrl);
      });
      headerToSelect.select();
      return links.trigger('reset');
    }
  };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHMvaGVhZGVyL2hlYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsVUFBVSxDQUFDLE1BQVgsQ0FBa0IsV0FBbEIsRUFBK0IsU0FBQyxNQUFELEVBQVMsVUFBVCxHQUFBO0FBQzdCLE1BQUEsR0FBQTtBQUFBLEVBQUEsR0FBQSxHQUNFO0FBQUEsSUFBQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBdkIsQ0FBQSxFQURVO0lBQUEsQ0FBWjtHQURGLENBQUE7QUFBQSxFQUlBLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBcEIsQ0FBK0IsbUJBQS9CLEVBQW9ELFNBQUMsSUFBRCxHQUFBO1dBQ2xELFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFyQyxDQUFxRCxJQUFyRCxFQURrRDtFQUFBLENBQXBELENBSkEsQ0FBQTtBQUFBLEVBT0EsTUFBTSxDQUFDLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLFNBQUEsR0FBQTtXQUNqQixHQUFHLENBQUMsVUFBSixDQUFBLEVBRGlCO0VBQUEsQ0FBbkIsQ0FQQSxDQUFBO1NBVUEsS0FYNkI7QUFBQSxDQUEvQixDQUFBLENBQUE7O0FBQUEsVUFhVSxDQUFDLE1BQVgsQ0FBa0IsZ0JBQWxCLEVBQW9DLFNBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsUUFBbkIsRUFBNkIsVUFBN0IsR0FBQTtBQUlsQyxFQUFBLElBQUksQ0FBQyxNQUFMLEdBQWMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFwQixDQUVaO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBaEM7QUFBQSxJQUNBLE9BQUEsRUFBUyxJQURUO0FBQUEsSUFHQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFNBQUEsRUFBVyxVQUFYO0tBSkY7QUFBQSxJQU1BLFFBQUEsRUFBVSxTQUFDLENBQUQsR0FBQTtBQUNSLE1BQUEsQ0FBQyxDQUFDLGNBQUYsQ0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTLFVBQVQsRUFBcUIsSUFBQyxDQUFBLEtBQXRCLEVBRlE7SUFBQSxDQU5WO0FBQUEsSUFVQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUEwQixJQUFDLENBQUEsS0FBSyxDQUFDLFFBQWpDO2VBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsUUFBZCxFQUFBO09BRFE7SUFBQSxDQVZWO0dBRlksQ0FBZCxDQUFBO0FBQUEsRUFlQSxJQUFJLENBQUMsT0FBTCxHQUFlLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBekIsQ0FFYjtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBM0I7QUFBQSxJQUNBLFNBQUEsRUFBVyxJQUFJLENBQUMsTUFEaEI7QUFBQSxJQUVBLGtCQUFBLEVBQW9CLElBRnBCO0FBQUEsSUFJQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLGFBQUEsRUFBZSxhQUFmO0tBTEY7QUFBQSxJQU9BLFdBQUEsRUFBYSxTQUFDLENBQUQsR0FBQTtBQUNYLE1BQUEsQ0FBQyxDQUFDLGNBQUYsQ0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTLGNBQVQsRUFGVztJQUFBLENBUGI7R0FGYSxDQWZmLENBQUE7U0E4QkEsSUFBSSxDQUFDLFVBQUwsR0FDRTtBQUFBLElBQUEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsY0FBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLFVBQVUsQ0FBQyxPQUFYLENBQW1CLGlCQUFuQixDQUFSLENBQUE7QUFBQSxNQUNBLE9BQUEsR0FBYyxJQUFBLElBQUksQ0FBQyxPQUFMLENBQWE7QUFBQSxRQUFBLFVBQUEsRUFBWSxLQUFaO09BQWIsQ0FEZCxDQUFBO0FBQUEsTUFHQSxPQUFPLENBQUMsRUFBUixDQUFXLGNBQVgsRUFBMkIsU0FBQSxHQUFBO2VBQ3pCLFVBQVUsQ0FBQyxPQUFYLENBQW1CLGNBQW5CLEVBRHlCO01BQUEsQ0FBM0IsQ0FIQSxDQUFBO0FBQUEsTUFNQSxPQUFPLENBQUMsRUFBUixDQUFXLG9CQUFYLEVBQWlDLFNBQUMsU0FBRCxFQUFZLEtBQVosR0FBQTtBQUMvQixZQUFBLE9BQUE7QUFBQSxRQUFBLE9BQUEsR0FBVSxLQUFLLENBQUMsR0FBTixDQUFVLG1CQUFWLENBQVYsQ0FBQTtlQUNBLFVBQVUsQ0FBQyxPQUFYLENBQW1CLE9BQW5CLEVBRitCO01BQUEsQ0FBakMsQ0FOQSxDQUFBO2FBVUEsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUF4QixDQUE2QixPQUE3QixFQVhVO0lBQUEsQ0FBWjtBQUFBLElBYUEsZUFBQSxFQUFpQixTQUFDLFNBQUQsR0FBQTtBQUNmLFVBQUEscUJBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxVQUFVLENBQUMsT0FBWCxDQUFtQixpQkFBbkIsQ0FBUixDQUFBO0FBQUEsTUFDQSxjQUFBLEdBQWlCLEtBQUssQ0FBQyxJQUFOLENBQVcsU0FBQyxNQUFELEdBQUE7ZUFDMUIsTUFBTSxDQUFDLEdBQVAsQ0FBVyxLQUFBLEtBQVMsU0FBcEIsRUFEMEI7TUFBQSxDQUFYLENBRGpCLENBQUE7QUFBQSxNQUlBLGNBQWMsQ0FBQyxNQUFmLENBQUEsQ0FKQSxDQUFBO2FBS0EsS0FBSyxDQUFDLE9BQU4sQ0FBYyxPQUFkLEVBTmU7SUFBQSxDQWJqQjtJQW5DZ0M7QUFBQSxDQUFwQyxDQWJBLENBQUEiLCJmaWxlIjoiYXBwcy9oZWFkZXIvaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiIyBBcHBcblxuR3Jvb3ZlaGFjay5tb2R1bGUgJ0hlYWRlckFwcCcsIChIZWFkZXIsIEdyb292ZWhhY2spIC0+XG4gIEFQSSA9XG4gICAgbGlzdEhlYWRlcjogLT5cbiAgICAgIEhlYWRlci5MaXN0LkNvbnRyb2xsZXIubGlzdEhlYWRlcigpXG5cbiAgR3Jvb3ZlaGFjay5jb21tYW5kcy5zZXRIYW5kbGVyICdzZXQ6YWN0aXZlOmhlYWRlcicsIChuYW1lKSAtPlxuICAgIEdyb292ZWhhY2suSGVhZGVyQXBwLkxpc3QuQ29udHJvbGxlci5zZXRBY3RpdmVIZWFkZXIgbmFtZVxuXG4gIEhlYWRlci5vbiAnc3RhcnQnLCAtPlxuICAgIEFQSS5saXN0SGVhZGVyKClcblxuICBAXG5cbkdyb292ZWhhY2subW9kdWxlICdIZWFkZXJBcHAuTGlzdCcsIChMaXN0LCBHcm9vdmVoYWNrLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSkgLT5cblxuICAjIFZpZXdzXG5cbiAgTGlzdC5IZWFkZXIgPSBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZFxuXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlcy5oZWFkZXIuaXRlbS50bXBsXG4gICAgdGFnTmFtZTogJ2xpJ1xuXG4gICAgZXZlbnRzOlxuICAgICAgJ2NsaWNrIGEnOiAnbmF2aWdhdGUnXG5cbiAgICBuYXZpZ2F0ZTogKGUpIC0+XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIEB0cmlnZ2VyICduYXZpZ2F0ZScsIEBtb2RlbFxuXG4gICAgb25SZW5kZXI6IC0+XG4gICAgICBAJGVsLmFkZENsYXNzICdhY3RpdmUnIGlmIEBtb2RlbC5zZWxlY3RlZFxuXG4gIExpc3QuSGVhZGVycyA9IE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldy5leHRlbmRcblxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZXMuaGVhZGVyLnRtcGxcbiAgICBjaGlsZFZpZXc6IExpc3QuSGVhZGVyXG4gICAgY2hpbGRWaWV3Q29udGFpbmVyOiAndWwnXG5cbiAgICBldmVudHM6XG4gICAgICAnY2xpY2sgI2xvZ28nOiAnbG9nb0NsaWNrZWQnXG5cbiAgICBsb2dvQ2xpY2tlZDogKGUpIC0+XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIEB0cmlnZ2VyICdsb2dvOmNsaWNrZWQnXG5cbiAgIyBDb250cm9sbGVyXG5cbiAgTGlzdC5Db250cm9sbGVyID1cbiAgICBsaXN0SGVhZGVyOiAtPlxuICAgICAgbGlua3MgPSBHcm9vdmVoYWNrLnJlcXVlc3QgJ2hlYWRlcjplbnRpdGllcydcbiAgICAgIGhlYWRlcnMgPSBuZXcgTGlzdC5IZWFkZXJzIGNvbGxlY3Rpb246IGxpbmtzXG5cbiAgICAgIGhlYWRlcnMub24gJ2xvZ286Y2xpY2tlZCcsIC0+XG4gICAgICAgIEdyb292ZWhhY2sudHJpZ2dlciAnd2VsY29tZTpzaG93J1xuXG4gICAgICBoZWFkZXJzLm9uICdjaGlsZHZpZXc6bmF2aWdhdGUnLCAoY2hpbGRWaWV3LCBtb2RlbCkgLT5cbiAgICAgICAgdHJpZ2dlciA9IG1vZGVsLmdldCAnbmF2aWdhdGlvblRyaWdnZXInXG4gICAgICAgIEdyb292ZWhhY2sudHJpZ2dlcih0cmlnZ2VyKVxuXG4gICAgICBHcm9vdmVoYWNrLmhlYWRlclJlZ2lvbi5zaG93IGhlYWRlcnNcblxuICAgIHNldEFjdGl2ZUhlYWRlcjogKGhlYWRlclVybCkgLT5cbiAgICAgIGxpbmtzID0gR3Jvb3ZlaGFjay5yZXF1ZXN0ICdoZWFkZXI6ZW50aXRpZXMnXG4gICAgICBoZWFkZXJUb1NlbGVjdCA9IGxpbmtzLmZpbmQgKGhlYWRlcikgLT5cbiAgICAgICAgaGVhZGVyLmdldCAndXJsJyBpcyBoZWFkZXJVcmxcbiAgICAgIFxuICAgICAgaGVhZGVyVG9TZWxlY3Quc2VsZWN0KClcbiAgICAgIGxpbmtzLnRyaWdnZXIgJ3Jlc2V0JyJdfQ==