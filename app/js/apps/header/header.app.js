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
    template: T.header.item.tmpl,
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
    template: T.header.tmpl,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHMvaGVhZGVyL2hlYWRlci5hcHAuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFVBQVUsQ0FBQyxNQUFYLENBQWtCLFdBQWxCLEVBQStCLFNBQUMsTUFBRCxFQUFTLFVBQVQsR0FBQTtBQUM3QixNQUFBLEdBQUE7QUFBQSxFQUFBLEdBQUEsR0FDRTtBQUFBLElBQUEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQXZCLENBQUEsRUFEVTtJQUFBLENBQVo7R0FERixDQUFBO0FBQUEsRUFJQSxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQXBCLENBQStCLG1CQUEvQixFQUFvRCxTQUFDLElBQUQsR0FBQTtXQUNsRCxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBckMsQ0FBcUQsSUFBckQsRUFEa0Q7RUFBQSxDQUFwRCxDQUpBLENBQUE7QUFBQSxFQU9BLE1BQU0sQ0FBQyxFQUFQLENBQVUsT0FBVixFQUFtQixTQUFBLEdBQUE7V0FDakIsR0FBRyxDQUFDLFVBQUosQ0FBQSxFQURpQjtFQUFBLENBQW5CLENBUEEsQ0FBQTtTQVVBLEtBWDZCO0FBQUEsQ0FBL0IsQ0FBQSxDQUFBOztBQUFBLFVBYVUsQ0FBQyxNQUFYLENBQWtCLGdCQUFsQixFQUFvQyxTQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLFFBQW5CLEVBQTZCLFVBQTdCLEdBQUE7QUFJbEMsRUFBQSxJQUFJLENBQUMsTUFBTCxHQUFjLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBcEIsQ0FFWjtBQUFBLElBQUEsUUFBQSxFQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQXhCO0FBQUEsSUFDQSxPQUFBLEVBQVMsSUFEVDtBQUFBLElBR0EsTUFBQSxFQUNFO0FBQUEsTUFBQSxTQUFBLEVBQVcsVUFBWDtLQUpGO0FBQUEsSUFNQSxRQUFBLEVBQVUsU0FBQyxDQUFELEdBQUE7QUFDUixNQUFBLENBQUMsQ0FBQyxjQUFGLENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxVQUFULEVBQXFCLElBQUMsQ0FBQSxLQUF0QixFQUZRO0lBQUEsQ0FOVjtBQUFBLElBVUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBMEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQUFqQztlQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLFFBQWQsRUFBQTtPQURRO0lBQUEsQ0FWVjtHQUZZLENBQWQsQ0FBQTtBQUFBLEVBZUEsSUFBSSxDQUFDLE9BQUwsR0FBZSxVQUFVLENBQUMsYUFBYSxDQUFDLE1BQXpCLENBRWI7QUFBQSxJQUFBLFFBQUEsRUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQW5CO0FBQUEsSUFDQSxTQUFBLEVBQVcsSUFBSSxDQUFDLE1BRGhCO0FBQUEsSUFFQSxrQkFBQSxFQUFvQixJQUZwQjtBQUFBLElBSUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxhQUFBLEVBQWUsYUFBZjtLQUxGO0FBQUEsSUFPQSxXQUFBLEVBQWEsU0FBQyxDQUFELEdBQUE7QUFDWCxNQUFBLENBQUMsQ0FBQyxjQUFGLENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxjQUFULEVBRlc7SUFBQSxDQVBiO0dBRmEsQ0FmZixDQUFBO1NBOEJBLElBQUksQ0FBQyxVQUFMLEdBQ0U7QUFBQSxJQUFBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixVQUFBLGNBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxVQUFVLENBQUMsT0FBWCxDQUFtQixpQkFBbkIsQ0FBUixDQUFBO0FBQUEsTUFDQSxPQUFBLEdBQWMsSUFBQSxJQUFJLENBQUMsT0FBTCxDQUFhO0FBQUEsUUFBQSxVQUFBLEVBQVksS0FBWjtPQUFiLENBRGQsQ0FBQTtBQUFBLE1BR0EsT0FBTyxDQUFDLEVBQVIsQ0FBVyxjQUFYLEVBQTJCLFNBQUEsR0FBQTtlQUN6QixVQUFVLENBQUMsT0FBWCxDQUFtQixjQUFuQixFQUR5QjtNQUFBLENBQTNCLENBSEEsQ0FBQTtBQUFBLE1BTUEsT0FBTyxDQUFDLEVBQVIsQ0FBVyxvQkFBWCxFQUFpQyxTQUFDLFNBQUQsRUFBWSxLQUFaLEdBQUE7QUFDL0IsWUFBQSxPQUFBO0FBQUEsUUFBQSxPQUFBLEdBQVUsS0FBSyxDQUFDLEdBQU4sQ0FBVSxtQkFBVixDQUFWLENBQUE7ZUFDQSxVQUFVLENBQUMsT0FBWCxDQUFtQixPQUFuQixFQUYrQjtNQUFBLENBQWpDLENBTkEsQ0FBQTthQVVBLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBeEIsQ0FBNkIsT0FBN0IsRUFYVTtJQUFBLENBQVo7QUFBQSxJQWFBLGVBQUEsRUFBaUIsU0FBQyxTQUFELEdBQUE7QUFDZixVQUFBLHFCQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsaUJBQW5CLENBQVIsQ0FBQTtBQUFBLE1BQ0EsY0FBQSxHQUFpQixLQUFLLENBQUMsSUFBTixDQUFXLFNBQUMsTUFBRCxHQUFBO2VBQzFCLE1BQU0sQ0FBQyxHQUFQLENBQVcsS0FBQSxLQUFTLFNBQXBCLEVBRDBCO01BQUEsQ0FBWCxDQURqQixDQUFBO0FBQUEsTUFJQSxjQUFjLENBQUMsTUFBZixDQUFBLENBSkEsQ0FBQTthQUtBLEtBQUssQ0FBQyxPQUFOLENBQWMsT0FBZCxFQU5lO0lBQUEsQ0FiakI7SUFuQ2dDO0FBQUEsQ0FBcEMsQ0FiQSxDQUFBIiwiZmlsZSI6ImFwcHMvaGVhZGVyL2hlYWRlci5hcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIjIEFwcFxuXG5Hcm9vdmVoYWNrLm1vZHVsZSAnSGVhZGVyQXBwJywgKEhlYWRlciwgR3Jvb3ZlaGFjaykgLT5cbiAgQVBJID1cbiAgICBsaXN0SGVhZGVyOiAtPlxuICAgICAgSGVhZGVyLkxpc3QuQ29udHJvbGxlci5saXN0SGVhZGVyKClcblxuICBHcm9vdmVoYWNrLmNvbW1hbmRzLnNldEhhbmRsZXIgJ3NldDphY3RpdmU6aGVhZGVyJywgKG5hbWUpIC0+XG4gICAgR3Jvb3ZlaGFjay5IZWFkZXJBcHAuTGlzdC5Db250cm9sbGVyLnNldEFjdGl2ZUhlYWRlciBuYW1lXG5cbiAgSGVhZGVyLm9uICdzdGFydCcsIC0+XG4gICAgQVBJLmxpc3RIZWFkZXIoKVxuXG4gIEBcblxuR3Jvb3ZlaGFjay5tb2R1bGUgJ0hlYWRlckFwcC5MaXN0JywgKExpc3QsIEdyb292ZWhhY2ssIEJhY2tib25lLCBNYXJpb25ldHRlKSAtPlxuXG4gICMgVmlld3NcblxuICBMaXN0LkhlYWRlciA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kXG5cbiAgICB0ZW1wbGF0ZTogVC5oZWFkZXIuaXRlbS50bXBsXG4gICAgdGFnTmFtZTogJ2xpJ1xuXG4gICAgZXZlbnRzOlxuICAgICAgJ2NsaWNrIGEnOiAnbmF2aWdhdGUnXG5cbiAgICBuYXZpZ2F0ZTogKGUpIC0+XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIEB0cmlnZ2VyICduYXZpZ2F0ZScsIEBtb2RlbFxuXG4gICAgb25SZW5kZXI6IC0+XG4gICAgICBAJGVsLmFkZENsYXNzICdhY3RpdmUnIGlmIEBtb2RlbC5zZWxlY3RlZFxuXG4gIExpc3QuSGVhZGVycyA9IE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldy5leHRlbmRcblxuICAgIHRlbXBsYXRlOiBULmhlYWRlci50bXBsXG4gICAgY2hpbGRWaWV3OiBMaXN0LkhlYWRlclxuICAgIGNoaWxkVmlld0NvbnRhaW5lcjogJ3VsJ1xuXG4gICAgZXZlbnRzOlxuICAgICAgJ2NsaWNrICNsb2dvJzogJ2xvZ29DbGlja2VkJ1xuXG4gICAgbG9nb0NsaWNrZWQ6IChlKSAtPlxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBAdHJpZ2dlciAnbG9nbzpjbGlja2VkJ1xuXG4gICMgQ29udHJvbGxlclxuXG4gIExpc3QuQ29udHJvbGxlciA9XG4gICAgbGlzdEhlYWRlcjogLT5cbiAgICAgIGxpbmtzID0gR3Jvb3ZlaGFjay5yZXF1ZXN0ICdoZWFkZXI6ZW50aXRpZXMnXG4gICAgICBoZWFkZXJzID0gbmV3IExpc3QuSGVhZGVycyBjb2xsZWN0aW9uOiBsaW5rc1xuXG4gICAgICBoZWFkZXJzLm9uICdsb2dvOmNsaWNrZWQnLCAtPlxuICAgICAgICBHcm9vdmVoYWNrLnRyaWdnZXIgJ3dlbGNvbWU6c2hvdydcblxuICAgICAgaGVhZGVycy5vbiAnY2hpbGR2aWV3Om5hdmlnYXRlJywgKGNoaWxkVmlldywgbW9kZWwpIC0+XG4gICAgICAgIHRyaWdnZXIgPSBtb2RlbC5nZXQgJ25hdmlnYXRpb25UcmlnZ2VyJ1xuICAgICAgICBHcm9vdmVoYWNrLnRyaWdnZXIodHJpZ2dlcilcblxuICAgICAgR3Jvb3ZlaGFjay5oZWFkZXJSZWdpb24uc2hvdyBoZWFkZXJzXG5cbiAgICBzZXRBY3RpdmVIZWFkZXI6IChoZWFkZXJVcmwpIC0+XG4gICAgICBsaW5rcyA9IEdyb292ZWhhY2sucmVxdWVzdCAnaGVhZGVyOmVudGl0aWVzJ1xuICAgICAgaGVhZGVyVG9TZWxlY3QgPSBsaW5rcy5maW5kIChoZWFkZXIpIC0+XG4gICAgICAgIGhlYWRlci5nZXQgJ3VybCcgaXMgaGVhZGVyVXJsXG4gICAgICBcbiAgICAgIGhlYWRlclRvU2VsZWN0LnNlbGVjdCgpXG4gICAgICBsaW5rcy50cmlnZ2VyICdyZXNldCciXX0=