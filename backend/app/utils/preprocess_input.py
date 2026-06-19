import numpy as np

def preprocess_input(data):

    fever = data.fever
    headache = data.headache
    fatigue = data.fatigue

    processed_data = np.array([
        [fever, headache, fatigue]
    ])

    return processed_data