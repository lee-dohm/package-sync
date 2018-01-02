// Type definitions for atom/season

declare module 'season' {
  /**
   * Returns `true` if there is a `cson` or `json` file at the given path, minus extension; false
   * otherwise.
   */
  export function isObjectPath(objectPath: string): boolean

  /**
   * Read the CSON or JSON object at the given path.
   */
  export function readFile(objectPath: string, callback: (err: Error, obj: object) => void): void

  /**
   * Read the CSON or JSON object at the given path synchronously.
   */
  export function readFileSync(objectPath: string): object

  /**
   * Resolve the path (minus extension) to a CSON or JSON object file.
   *
   * Returns `null` if neither was found.
   */
  export function resolve(objectPath: string): string | null

  /**
   * Sets the cache directory to use for storing compiled CSON files.
   */
  export function setCacheDir(cacheDirectory: string): void

  /**
   * Convert the object to a CSON string.
   */
  export function stringify(obj: object): string

  /**
   * Write the object to the given path as a CSON or JSON file depending on the path's extension.
   *
   * Callback is called in case of an error.
   */
  export function writeFile(objectPath: string, obj: object, callback: (err: Error) => void): void

  /**
   * Write the object to the given path as a CSON or JSON file depending on the path's extension.
   */
  export function writeFileSync(objectPath: string, obj: object): void
}
