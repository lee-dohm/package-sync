[![Build Status](https://travis-ci.org/lee-dohm/package-sync.svg?branch=master)](https://travis-ci.org/lee-dohm/package-sync)

# Package Sync for Atom

Synchronizes packages installed between computers by installing the packages listed in a configuration file.

## DEPRECATION NOTICE

This package is deprecated in favor of the new (as of v0.101.0) `apm stars --install` functionality.

## Use

Package Sync reads `~/.atom/packages.cson`, compares what is in there to the list of available packages and installs any packages that it finds are missing.

### Creating the Package List

You can create the initial package list from the packages you have installed by using the `Create Package List` command. It will include all packages you currently have installed in the `~/.atom/packages` directory. The package list can be edited from there if you wish to add or remove any packages from the list.

Calling `Create Package List` will *not* overwrite a pre-existing package list. If you want to start over, you have to manually delete `~/atom/packages.cson` and then you can call `Create Package List` to create it anew.

### Editing the Package List

You can edit the package list at any time by opening it with the `Open Package List` command. It will open the `~/.atom/packages.cson` file in a new Atom buffer.

### Synchronizing your Packages

Once you have the package list set the way you want, any time you wish to ensure that you have all of your required packages, you can execute the `Sync` command.

## Configuration

The `packages.cson` file follows the format:

```cson
'packages': [
  'foo'
  'bar'
  'baz'
]
```

Where the contents of the array is a list of packages to ensure are installed.

### Keymap

There are no keys mapped in this package. The following commands are available for you to map to keys of your choosing:

* `package-sync:create-package-list`
* `package-sync:open-package-list`
* `package-sync:sync`

## Copyright

Copyright &copy; 2014 by [Lee Dohm](http://www.lee-dohm.com), [Lifted Studios](http://www.liftedstudios.com). See the [LICENSE](https://github.com/lee-dohm/package-sync/blob/master/LICENSE.md) for more details.
