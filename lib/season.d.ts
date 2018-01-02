// Type definitions for atom/season

declare module 'season' {
  export function readFileSync(objectPath: string): object

  export function writeFileSync(objectPath: string, obj: object): void
}
