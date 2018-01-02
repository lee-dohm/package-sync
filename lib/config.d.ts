declare module "atom" {
  interface ConfigValues {
    /** Create packages list when packages or themes are installed or removed */
    'package-sync.createOnChange': boolean

    /** Overwrite packages list even when it is present */
    'package-sync.forceOverwrite': boolean
  }
}
