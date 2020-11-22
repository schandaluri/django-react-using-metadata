from unittest import TestCase

from rest_framework.test import APIClient


class UserViewSetTestCase(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()

    def test_list(self):
        response = self.client.get("/api/users")
        assert response.status_code == 200
