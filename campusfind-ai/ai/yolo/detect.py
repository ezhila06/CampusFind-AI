import json
import sys
import io
from contextlib import redirect_stdout
from ultralytics import YOLO

model = YOLO("yolov8n.pt")


def detect(image_path):
    # Hide YOLO console output
    with redirect_stdout(io.StringIO()):
        results = model(image_path, verbose=False)

    detections = []

    for result in results:
        for box in result.boxes:
            cls = int(box.cls[0])
            confidence = float(box.conf[0])

            # Keep only high-confidence detections
            if confidence >= 0.60:
                detections.append({
                    "label": model.names[cls],
                    "confidence": round(confidence, 2),
                })

    return detections


if __name__ == "__main__":
    image_path = sys.argv[1]

    output = detect(image_path)

    print(json.dumps(output))