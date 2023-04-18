import { saveAs } from "file-saver";

export function saveImage(imageUrl: string, imageId: string) {
  saveAs(imageUrl, `download-${imageId}.jpg`);
}
