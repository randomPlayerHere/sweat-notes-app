# %% [markdown]
# # Calorie Predictor

# %%
import os
os.chdir("../../")
print(os.getcwd())

# %%
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# %%
df = pd.read_csv('data/raw_data.csv')

# %% [markdown]
# ## Preprocessing

# %%
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder, FunctionTransformer

# %%
from backend.app.utils.preprocessing_calorie import featureEngineering

# %%
#renaming the attributes
df = df.rename(columns={
    "Age": "age",
    "Gender": "gender",
    "Weight (kg)": "weight",
    "Height (m)": "height",
    "Workout_Type": "workout_type",
    "Fat_Percentage": "fat_percentage",
    "Experience_Level": "experience_level",
    "BMI": "bmi",
    "Workout_Intensity": "intensity_level",
    "Session_Duration (hours)": "session_duration",
    "Workout_Frequency (days/week)" : "workout_frequency"
})

# %%
df.dtypes

# %%
df = featureEngineering(df)

# %%
feature_eng_pipe = FunctionTransformer(featureEngineering, validate=False)

# %%
encoding_ct = ColumnTransformer(
    transformers=[
        ('onehot', OneHotEncoder(sparse_output=False), ['gender', 'workout_type' ]),
        ('ordinal', OrdinalEncoder(), ['fat_category'])
    ], remainder='passthrough'
)


# %% [markdown]
# ## Modelling

# %%
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
from sklearn.model_selection import GridSearchCV

# %%
X= df.drop(columns=['Calories_Burned', 'Max_BPM', 'Avg_BPM', 'Resting_BPM', 'Water_Intake (liters)'])
y = df['Calories_Burned']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# %%
X.dtypes

# %%
pipeline = Pipeline(steps=[
    ('feature_engineering', feature_eng_pipe),
    ('preprocessor', encoding_ct),
    ('model', RandomForestRegressor())
])

# %%
param_grid = {
    'model__n_estimators': [100, 300, 500],
    'model__max_depth': [None, 10, 20],
    'model__min_samples_split': [2, 5, 10],
    'model__min_samples_leaf': [1, 2, 4],
    'model__max_features': ['sqrt', 'log2']
}

grid = GridSearchCV(pipeline, param_grid, cv=5, scoring='r2', n_jobs=-1)
grid.fit(X_train, y_train)

print("Best params:", grid.best_params_)
print("Best CV R2:", grid.best_score_)


# %% [markdown]
# ## Evaluation

# %%
y_pred = grid.predict(X_test)
print("R2 Score:", r2_score(y_test, y_pred))
print("MSE:", mean_squared_error(y_test, y_pred))
print("MAE:", mean_absolute_error(y_test, y_pred))

# %% [markdown]
# ## Deployment

# %%
import joblib
best_model = grid.best_estimator_
joblib.dump(best_model, 'backend/app/ml_models/calorie_predictor.pkl')

# %%



