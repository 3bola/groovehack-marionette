# App

Groovehack.module 'SetsApp', (SetsApp, Groovehack) ->

  SetsApp.Router = Marionette.AppRouter.extend
    appRoutes:
      "sets":       "listSets"
      "sets/:id":   "showSet"
      "artists":    "listArtists"
      "artist/:id": "showArtist"
      "venues":     "listVenues"
      "venue/:id":  "showVenue"

  API =
    listSets: ->
      SetsApp.List.Controller.listSets()
      Groovehack.execute "set:active:header", "sets"
    showSet: (id) ->
      SetsApp.Show.Controller.showSet(id)
      Groovehack.execute "set:active:header", "sets"
    listArtists: ->
      SetsApp.List.Controller.listArtists()
      Groovehack.execute "set:active:header", "artists"
    showArtist: (id) ->
      SetsApp.Show.Controller.showArtist(id)
      Groovehack.execute "set:active:header", "artists"
    listVenues: ->
      SetsApp.List.Controller.listVenues()
      Groovehack.execute "set:active:header", "venues"
    showVenue: (id) ->
      SetsApp.Show.Controller.showVenue(id)
      Groovehack.execute "set:active:header", "venues"

  Groovehack.on "sets:list", ->
    Groovehack.navigate "sets"
    API.listSets()

  Groovehack.on "artists:list", ->
    Groovehack.navigate "artists"
    API.listArtists()

  Groovehack.on "venues:list", ->
    Groovehack.navigate "venues"
    API.listVenues()

  Groovehack.on "set:show", (id) ->
    Groovehack.navigate "set/" + id
    API.showSet(id)

  Groovehack.addInitializer ->
    new SetsApp.Router
      controller: API

  @

# Controllers

Groovehack.module 'SetsApp.List', (List, Groovehack, Backbone, Marionette, $, _) ->

  List.Controller =

    listSets: ->

      fetchingSets = Groovehack.request 'set:entities'

      listLayout = new List.Layout()
      listPanel = new List.Panel()

      $.when(fetchingSets).done (sets) ->

        setsListView = new List.List
          collection: sets

        listLayout.on 'show', ->
          listLayout.panelRegion.show listPanel
          listLayout.listRegion.show setsListView

        Groovehack.mainRegion.show listLayout

    listArtists: ->

      fetchingArtists = Groovehack.request 'artist:entities'

      listLayout = new List.Layout()
      listPanel = new List.Panel()

      $.when(fetchingArtists).done (artists) ->

        setsListView = new List.List
          collection: artists

        listLayout.on 'show', ->
          listLayout.panelRegion.show listPanel
          listLayout.listRegion.show setsListView

        Groovehack.mainRegion.show listLayout

    listVenues: ->

      fetchingVenues = Groovehack.request 'venue:entities'

      listLayout = new List.Layout()
      listPanel = new List.Panel()

      $.when(fetchingVenues).done (venues) ->

        setsListView = new List.List
          collection: venues

        listLayout.on 'show', ->
          listLayout.panelRegion.show listPanel
          listLayout.listRegion.show setsListView

        Groovehack.mainRegion.show listLayout

# List view

Groovehack.module 'SetsApp.List', (List, Groovehack, Backbone, Marionette, $, _) ->

  # Listan layoutti
  List.Layout = Marionette.LayoutView.extend
    className: 'list-layout'
    template: T.sets.tmpl,
    regions:
      panelRegion: "#list-panel"
      listRegion: "#list-list"

  # Listan paneeli, jossa tulee olemaan listan filtteröinti ja järjestelytoiminnot
  List.Panel = Marionette.ItemView.extend
    className: "panel"
    template: T.sets.list.panel.tmpl

  # Thumbnaili
  List.Item = Marionette.ItemView.extend
    tagName: "li"
    template: T.sets.list.item.tmpl

  # Listanäkymä
  List.List = Marionette.CompositeView.extend
    className: "list"
    template: T.sets.list.tmpl
    childView: List.Item
    childViewContainer: "ul"

    initialize: ->
      @listenTo @collection, "reset", ->
        @attachHtml = (collectionView, childView, index) ->
          console.log 'item', childView
          collectionView.$el.append childView.el

    onRenderCollection: ->
      @attachHtml = (collectionView, childView, index) ->
        collectionView.$el.prepend childView.el