import axios from "axios";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export async function downloadImage(imageUrl: string) {
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  const filename = `${uuid()}.jpg`;

  const filePath = path.join(
    process.cwd(),
    "temp",
    filename
  );

  fs.writeFileSync(filePath, response.data);

  return filePath;
}