from django.contrib.auth.models import User, Group
from rest_framework.serializers import (ModelSerializer, HyperlinkedModelSerializer,
                                        MultipleChoiceField, StringRelatedField)


class BaseModelSerializer(ModelSerializer):
    pass


class BaseHyperlinkedModelSerializer(HyperlinkedModelSerializer):
    url_field_name = 'self'


class ModelMultipleChoiceField(MultipleChoiceField):

    def to_representation(self, value):
        return {
            self.choice_strings_to_values.get(str(item), item.id) for item in value.all()
        }


class UserBaseModelSerializer(BaseHyperlinkedModelSerializer):
    groups = ModelMultipleChoiceField(
        choices=[],
        required=False
    )

    def __init__(self, *args, **kwargs):
        super(UserBaseModelSerializer, self).__init__(*args, **kwargs)
        self.fields['groups'].choices = [(g.id, g.name) for g in Group.objects.all()]


class UserListSerializers(BaseHyperlinkedModelSerializer):
    groups = StringRelatedField(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff',
                  'is_superuser', 'last_login', 'groups', 'self')


class UserCreateSerializer(UserBaseModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff',
                  'is_superuser', 'groups')
        read_only_fields = ('id', )


class UserUpdateSerializer(UserBaseModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff',
                  'is_superuser', 'last_login', 'groups')
        read_only_fields = ('id', 'username', 'email', 'last_login')


class GroupListSerializer(BaseHyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'self')


class GroupCreateSerializer(BaseModelSerializer):
    class Meta:
        model = Group
        fields = ('name', )


class GroupUpdateSerializer(BaseModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')
        read_only_fields = ('id',)
