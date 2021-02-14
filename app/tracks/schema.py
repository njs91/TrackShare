import graphene
from graphene_django import DjangoObjectType

from .models import Track


class TrackType(DjangoObjectType):  # type that class model is passed to
    class Meta:  # so TrackType can inherit Track structure
        model = Track


class Query(graphene.ObjectType):
    tracks = graphene.List(TrackType)

    def resolve_tracks(self, info):
        return Track.objects.all()