import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function importNannies() {
  try {
    const jsonPath = path.join(__dirname, '../babysitters.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.error('Error: babysitters.json not found at', jsonPath);
      console.log('Please make sure babysitters.json is in the project root directory');
      process.exit(1);
    }

    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const nannies = JSON.parse(jsonData);

    console.log(`Found ${nannies.length} nannies to import...`);

    for (let i = 0; i < nannies.length; i++) {
      const nanny = nannies[i];
      const nannyId = `nanny-${i + 1}`;
      const nannyRef = ref(database, `nannies/${nannyId}`);
      
      await set(nannyRef, nanny);
      console.log(`Imported ${i + 1}/${nannies.length}: ${nanny.name}`);
    }

    console.log('\n✅ Successfully imported all nannies to Firebase!');
    process.exit(0);
  } catch (error) {
    console.error('Error importing nannies:', error);
    process.exit(1);
  }
}

importNannies();

