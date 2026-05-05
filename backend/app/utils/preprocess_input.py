def preprocess_input(data):
    """
    Converts input data into model-ready format
    """

    # 🔹 Extract values from schema
    fever = data.fever
    headache = data.headache
    fatigue = data.fatigue

    # 🔹 Convert to list (order must match ML training data)
    processed_data = [
        fever,
        headache,
        fatigue
    ]

    return processed_data