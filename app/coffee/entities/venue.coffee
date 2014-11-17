Groovehack.module "Entities", (Entities, Groovehack) ->

	Entities.Venue = Backbone.Model.extend

		urlRoot: "/api/venues"

		defaults:
			name: "Name"

	#Entities.configureStorage Entities.Venue

	Entities.VenueCollection = Backbone.Collection.extend
		url: "/api/venues"
		model: Entities.Venue
		comparator: "name"


	#Entities.configureStorage Entities.VenueCollection

	initializeVenues = ->
		venues = new Entities.VenueCollection [
			( id: 1, name: "Venue 1" )
			( id: 2, name: "Venue 2" )
		]
		venues.forEach (venue) ->
			venue.save()
		venues.models

	API =

		getVenueEntities: ->
			venues = new Entities.VenueCollection()
			defer = $.Deferred()
			venues.fetch
				success: (data) ->
					defer.resolve(data)
			promise = defer.promise()
			$.when(promise).done (venues) ->
				if venues.length is 0
					models = initializeVenues()
					venues.reset(models)
			promise

		getVenueEntity: (venueId) ->
			venue = new Entities.Venue id: venueId
			defer = $.Deferred()
			setTimeout ->
				venue.fetch
					success: (data) ->
						defer.resolve data
					error: (data) ->
						defer.resolve undefined
			, 2000
			defer.promise()

	Groovehack.reqres.setHandler "venue:entities", ->
		API.getVenueEntities()

	Groovehack.reqres.setHandler "venue:entity", ->
		API.getVenueEntity()

	@