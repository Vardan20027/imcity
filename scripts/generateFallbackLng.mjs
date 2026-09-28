import axios from 'axios';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../src/locales/fallbackLng.json');
const GOOGLE_SHEET_ID = '18Z6aljuDrM4hVbgW5zRSqUBZR_e1b2QpYFachgOzyx4';
const GOOGLE_SHEET_API_KEY = 'AIzaSyBOsyoeZez2eBEAQ4i8FtDGHfiVwzj2h6g';
axios
  .get(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values:batchGet?ranges=Sheet1!A:A&ranges=Sheet1!D:D&valueRenderOption=UNFORMATTED_VALUE&majorDimension=COLUMNS&key=${GOOGLE_SHEET_API_KEY}`,
  )
  .then(response => response.data)
  .then(data => {
    let values = data.valueRanges[1].values[0];
    let keys = data.valueRanges[0].values[0];
    //console.log(values);
    //console.log(keys);

    const result = {};

    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = values[i];
    }

    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));

    console.log(result);
  });
