from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType # to create class
from graphql import GraphQLError


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model() # how we access user model
        # could use this to specify specific fields to use: only_fields = ('id', 'email', 'password', 'username')

#query for querying users based on id
class Query(graphene.ObjectType):
    user = graphene.Field(UserType, id=graphene.Int(required=True)) # need to pass an ID so can query it by that
    me = graphene.Field(UserType) # me gives info about the current user

    #the resolver
    def resolve_user(self, info, id):
        return get_user_model().objects.get(id=id)

    #me resolver
    def resolve_me(self, info):
        user = info.context.user # info is a context value to check if user is authenticated
        if user.is_anonymous: # if user is not authenticated
            raise GraphQLError('User is not logged in')

        return user # (if user is authenticated)

#mutation for creating new user
class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email
        )
        user.set_password(password)
        user.save()
        return CreateUser(user=user)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field() # error here?























