# App

Groovehack.module 'HeaderApp', (Header, Groovehack) ->

  API =
    listHeader: ->
      Header.List.Controller.listHeader()

  Groovehack.commands.setHandler 'set:active:header', (name) ->
    Groovehack.HeaderApp.List.Controller.setActiveHeader name

  Header.on 'start', ->
    API.listHeader()

  @

# List

Groovehack.module 'HeaderApp.List', (List, Groovehack, Backbone, Marionette) ->

  # Views
  
  # Header

  List.Header = Marionette.ItemView.extend

    template: T.header.item.tmpl
    tagName: 'li'

    events:
      'click a': 'navigate'

    navigate: (e) ->
      e.preventDefault()
      @trigger 'navigate', @model

    onRender: ->
      @$el.addClass 'active' if @model.selected

  # Headers

  List.Headers = Marionette.CompositeView.extend

    template: T.header.tmpl
    childView: List.Header
    childViewContainer: 'ul'
    className: 'container'

    events:
      'click #logo': 'logoClicked'

    logoClicked: (e) ->
      e.preventDefault()
      @trigger 'logo:clicked'

  # Controller

  List.Controller =

    listHeader: ->
      links = Groovehack.request 'header:entities'
      headers = new List.Headers collection: links

      headers.on 'logo:clicked', ->
        Groovehack.trigger 'welcome:show'

      headers.on 'childview:navigate', (childView, model) ->
        trigger = model.get 'navigationTrigger'
        Groovehack.trigger(trigger)

      Groovehack.headerRegion.show headers

    setActiveHeader: (headerUrl) ->
      links = Groovehack.request 'header:entities'
      headerToSelect = links.find (header) ->
        header.get 'url' is headerUrl
      
      headerToSelect.select() if headerToSelect?
      links.trigger 'reset'