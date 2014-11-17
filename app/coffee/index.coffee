Groovehack = new Backbone.Marionette.Application()

Groovehack.addRegions
  headerRegion: '#header-region',
  mainRegion:   '#main-region',
  footerRegion: '#footer-region',
  dialogRegion: '#dialog-region'

Groovehack.addInitializer () ->
  console.log 'Groovehack::initialize'
  @

Groovehack.navigate = (route, options = {}) ->
  Backbone.history.navigate(route, options)

Groovehack.getCurrentRoute = ->
  Backbone.history.fragment

Groovehack.on 'start', ->
  if Backbone.history
    Backbone.history.start()

    if @getCurrentRoute() is ""
      Groovehack.trigger 'welcome:show'

$ ->
  Groovehack.start()