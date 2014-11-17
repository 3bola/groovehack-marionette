Groovehack.module "Entities", (Entities, Groovehack) ->

	Entities.Artist = Backbone.Model.extend

		urlRoot: "/api/artists"

		defaults:
			name: "Name"

	#Entities.configureStorage Entities.Artist

	Entities.ArtistCollection = Backbone.Collection.extend
		url: "/api/artists"
		model: Entities.Artist
		comparator: "name"


	#Entities.configureStorage Entities.ArtistCollection

	initializeArtists = ->
		artists = new Entities.ArtistCollection [
			( id: 1, name: "Artist 1" )
			( id: 2, name: "Artist 2" )
		]
		artists.forEach (artist) ->
			artist.save()
		artists.models

	API =

		getArtistEntities: ->
			artists = new Entities.ArtistCollection()
			defer = $.Deferred()
			artists.fetch
				success: (data) ->
					defer.resolve(data)
			promise = defer.promise()
			$.when(promise).done (artists) ->
				if artists.length is 0
					models = initializeArtists()
					artists.reset(models)
			promise

		getArtistEntity: (artistId) ->
			artist = new Entities.Artist id: artistId
			defer = $.Deferred()
			setTimeout ->
				artist.fetch
					success: (data) ->
						defer.resolve data
					error: (data) ->
						defer.resolve undefined
			, 2000
			defer.promise()

	Groovehack.reqres.setHandler "artist:entities", ->
		API.getArtistEntities()

	Groovehack.reqres.setHandler "artist:entity", ->
		API.getArtistEntity()

	@