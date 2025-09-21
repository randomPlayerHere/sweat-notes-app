# %%
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# %%
# Load the dataset
df = pd.read_csv('../data/raw_data.csv')

# Display basic information about the dataset
print("Dataset Shape:", df.shape)
print("\nFirst 5 rows:")
print(df.head())

print("\nDataset Info:")
print(df.info())

print("\nMissing Values:")
print(df.isnull().sum())

# %%
df.dtypes

# %%
# Statistical summary of numerical columns
print("Statistical Summary:")
print(df.describe())

print("\n\nCategorical columns value counts:")
categorical_cols = df.select_dtypes(include=['object']).columns
for col in categorical_cols:
    print(f"\n{col}:")
    print(df[col].value_counts())

# %%
# Correlation analysis
plt.figure(figsize=(12, 10))
correlation_matrix = df.select_dtypes(include=['float64', 'int64']).corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0, square=True, linewidths=0.5)
plt.title('Correlation Matrix of Numerical Features')
plt.tight_layout()
plt.show()

# Show correlations with target variable (Calories_Burned)
print("\nCorrelation with Calories_Burned (sorted by absolute value):")
target_corr = correlation_matrix['Calories_Burned'].drop('Calories_Burned')
target_corr_sorted = target_corr.abs().sort_values(ascending=False)
for feature in target_corr_sorted.index:
    print(f"{feature}: {target_corr[feature]:.4f}")

# %%
# Distribution of numerical features
numerical_cols = df.select_dtypes(include=['float64', 'int64']).columns
n_cols = 4
n_rows = (len(numerical_cols) + n_cols - 1) // n_cols

plt.figure(figsize=(20, 5 * n_rows))
for i, col in enumerate(numerical_cols):
    plt.subplot(n_rows, n_cols, i + 1)
    plt.hist(df[col], bins=30, alpha=0.7, color='skyblue', edgecolor='black')
    plt.title(f'Distribution of {col}')
    plt.xlabel(col)
    plt.ylabel('Frequency')
    plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# %%
# Categorical features analysis
# Bar plots for categorical columns
fig, axes = plt.subplots(1, len(categorical_cols), figsize=(15, 5))
if len(categorical_cols) == 1:
    axes = [axes]

for i, col in enumerate(categorical_cols):
    df[col].value_counts().plot(kind='bar', ax=axes[i])
    axes[i].set_title(f'Distribution of {col}')
    axes[i].set_ylabel('Frequency')
    axes[i].tick_params(axis='x', rotation=45)

plt.tight_layout()
plt.show()

# Box plots - Calories burned by categorical variables
fig, axes = plt.subplots(1, len(categorical_cols), figsize=(15, 5))
if len(categorical_cols) == 1:
    axes = [axes]

for i, col in enumerate(categorical_cols):
    sns.boxplot(data=df, x=col, y='Calories_Burned', ax=axes[i])
    axes[i].set_title(f'Calories Burned by {col}')
    axes[i].tick_params(axis='x', rotation=45)

plt.tight_layout()
plt.show()

# %%
# Key EDA Insights Summary
print("KEY EDA INSIGHTS:")
print("=" * 50)
print(f"Dataset has {df.shape[0]} rows and {df.shape[1]} columns")
print(f"No missing values detected")
print()

print("STRONGEST PREDICTORS OF CALORIES BURNED:")
print(f"1. Session Duration (hours): {target_corr['Session_Duration (hours)']:.3f}")
print(f"2. Experience Level: {target_corr['Experience_Level']:.3f}")
print(f"3. Fat Percentage: {target_corr['Fat_Percentage']:.3f} (negative correlation)")
print(f"4. Workout Frequency: {target_corr['Workout_Frequency (days/week)']:.3f}")
print()

print("DATA DISTRIBUTION INSIGHTS:")
print(f"- Gender distribution is fairly balanced: {df['Gender'].value_counts()['Male']} males, {df['Gender'].value_counts()['Female']} females")
print(f"- Workout types are evenly distributed across: {', '.join(df['Workout_Type'].value_counts().index.tolist())}")
print(f"- Experience levels range from 1-3, with level 3 having most participants")
print(f"- Calories burned range: {df['Calories_Burned'].min():.0f} - {df['Calories_Burned'].max():.0f}")
print(f"- Average calories burned: {df['Calories_Burned'].mean():.0f}")
print()

print("NOTABLE PATTERNS:")
print("- Strong positive correlation between session duration and calories burned")
print("- More experienced individuals tend to burn more calories")
print("- Higher fat percentage is associated with lower calorie burn")
print("- All workout types show similar calorie burn distributions")


