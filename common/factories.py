import factory
from factory.django import DjangoModelFactory

from django.contrib.auth.models import User


class UserModelFactory(DjangoModelFactory):
    username = factory.Sequence(lambda n: "User_%d" % n)

    class Meta:
        model = User
        django_get_or_create = ("username",)
