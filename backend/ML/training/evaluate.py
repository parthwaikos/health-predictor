"""
evaluate.py
===========
PURPOSE : Centralized evaluation functions used by all training scripts.
CONCEPT : A good model must balance Precision and Recall.
          In healthcare, HIGH RECALL is critical — missing a sick patient
          is far worse than a false alarm.
"""

import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, roc_auc_score, confusion_matrix,
    roc_curve, classification_report
)
import os


def full_evaluation(model, X_test, y_test,
                    class_names=["Class 0", "Class 1"],
                    title="Model"):
    """
    Runs a complete evaluation and prints + plots all key metrics.

    Parameters:
    -----------
    model       : Trained sklearn model
    X_test      : Scaled test features
    y_test      : True labels
    class_names : Names for the two classes
    title       : Title for plots
    """

    print(f"\n{'─'*50}")
    print(f"  EVALUATION REPORT: {title}")
    print(f"{'─'*50}")

    # ── Predictions ──────────────────────────────────────────
    y_pred      = model.predict(X_test)
    y_prob      = model.predict_proba(X_test)[:, 1]  # Probability of class 1

    # ── Core Metrics ─────────────────────────────────────────
    acc       = accuracy_score(y_test, y_pred)
    prec      = precision_score(y_test, y_pred, zero_division=0)
    rec       = recall_score(y_test, y_pred, zero_division=0)
    f1        = f1_score(y_test, y_pred, zero_division=0)
    roc_auc   = roc_auc_score(y_test, y_prob)

    print(f"  Accuracy  : {acc:.4f}  ({acc*100:.1f}%)")
    print(f"  Precision : {prec:.4f}")
    print(f"  Recall    : {rec:.4f}  ← Most important for healthcare!")
    print(f"  F1 Score  : {f1:.4f}")
    print(f"  ROC-AUC   : {roc_auc:.4f}")
    print(f"\n{classification_report(y_test, y_pred, target_names=class_names)}")

    # ── Confusion Matrix Plot ─────────────────────────────────
    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=class_names, yticklabels=class_names)
    plt.title(f"Confusion Matrix — {title}")
    plt.ylabel("Actual")
    plt.xlabel("Predicted")
    plt.tight_layout()

    os.makedirs("ml/notebooks/plots", exist_ok=True)
    plt.savefig(f"ml/notebooks/plots/confusion_{title.replace(' ', '_')}.png")
    plt.show()
    print(f"  [Plot saved] confusion_matrix")

    # ── ROC Curve Plot ───────────────────────────────────────
    fpr, tpr, _ = roc_curve(y_test, y_prob)
    plt.figure(figsize=(6, 5))
    plt.plot(fpr, tpr, color='darkorange', lw=2,
             label=f'ROC Curve (AUC = {roc_auc:.2f})')
    plt.plot([0, 1], [0, 1], color='navy', lw=1, linestyle='--')
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate (Recall)")
    plt.title(f"ROC Curve — {title}")
    plt.legend(loc="lower right")
    plt.tight_layout()
    plt.savefig(f"ml/notebooks/plots/roc_{title.replace(' ', '_')}.png")
    plt.show()
    print(f"  [Plot saved] roc_curve")

    return {
        "accuracy": acc, "precision": prec,
        "recall": rec, "f1": f1, "roc_auc": roc_auc
    }