from rest_framework.routers import DefaultRouter

from common import views


router = DefaultRouter()
router.register('users', views.UserModelViewSet)
router.register('groups', views.GroupModelViewSet)

urlpatterns = router.urls
