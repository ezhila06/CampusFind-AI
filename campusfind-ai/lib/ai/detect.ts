import { spawn } from "child_process";
import path from "path";

export interface Detection {
  label: string;
  confidence: number;
}

export async function detectObjects(
  imagePath: string
): Promise<Detection[]> {
  return new Promise((resolve, reject) => {
    const pythonPath = path.join(
      process.cwd(),
      "ai",
      "yolo",
      "venv",
      "Scripts",
      "python.exe"
    );

    const scriptPath = path.join(
      process.cwd(),
      "ai",
      "yolo",
      "detect.py"
    );

    const python = spawn(pythonPath, [
      scriptPath,
      imagePath,
    ]);

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        reject(error);
        return;
      }

      try {
        console.log("Python Output:", output);
resolve(JSON.parse(output));
      } catch (err) {
        reject(err);
      }
    });
  });
}