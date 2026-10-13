import json
import sys
import io
from contextlib import redirect_stdout
import easyocr

reader = easyocr.Reader(["en"], gpu=False)


def extract_text(image_path):
    with redirect_stdout(io.StringIO()):
        results = reader.readtext(image_path)

    texts = []

    for result in results:
        text = result[1]
        confidence = float(result[2])

        if confidence >= 0.40:
            texts.append({
                "text": text,
                "confidence": round(confidence, 2)
            })

    return texts
if __name__ == "__main__":
    image_path = sys.argv[1]

    output = extract_text(image_path)

    print(json.dumps(output))