from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .apps import PredictionConfig

import pandas as pd
import numpy as np


class IRIS_Model_Predict(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classeis = [IsAuthenticated]

    def post(self, request, format=None):
        # JSON input data from user
        data = request.data
        values = list(data.values())
        # Create array
        X = np.asarray(values).reshape(1, -1)
        # Load model from app.py file
        loaded_mlmodel = PredictionConfig.mlmodel
        # Make prediction
        y_pred = loaded_mlmodel.predict(X)
        y_pred = pd.Series(y_pred)
        print(y_pred)
        # Map predicted index to target class
        target_map = {0: 'setosa', 1: 'versicolor', 2:'virginica'}
        y_pred = y_pred.map(target_map).to_numpy()
        response_dict = {"Predicted Iris Species": y_pred[0]}
        return Response(response_dict, status=200)

