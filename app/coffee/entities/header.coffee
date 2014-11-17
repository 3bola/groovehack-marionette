Groovehack.module 'Entities', (Entities, Groovehack, Backbone, Marionette, $, _) ->
  
  Entities.Header = Backbone.Model.extend
    initialize: ->
      selectable = new Backbone.Picky.Selectable(@)
      _.extend @, selectable
      @

  Entities.HeaderCollection = Backbone.Collection.extend 
    model: Entities.Header
    initialize: ->
      singleSelect = new Backbone.Picky.SingleSelect(@)
      _.extend @, singleSelect
      @

  initializeHeaders = ->
    Entities.headers = new Entities.HeaderCollection [
      ( name: 'Sets', url: 'sets', navigationTrigger: 'sets:list' )
      ( name: 'Artists', url: 'artists', navigationTrigger: 'artists:list' )
      ( name: 'Venues', url: 'venues', navigationTrigger: 'venues:list' )
    ]

  API =
    getHeaders: ->
      initializeHeaders() unless Entities.headers?
      Entities.headers

  Groovehack.reqres.setHandler 'header:entities', ->
    API.getHeaders()