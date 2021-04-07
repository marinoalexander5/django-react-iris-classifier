from django.apps import AppConfig
import pandas as pd
from joblib import load
import os
from django.conf import settings


class PredictionConfig(AppConfig):
    name = 'prediction'

    # Load classification model
    MLMODEL_FOLDER = os.path.join(settings.BASE_DIR, 'prediction_api/mlmodel/')
    MLMODEL_FILE = os.path.join(MLMODEL_FOLDER, 'IrisRandomForestClassifier.joblib')
    mlmodel = load(MLMODEL_FILE)
