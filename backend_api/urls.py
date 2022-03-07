from backend_api.views import ChatViewSet
from rest_framework.routers import DefaultRouter
from backend_api import views

router = DefaultRouter()
router.register(r'chat', views.ChatViewSet, basename='chat')
urlpatterns = router.urls