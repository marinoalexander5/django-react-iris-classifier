from django.urls import path
from .views import IRIS_Model_Predict


urlpatterns = [
    path('predict/', IRIS_Model_Predict.as_view(), name='api_predict'),
]