# predict_ipc.py
import sys
import pickle

# Load your model
with open('ipc_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Get input from command line
input_text = sys.argv[1]

# Predict
predicted_output = model.predict([input_text])[0]  

# Print prediction to return it to Node.js
print(predicted_output)


# Verification
# python predict_ipc.py "Keyword"