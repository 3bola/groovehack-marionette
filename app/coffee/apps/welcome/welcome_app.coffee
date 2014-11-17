# App

Groovehack.module 'WelcomeApp', (WelcomeApp, Groovehack) ->

  API =
    showWelcome: ->
      WelcomeApp.Show.Controller.showWelcome()
      Groovehack.execute 'set:active:header', 'welcome'

  WelcomeApp.Router = Marionette.AppRouter.extend
    appRoutes:
      'welcome': 'showWelcome'

  Groovehack.on 'welcome:show', ->
    Groovehack.navigate ''
    API.showWelcome()

  Groovehack.addInitializer ->
    new WelcomeApp.Router
      controller: API

  @

Groovehack.module 'WelcomeApp.Show', (Show, Groovehack) ->

  # View
  
  Show.Welcome = Marionette.ItemView.extend
    template: T.welcome.tmpl
    className: 'container'

  # Controller

  Show.Controller =
    showWelcome: ->
      view = new Show.Welcome
      Groovehack.mainRegion.show view