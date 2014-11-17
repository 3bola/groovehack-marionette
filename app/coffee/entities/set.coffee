Groovehack.module "Entities", (Entities, Groovehack) ->

	Entities.Set = Backbone.Model.extend

		urlRoot: "/api/sets"

		defaults:
			name: "Set"

	#Entities.configureStorage Entities.Set

	Entities.SetCollection = Backbone.Collection.extend
		url: "/api/sets"
		model: Entities.Set
		comparator: "name"

	#Entities.configureStorage Entities.SetCollection

	initializeSets = ->
		sets = new Entities.SetCollection [
			( id: 1, name: "Set 1" )
			( id: 2, name: "Set 2" )
		]
		sets.forEach (set) ->
			set.save()
		sets.models

	API =

		getSetEntities: ->
			sets = new Entities.SetCollection()
			defer = $.Deferred()
			sets.fetch
				success: (data) ->
					defer.resolve(data)
			promise = defer.promise()
			$.when(promise).done (sets) ->
				if sets.length is 0
					models = initializeSets()
					sets.reset(models)
			promise

		getSetEntity: (setId) ->
			set = new Entities.Set id: setId
			defer = $.Deferred()
			set.fetch
				success: (data) ->
					defer.resolve data
				error: (data) ->
					defer.resolve undefined
			defer.promise()

	Groovehack.reqres.setHandler "set:entities", ->
		API.getSetEntities()

	Groovehack.reqres.setHandler "set:entity", ->
		API.getSetEntity()

	@