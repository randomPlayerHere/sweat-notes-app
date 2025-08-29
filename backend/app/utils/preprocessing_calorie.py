import numpy as np
import pandas as pd

def featureEngineering(df):
    df = df.copy()
    df["BMR"] = np.where(
        df["gender"] == "Male",
        10 * df["weight"] + 6.25 * (df["height"] * 100) - 5 * df["age"] + 5,
        10 * df["weight"] + 6.25 * (df["height"] * 100) - 5 * df["age"] - 161
    )
    df["weight_duration"] = df["weight"] * df["session_duration"]
    df["bmi_duration"] = df["bmi"] * df["session_duration"]
    df["workout_intensity"] = df["experience_level"] * df["workout_frequency"]
    df["fat_category"] = pd.cut(
        df["fat_percentage"],
        bins=[0, 15, 25, 35, 100],
        labels=["Low", "Moderate", "High", "Very High"]
    )
    return df
