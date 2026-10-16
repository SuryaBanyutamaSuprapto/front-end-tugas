"""
Studi Kasus  : Prediksi Hasil Panen Padi (Paddy Yield) - Supervised Learning (Regresi)
Dataset      : Paddy Dataset, UCI Machine Learning Repository (DOI: 10.24432/C55W3J)
Target       : Paddy yield (in Kg)
Algoritma    : 1. Ridge Regression (Linear)
               2. Random Forest Regressor
               3. Gradient Boosting Regressor
Evaluasi     : Hold-out 80:20, 5-Fold Cross Validation, MAE, RMSE, R2

Cara pakai   : python paddy_regression.py
               (letakkan paddydataset.csv di folder yang sama)
Library      : pandas, numpy, scikit-learn, matplotlib, seaborn
"""

import time
import warnings
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split, KFold, cross_validate
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

warnings.filterwarnings("ignore")
RANDOM_STATE = 42
CSV_PATH = "paddydataset.csv"
TARGET = "Paddy yield(in Kg)"

# ----------------------------------------------------------------------------
# 1. LOAD DATA & EKSPLORASI SINGKAT
# ----------------------------------------------------------------------------
df = pd.read_csv(CSV_PATH)
df.columns = df.columns.str.strip()

print("=" * 70)
print("1. EKSPLORASI DATA")
print("=" * 70)
print("Ukuran data        :", df.shape)
print("Missing value      :", int(df.isna().sum().sum()))
print("Baris duplikat     :", int(df.duplicated().sum()))
cat_cols_all = df.select_dtypes(exclude="number").columns.tolist()
num_cols_all = df.select_dtypes(include="number").columns.drop(TARGET).tolist()
print("Kolom numerik      :", len(num_cols_all))
print("Kolom kategorikal  :", cat_cols_all)
print("\nStatistik target:\n", df[TARGET].describe().round(2).to_string())

corr = df[num_cols_all + [TARGET]].corr()[TARGET].drop(TARGET).sort_values(ascending=False)
print("\n10 fitur dengan korelasi tertinggi terhadap target:\n", corr.head(10).round(4).to_string())

# Temuan penting: fitur input agronomi (pupuk, benih, dll.) semuanya proporsional
# dengan luas lahan (Hectares) -> korelasi identik dengan target -> multikolinearitas.
SCALE_FEATURES = [c for c in num_cols_all if abs(corr[c] - corr["Hectares"]) < 1e-9]
print("\nFitur yang sepenuhnya proporsional dengan Hectares (redundan):")
print("  ", SCALE_FEATURES)

# 'Trash (in bundles)' adalah jerami hasil panen -> baru diketahui setelah panen,
# sehingga tidak boleh dipakai untuk memprediksi hasil panen (data leakage).
LEAKY = ["Trash(in bundles)"]

# Fitur cuaca & kategorikal (tidak proporsional dengan luas lahan)
WEATHER_NUM = [c for c in num_cols_all if c not in SCALE_FEATURES + LEAKY]
CATEGORICAL = cat_cols_all

# ----------------------------------------------------------------------------
# 2. SKENARIO EKSPERIMEN
# ----------------------------------------------------------------------------
# S1: Semua fitur numerik (tanpa kebocoran) -> baseline
# S2: Fitur non-redundan: Hectares + cuaca + kategorikal (one-hot)
# S3: Target = hasil panen per hektar (Kg/ha); fitur = cuaca + kategorikal.
#     Menghilangkan efek luas lahan agar model benar-benar belajar pengaruh
#     cuaca, varietas, jenis tanah, dan lain-lain.
df["Yield_per_Ha"] = df[TARGET] / df["Hectares"]

SCENARIOS = {
    "S1: Semua fitur numerik": dict(
        num=SCALE_FEATURES + WEATHER_NUM, cat=[], target=TARGET),
    "S2: Hectares + cuaca + kategorikal": dict(
        num=["Hectares"] + WEATHER_NUM, cat=CATEGORICAL, target=TARGET),
    "S3: Yield per hektar (cuaca + kategorikal)": dict(
        num=WEATHER_NUM, cat=CATEGORICAL, target="Yield_per_Ha"),
}


