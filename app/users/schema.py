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

#mutation for updating user
class UpdateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        user_id = graphene.Int(required=True) # needed to know which user to update
        username = graphene.String() # add required=False?
        password = graphene.String() # add required=False?
        email = graphene.String() # add required=False?

    def mutate(self, info, user_id, username, password, email):
        user = info.context.user  # grab current user from context
        user_to_update = get_user_model().objects.get(id=user_id)

        #@todo: make account owner only allowed to edit account
        # if user_to_update.id != user.id: #ensure user updating account owns it
            #raise GraphQLError("This user does not own the account and is therefore unauthorised to update it")

        #otherwise make the changes
        user_to_update.username = username
        user_to_update.set_password(password) #wrong = user_to_update.password = password
        user_to_update.email = email

        #save changes
        user_to_update.save()

        return UpdateUser(user=user_to_update)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()























