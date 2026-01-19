/**
 * Simple CSV Parser
 * Parses a CSV string into an array of objects.
 * Assumes the first row is the header.
 * Handles quoted fields with newlines and commas correctly.
 */
export const parseCSV = (text: string): any[] => {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let inQuote = false;
  
  // Normalize line endings to \n
  const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < normalizedText.length; i++) {
    const char = normalizedText[i];
    const nextChar = normalizedText[i + 1];

    if (inQuote) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote ("") -> quote (")
          currentVal += '"';
          i++; // Skip next quote
        } else {
          // End of quote
          inQuote = false;
        }
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuote = true;
      } else if (char === ',') {
        // End of field
        currentRow.push(currentVal);
        currentVal = '';
      } else if (char === '\n') {
        // End of row
        currentRow.push(currentVal);
        rows.push(currentRow);
        currentRow = [];
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
  }

  // Push last value/row if exists
  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal);
    rows.push(currentRow);
  }

  // Handle headers
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => h.trim());
  const result = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    // Skip empty rows
    if (row.length === 1 && row[0].trim() === '') continue;
    
    // Ensure row has same number of columns as headers, or at least enough to be useful
    // Some CSVs might have trailing empty columns or missing trailing columns
    const obj: any = {};
    let hasData = false;

    headers.forEach((header, index) => {
      const val = row[index] !== undefined ? row[index] : '';
      obj[header] = val.trim(); // Trim values
      if (obj[header]) hasData = true;
    });

    if (hasData) {
      result.push(obj);
    }
  }

  return result;
};
