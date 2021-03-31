import { fs, SfdxError } from '@salesforce/core';

// Read a json formatted file that contains an array of obejcts
export function deserializeJson(filename: string): [] {
    if (!fs.existsSync(filename)) throw new SfdxError(`File '${filename}' does not exist.`);
    const raw = fs.readFileSync(filename);
    const parsed = JSON.parse(raw.toString());
    const output = (parsed.result) ? parsed.result : parsed;

    if (!Array.isArray(output)) throw new SfdxError(`File '${filename}' is not of the correct format.`);

    return output as [];
}

export function removeUnwantedAttributes<T>(rows: T[]) {
    rows.forEach(i => {
        delete i['attributes'];
        delete i['height'];
    });
}
