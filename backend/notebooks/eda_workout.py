# %%
import numpy as np
import pandas as pd

# %%
df = pd.read_json("../data/exercises.json")
df.shape

# %%
df.loc[df['mechanic'].isnull()]

# %%
df.loc[df['mechanic'].isnull() & (df['category'] == 'stretching')]

# %%
df['category'].value_counts()

# %%
df = df[~df['category'].isin(['stretching', 'plyometrics'])]

# %%
df.columns

# %%
df.drop(columns=['instructions', 'images'], inplace=True)

# %%
df = df.loc[df['category']=='strength']

# %%
df.loc[df['level'] == 'expert']

# %%
df['primaryMuscles'].value_counts()

# %%
legs = ['quadriceps', 'hamstrings', 'glutes', 'calves', 'adductors', 'abductors']
legs_list = [[x] for x in legs]
df['force'] = np.where(df['primaryMuscles'].isin(legs_list), 'legs', df['force'])

# %%
df['force'].value_counts()

# %%
df.loc[df['force'].isnull()]

# %%
df['mechanic'].value_counts()

# %%
df.isnull().sum()

# %%
df = pd.read_csv('context_exercises.csv')

# %%
df.isnull().sum()

# %%
df = df[df['mechanic'].notna()]


# %%
null_equipment = ['body only','barbell','body only','barbell','body only','body only']

# %%
df.loc[df['equipment'].isnull(), 'equipment'] = null_equipment

# %%
df.to_csv("context_exercises.csv", index=False)

# %%



