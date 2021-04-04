import graphene
from graphene_django import DjangoObjectType
from .models import Track, Like
from users.schema import UserType
from graphql import GraphQLError
from django.db.models import Q

class TrackType(DjangoObjectType):  # type that class model is passed to
    class Meta:  # so TrackType can inherit Track structure
        model = Track

class LikeType(DjangoObjectType):
    class Meta:
        model = Like

class Query(graphene.ObjectType):
    tracks = graphene.List(TrackType, search=graphene.String())
    likes = graphene.List(LikeType)

    def resolve_tracks(self, info, search=None): #=None is the fallback value; makes optional to prevent error
        if search: #if search text is provided
            filter = {
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(artist__icontains=search) |
                Q(url__icontains=search) |
                Q(posted_by__username__icontains=search)
            }
            return Track.objects.filter(filter)

        return Track.objects.all()

    def resolve_likes(self, info):
        return Like.objects.all()

class CreateTrack(graphene.Mutation):
    track = graphene.Field(TrackType)

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        artist = graphene.String()
        url = graphene.String()

    def mutate(self, info, title, description, artist, url):
        user = info.context.user
        if user.is_anonymous: # if user not logged in / authenticated
            raise GraphQLError('Log in to add a track')
        track = Track(title=title, description=description, artist=artist, url=url, posted_by=user)
        track.save()
        return CreateTrack(track=track)

class UpdateTrack(graphene.Mutation):
    track = graphene.Field(TrackType) # all fields supplied by TrackType

    class Arguments:
        track_id = graphene.Int(required=True) # needed to know which track to update
        title = graphene.String()
        description = graphene.String()
        artist = graphene.String()
        url = graphene.String()

    def mutate(self, info, track_id, title, url, description, artist):
        user = info.context.user #grab current user from context
        track = Track.objects.get(id=track_id) #find individual track, according to its track_id

        if track.posted_by != user: #ensure user updating track created it
            raise GraphQLError("This user didn't create the track and is therefore unauthorised to update it")

        #otherwise make the changes:
        track.title = title
        track.description = description
        track.artist = artist
        track.url = url

        track.save()

        return UpdateTrack(track=track)


class DeleteTrack(graphene.Mutation): #deleting a track needs to return id of deleted track
    track_id = graphene.Int()

    class Arguments:
        track_id = graphene.Int(required=True)

    def mutate(self, info, track_id): #the resolver
        user = info.context.user
        track = Track.objects.get(id=track_id)  # get the track id

        if track.posted_by != user:#check if the user deleting it created it
            raise GraphQLError("This user didn't create the track and is therefore unauthorised to delete it")

        track.delete()

        return DeleteTrack(track_id=track_id)

class CreateLike(graphene.Mutation):
    user = graphene.Field(UserType)
    track = graphene.Field(TrackType)

    #id of track user is liking
    class Arguments:
        track_id = graphene.Int(required=True)

    def mutate(self, info, track_id):
        user = info.context.user
        if user.is_anonymous: # check if we have a user
            raise GraphQLError('Log in to like tracks')

        #get the track
        track = Track.objects.get(id=track_id)
        if not track: #if cannot get track (according to id)
            raise GraphQLError('Cannot find track with that id')

        Like.objects.create(
            user=user,
            track=track
        )

        return CreateLike(user=user, track=track)

class Mutation(graphene.ObjectType):
    create_track = CreateTrack.Field()
    update_track = UpdateTrack.Field()
    delete_track = DeleteTrack.Field()
    create_like = CreateLike.Field()