import fs from 'fs';
import path from 'path';

const generatedImages = {
  'pitch_event.png': '/mnt/c/Users/propa/.gemini/antigravity/brain/5bf7ac05-34bf-4a09-8e52-bc0a84933352/pitch_event_space_1775028253109.png',
  'presidential_box_event.png': '/mnt/c/Users/propa/.gemini/antigravity/brain/5bf7ac05-34bf-4a09-8e52-bc0a84933352/presidential_box_event_1775028268980.png',
  'press_conference_event.png': '/mnt/c/Users/propa/.gemini/antigravity/brain/5bf7ac05-34bf-4a09-8e52-bc0a84933352/press_conference_room_1775028284626.png'
};

const targetDir = './public';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

for (const [filename, sourcePath] of Object.entries(generatedImages)) {
  const targetPath = path.join(targetDir, filename);
  try {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Successfully copied ${filename} to ${targetPath}`);
  } catch (error) {
    console.error(`Failed to copy ${filename}:`, error.message);
  }
}
