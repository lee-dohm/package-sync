# Package Sync for Atom
[![Build Status](https://travis-ci.org/lee-dohm/package-sync.svg?branch=master)](https://travis-ci.org/lee-dohm/package-sync)
[![Package Version](https://img.shields.io/apm/v/package-sync.svg)](https://atom.io/packages/package-sync)
[![Package Downloads](https://img.shields.io/apm/dm/package-sync.svg)](https://atom.io/packages/package-sync)
[![Dependency Status](https://david-dm.org/lee-dohm/package-sync.svg)](https://david-dm.org/lee-dohm/package-sync)

Synchronizes packages installed between computers by installing the packages listed in a configuration file.

## Usage

Package Sync reads `~/.atom/packages.cson`, compares what is in there to the list of available packages and installs any packages that it finds are missing.

**Creating the Package List**

You can create the initial package list from the packages you have installed by using the `Create Package List` command. It will include all packages you currently have installed in the `~/.atom/packages` directory. The package list can be edited from there if you wish to add or remove any packages from the list.

Calling `Create Package List` will *not* overwrite a pre-existing package list. If you want to start over, you have to manually delete `~/atom/packages.cson` and then call `Create Package List` to create it anew.

**Editing the Package List**

You can edit the package list at any time by opening it with the `Open Package List` command. It will open the `~/.atom/packages.cson` file in a new Atom tab.

**Synchronizing your Packages**

Once you have the package list set the way you want, any time you wish to ensure that you have all of your required packages, you can execute the `Sync` command.

**`packages.cson`**

The `packages.cson` file follows the format:

```coffee
'packages': [
  'foo'
  'bar'
  'baz'
]
```

Where the contents of the array is a list of packages to ensure are installed.

### Configuration

* `createOnChange` &mdash; Create the package list when packages are installed or removed via the Atom settings. You must restart Atom after installing Package Sync for this setting to take effect, and it works best when paired with the `forceOverwrite` setting.
* `forceOverwrite` &mdash; Forces the `create-package-list` command to overwrite the `packages.cson` if it exists.

### Commands

* `package-sync:create-package-list` &mdash; Creates the `~/.atom/packages.cson` file if it does not already exist
* `package-sync:open-package-list` &mdash; Opens the `~/.atom/packages.cson` in a new tab
* `package-sync:sync` &mdash; Syncs between the package list and the installed packages

### Keybindings

No keybindings are configured by default for the commands in this package.

## Copyright

Copyright &copy; 2014-2016 by [Lee Dohm](http://www.lee-dohm.com), [Lifted Studios](http://www.liftedstudios.com). See the [LICENSE](https://github.com/lee-dohm/package-sync/blob/master/LICENSE.md) for more details.
