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
    className: 'container',
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
      if (headerToSelect != null) {
        headerToSelect.select();
      }
      return links.trigger('reset');
    }
  };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHMvaGVhZGVyL2hlYWRlcl9hcHAuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFVBQVUsQ0FBQyxNQUFYLENBQWtCLFdBQWxCLEVBQStCLFNBQUMsTUFBRCxFQUFTLFVBQVQsR0FBQTtBQUU3QixNQUFBLEdBQUE7QUFBQSxFQUFBLEdBQUEsR0FDRTtBQUFBLElBQUEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQXZCLENBQUEsRUFEVTtJQUFBLENBQVo7R0FERixDQUFBO0FBQUEsRUFJQSxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQXBCLENBQStCLG1CQUEvQixFQUFvRCxTQUFDLElBQUQsR0FBQTtXQUNsRCxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBckMsQ0FBcUQsSUFBckQsRUFEa0Q7RUFBQSxDQUFwRCxDQUpBLENBQUE7QUFBQSxFQU9BLE1BQU0sQ0FBQyxFQUFQLENBQVUsT0FBVixFQUFtQixTQUFBLEdBQUE7V0FDakIsR0FBRyxDQUFDLFVBQUosQ0FBQSxFQURpQjtFQUFBLENBQW5CLENBUEEsQ0FBQTtTQVVBLEtBWjZCO0FBQUEsQ0FBL0IsQ0FBQSxDQUFBOztBQUFBLFVBZ0JVLENBQUMsTUFBWCxDQUFrQixnQkFBbEIsRUFBb0MsU0FBQyxJQUFELEVBQU8sVUFBUCxFQUFtQixRQUFuQixFQUE2QixVQUE3QixHQUFBO0FBTWxDLEVBQUEsSUFBSSxDQUFDLE1BQUwsR0FBYyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQXBCLENBRVo7QUFBQSxJQUFBLFFBQUEsRUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUF4QjtBQUFBLElBQ0EsT0FBQSxFQUFTLElBRFQ7QUFBQSxJQUdBLE1BQUEsRUFDRTtBQUFBLE1BQUEsU0FBQSxFQUFXLFVBQVg7S0FKRjtBQUFBLElBTUEsUUFBQSxFQUFVLFNBQUMsQ0FBRCxHQUFBO0FBQ1IsTUFBQSxDQUFDLENBQUMsY0FBRixDQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxPQUFELENBQVMsVUFBVCxFQUFxQixJQUFDLENBQUEsS0FBdEIsRUFGUTtJQUFBLENBTlY7QUFBQSxJQVVBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQTBCLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBakM7ZUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsQ0FBYyxRQUFkLEVBQUE7T0FEUTtJQUFBLENBVlY7R0FGWSxDQUFkLENBQUE7QUFBQSxFQWlCQSxJQUFJLENBQUMsT0FBTCxHQUFlLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBekIsQ0FFYjtBQUFBLElBQUEsUUFBQSxFQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBbkI7QUFBQSxJQUNBLFNBQUEsRUFBVyxJQUFJLENBQUMsTUFEaEI7QUFBQSxJQUVBLGtCQUFBLEVBQW9CLElBRnBCO0FBQUEsSUFHQSxTQUFBLEVBQVcsV0FIWDtBQUFBLElBS0EsTUFBQSxFQUNFO0FBQUEsTUFBQSxhQUFBLEVBQWUsYUFBZjtLQU5GO0FBQUEsSUFRQSxXQUFBLEVBQWEsU0FBQyxDQUFELEdBQUE7QUFDWCxNQUFBLENBQUMsQ0FBQyxjQUFGLENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxjQUFULEVBRlc7SUFBQSxDQVJiO0dBRmEsQ0FqQmYsQ0FBQTtTQWlDQSxJQUFJLENBQUMsVUFBTCxHQUVFO0FBQUEsSUFBQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsVUFBQSxjQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsaUJBQW5CLENBQVIsQ0FBQTtBQUFBLE1BQ0EsT0FBQSxHQUFjLElBQUEsSUFBSSxDQUFDLE9BQUwsQ0FBYTtBQUFBLFFBQUEsVUFBQSxFQUFZLEtBQVo7T0FBYixDQURkLENBQUE7QUFBQSxNQUdBLE9BQU8sQ0FBQyxFQUFSLENBQVcsY0FBWCxFQUEyQixTQUFBLEdBQUE7ZUFDekIsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsY0FBbkIsRUFEeUI7TUFBQSxDQUEzQixDQUhBLENBQUE7QUFBQSxNQU1BLE9BQU8sQ0FBQyxFQUFSLENBQVcsb0JBQVgsRUFBaUMsU0FBQyxTQUFELEVBQVksS0FBWixHQUFBO0FBQy9CLFlBQUEsT0FBQTtBQUFBLFFBQUEsT0FBQSxHQUFVLEtBQUssQ0FBQyxHQUFOLENBQVUsbUJBQVYsQ0FBVixDQUFBO2VBQ0EsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsT0FBbkIsRUFGK0I7TUFBQSxDQUFqQyxDQU5BLENBQUE7YUFVQSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQXhCLENBQTZCLE9BQTdCLEVBWFU7SUFBQSxDQUFaO0FBQUEsSUFhQSxlQUFBLEVBQWlCLFNBQUMsU0FBRCxHQUFBO0FBQ2YsVUFBQSxxQkFBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLFVBQVUsQ0FBQyxPQUFYLENBQW1CLGlCQUFuQixDQUFSLENBQUE7QUFBQSxNQUNBLGNBQUEsR0FBaUIsS0FBSyxDQUFDLElBQU4sQ0FBVyxTQUFDLE1BQUQsR0FBQTtlQUMxQixNQUFNLENBQUMsR0FBUCxDQUFXLEtBQUEsS0FBUyxTQUFwQixFQUQwQjtNQUFBLENBQVgsQ0FEakIsQ0FBQTtBQUlBLE1BQUEsSUFBMkIsc0JBQTNCO0FBQUEsUUFBQSxjQUFjLENBQUMsTUFBZixDQUFBLENBQUEsQ0FBQTtPQUpBO2FBS0EsS0FBSyxDQUFDLE9BQU4sQ0FBYyxPQUFkLEVBTmU7SUFBQSxDQWJqQjtJQXpDZ0M7QUFBQSxDQUFwQyxDQWhCQSxDQUFBIiwiZmlsZSI6ImFwcHMvaGVhZGVyL2hlYWRlcl9hcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIjIEFwcFxuXG5Hcm9vdmVoYWNrLm1vZHVsZSAnSGVhZGVyQXBwJywgKEhlYWRlciwgR3Jvb3ZlaGFjaykgLT5cblxuICBBUEkgPVxuICAgIGxpc3RIZWFkZXI6IC0+XG4gICAgICBIZWFkZXIuTGlzdC5Db250cm9sbGVyLmxpc3RIZWFkZXIoKVxuXG4gIEdyb292ZWhhY2suY29tbWFuZHMuc2V0SGFuZGxlciAnc2V0OmFjdGl2ZTpoZWFkZXInLCAobmFtZSkgLT5cbiAgICBHcm9vdmVoYWNrLkhlYWRlckFwcC5MaXN0LkNvbnRyb2xsZXIuc2V0QWN0aXZlSGVhZGVyIG5hbWVcblxuICBIZWFkZXIub24gJ3N0YXJ0JywgLT5cbiAgICBBUEkubGlzdEhlYWRlcigpXG5cbiAgQFxuXG4jIExpc3RcblxuR3Jvb3ZlaGFjay5tb2R1bGUgJ0hlYWRlckFwcC5MaXN0JywgKExpc3QsIEdyb292ZWhhY2ssIEJhY2tib25lLCBNYXJpb25ldHRlKSAtPlxuXG4gICMgVmlld3NcbiAgXG4gICMgSGVhZGVyXG5cbiAgTGlzdC5IZWFkZXIgPSBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZFxuXG4gICAgdGVtcGxhdGU6IFQuaGVhZGVyLml0ZW0udG1wbFxuICAgIHRhZ05hbWU6ICdsaSdcblxuICAgIGV2ZW50czpcbiAgICAgICdjbGljayBhJzogJ25hdmlnYXRlJ1xuXG4gICAgbmF2aWdhdGU6IChlKSAtPlxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBAdHJpZ2dlciAnbmF2aWdhdGUnLCBAbW9kZWxcblxuICAgIG9uUmVuZGVyOiAtPlxuICAgICAgQCRlbC5hZGRDbGFzcyAnYWN0aXZlJyBpZiBAbW9kZWwuc2VsZWN0ZWRcblxuICAjIEhlYWRlcnNcblxuICBMaXN0LkhlYWRlcnMgPSBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcuZXh0ZW5kXG5cbiAgICB0ZW1wbGF0ZTogVC5oZWFkZXIudG1wbFxuICAgIGNoaWxkVmlldzogTGlzdC5IZWFkZXJcbiAgICBjaGlsZFZpZXdDb250YWluZXI6ICd1bCdcbiAgICBjbGFzc05hbWU6ICdjb250YWluZXInXG5cbiAgICBldmVudHM6XG4gICAgICAnY2xpY2sgI2xvZ28nOiAnbG9nb0NsaWNrZWQnXG5cbiAgICBsb2dvQ2xpY2tlZDogKGUpIC0+XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIEB0cmlnZ2VyICdsb2dvOmNsaWNrZWQnXG5cbiAgIyBDb250cm9sbGVyXG5cbiAgTGlzdC5Db250cm9sbGVyID1cblxuICAgIGxpc3RIZWFkZXI6IC0+XG4gICAgICBsaW5rcyA9IEdyb292ZWhhY2sucmVxdWVzdCAnaGVhZGVyOmVudGl0aWVzJ1xuICAgICAgaGVhZGVycyA9IG5ldyBMaXN0LkhlYWRlcnMgY29sbGVjdGlvbjogbGlua3NcblxuICAgICAgaGVhZGVycy5vbiAnbG9nbzpjbGlja2VkJywgLT5cbiAgICAgICAgR3Jvb3ZlaGFjay50cmlnZ2VyICd3ZWxjb21lOnNob3cnXG5cbiAgICAgIGhlYWRlcnMub24gJ2NoaWxkdmlldzpuYXZpZ2F0ZScsIChjaGlsZFZpZXcsIG1vZGVsKSAtPlxuICAgICAgICB0cmlnZ2VyID0gbW9kZWwuZ2V0ICduYXZpZ2F0aW9uVHJpZ2dlcidcbiAgICAgICAgR3Jvb3ZlaGFjay50cmlnZ2VyKHRyaWdnZXIpXG5cbiAgICAgIEdyb292ZWhhY2suaGVhZGVyUmVnaW9uLnNob3cgaGVhZGVyc1xuXG4gICAgc2V0QWN0aXZlSGVhZGVyOiAoaGVhZGVyVXJsKSAtPlxuICAgICAgbGlua3MgPSBHcm9vdmVoYWNrLnJlcXVlc3QgJ2hlYWRlcjplbnRpdGllcydcbiAgICAgIGhlYWRlclRvU2VsZWN0ID0gbGlua3MuZmluZCAoaGVhZGVyKSAtPlxuICAgICAgICBoZWFkZXIuZ2V0ICd1cmwnIGlzIGhlYWRlclVybFxuICAgICAgXG4gICAgICBoZWFkZXJUb1NlbGVjdC5zZWxlY3QoKSBpZiBoZWFkZXJUb1NlbGVjdD9cbiAgICAgIGxpbmtzLnRyaWdnZXIgJ3Jlc2V0JyJdfQ==