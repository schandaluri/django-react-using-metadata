from django.contrib.auth.models import User, Group
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import status


from common import serializers


def handler_404(request):
    if request.is_ajax():
        return Response(
            {
                "status": 404,
                "message": "Not found"
            }, status=status.HTTP_404_NOT_FOUND
        )
    else:
        return render(request, 'index.html')


class BaseModelViewSet(ModelViewSet):

    def get_metadata_serializer(self, action, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = self.get_serializer_class(action)
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    @action(methods=['GET'], detail=False)
    def api_schema(self, request):
        meta = self.metadata_class()
        data = meta.determine_metadata(request, self)
        return Response(data)


class UserModelViewSet(BaseModelViewSet):
    queryset = User.objects.all()
    filterset_fields = ('username', 'first_name', 'email')
    ordering_fields = ['username', 'date_joined']
    ordering = ['-date_joined']


    def get_serializer_class(self, action=None):
        action = action or self.action

        if action == 'create':
            return serializers.UserCreateSerializer
        elif action == 'list':
            return serializers.UserListSerializers
        else:
            return serializers.UserUpdateSerializer


class GroupModelViewSet(BaseModelViewSet):
    queryset = Group.objects.all()
    filterset_fields = ('name', )

    def get_serializer_class(self, action=None):
        action = action or self.action

        if action == 'create':
            return serializers.GroupCreateSerializer
        elif action == 'list':
            return serializers.GroupListSerializer
        else:
            return serializers.GroupUpdateSerializer

