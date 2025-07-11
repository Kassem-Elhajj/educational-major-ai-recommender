# mistral_recommend.py
import sys

# Get the prompt argument from Node.js
prompt = sys.argv[1] if len(sys.argv) > 1 else "No input received"

# Just echo back the prompt for now (you'll replace this with Mistral later)
print(f"Recommended Major based on input: {prompt}")