def build_models(num_cols, cat_cols):
    """Membuat pipeline preprocessing + model untuk setiap algoritma."""
    transformers = [("num", StandardScaler(), num_cols)]
    if cat_cols:
        transformers.append(("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols))
    prep = ColumnTransformer(transformers)

    regs = {
        "Ridge Regression": Ridge(alpha=1.0),
        "Random Forest": RandomForestRegressor(
            n_estimators=200, max_depth=None, min_samples_leaf=2,
            n_jobs=-1, random_state=RANDOM_STATE),
        "Gradient Boosting": GradientBoostingRegressor(
            n_estimators=200, learning_rate=0.1, max_depth=3,
            random_state=RANDOM_STATE),
    }
    return {name: Pipeline([("prep", prep), ("model", m)]) for name, m in regs.items()}


def rmse(y, p):
    return np.sqrt(mean_squared_error(y, p))


# ----------------------------------------------------------------------------
# 3. TRAINING & EVALUASI
# ----------------------------------------------------------------------------
print("\n" + "=" * 70)
print("2. EKSPERIMEN")
print("=" * 70)

kf = KFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)
rows, predictions = [], {}

for scen_name, cfg in SCENARIOS.items():
    feats = cfg["num"] + cfg["cat"]
    X, y = df[feats], df[cfg["target"]]
    X_tr, X_te, y_tr, y_te = train_test_split(
        X, y, test_size=0.2, random_state=RANDOM_STATE)

    print(f"\n>>> {scen_name}  | jumlah fitur: {len(feats)} "
          f"| train={len(X_tr)}, test={len(X_te)}")

    for name, pipe in build_models(cfg["num"], cfg["cat"]).items():
        # (a) 5-fold CV pada data latih
        cv = cross_validate(
            pipe, X_tr, y_tr, cv=kf,
            scoring=("r2", "neg_mean_absolute_error", "neg_root_mean_squared_error"))
        # (b) Hold-out test
        t0 = time.time()
        pipe.fit(X_tr, y_tr)
        train_time = time.time() - t0
        pred = pipe.predict(X_te)

        row = {
            "Skenario": scen_name, "Algoritma": name,
            "CV R2 (mean)": cv["test_r2"].mean(),
            "CV R2 (std)": cv["test_r2"].std(),
            "Test MAE": mean_absolute_error(y_te, pred),
            "Test RMSE": rmse(y_te, pred),
            "Test R2": r2_score(y_te, pred),
            "Train R2": r2_score(y_tr, pipe.predict(X_tr)),
            "Waktu latih (s)": train_time,
        }
        rows.append(row)
        predictions[(scen_name, name)] = (y_te.values, pred)
        print(f"   {name:<18} CV R2={row['CV R2 (mean)']:.4f}±{row['CV R2 (std)']:.4f} | "
              f"MAE={row['Test MAE']:.2f} | RMSE={row['Test RMSE']:.2f} | "
              f"R2={row['Test R2']:.4f}")

results = pd.DataFrame(rows)

# ----------------------------------------------------------------------------
# 4. PERBANDINGAN KINERJA
# ----------------------------------------------------------------------------
print("\n" + "=" * 70)
print("3. TABEL PERBANDINGAN KINERJA")
print("=" * 70)
pd.set_option("display.width", 200)
print(results.round(4).to_string(index=False))
results.round(4).to_csv("hasil_perbandingan.csv", index=False)

print("\nAlgoritma terbaik per skenario (berdasarkan Test RMSE terendah):")
best = results.loc[results.groupby("Skenario")["Test RMSE"].idxmin()]
print(best[["Skenario", "Algoritma", "Test RMSE", "Test R2"]].round(4).to_string(index=False))

# ----------------------------------------------------------------------------
# 5. VISUALISASI
# ----------------------------------------------------------------------------
sns.set_style("whitegrid")

# (a) Perbandingan metrik
fig, axes = plt.subplots(1, 3, figsize=(17, 4.8))
for ax, metric in zip(axes, ["Test R2", "Test MAE", "Test RMSE"]):
    sns.barplot(data=results, x="Skenario", y=metric, hue="Algoritma", ax=ax)
    ax.set_title(metric)
    ax.set_xlabel("")
    ax.set_xticklabels([s.split(":")[0] for s in results["Skenario"].unique()])
    if metric != "Test R2":
        ax.legend_.remove()
    else:
        ax.set_ylim(min(0, results["Test R2"].min() - 0.05), 1.05)
plt.tight_layout()
plt.savefig("perbandingan_metrik.png", dpi=150)
plt.close()

# (b) Aktual vs prediksi
fig, axes = plt.subplots(len(SCENARIOS), 3, figsize=(15, 4.2 * len(SCENARIOS)))
for i, scen in enumerate(SCENARIOS):
    for j, name in enumerate(["Ridge Regression", "Random Forest", "Gradient Boosting"]):
        y_true, y_pred = predictions[(scen, name)]
        ax = axes[i, j]
        ax.scatter(y_true, y_pred, s=8, alpha=0.5)
        lim = [min(y_true.min(), y_pred.min()), max(y_true.max(), y_pred.max())]
        ax.plot(lim, lim, "r--", lw=1)
        ax.set_title(f"{scen.split(':')[0]} - {name}", fontsize=10)
        ax.set_xlabel("Aktual")
        ax.set_ylabel("Prediksi")
plt.tight_layout()
plt.savefig("aktual_vs_prediksi.png", dpi=130)
plt.close()

# (c) Feature importance Random Forest pada S3
cfg = SCENARIOS["S3: Yield per hektar (cuaca + kategorikal)"]
feats = cfg["num"] + cfg["cat"]
pipe = build_models(cfg["num"], cfg["cat"])["Random Forest"]
X_tr, X_te, y_tr, y_te = train_test_split(
    df[feats], df[cfg["target"]], test_size=0.2, random_state=RANDOM_STATE)
pipe.fit(X_tr, y_tr)
names = pipe.named_steps["prep"].get_feature_names_out()
imp = pd.Series(pipe.named_steps["model"].feature_importances_, index=names)
imp = imp.sort_values(ascending=False).head(12)
plt.figure(figsize=(8, 5))
imp[::-1].plot(kind="barh")
plt.title("Top 12 Feature Importance - Random Forest (S3)")
plt.tight_layout()
plt.savefig("feature_importance_s3.png", dpi=150)
plt.close()

print("\nFile keluaran: hasil_perbandingan.csv, perbandingan_metrik.png, "
      "aktual_vs_prediksi.png, feature_importance_s3.png")