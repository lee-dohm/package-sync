# Package Sync for Atom

Synchronizes packages installed between computers.

## Use

Package Sync reads `~/.atom/packages.cson` (which at this point must be hand generated and maintained), compares what is in there to the list of available packages and installs any packages that it finds are missing.

Package Sync can be activated from the `Packages > Package Sync > Sync` menu item, from the "Package Sync: Sync" entry in the command palette, or the `package-sync:sync` command can be mapped to a key for easier activation.

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

## Copyright

Copyright &copy; 2014 by [Lee Dohm](http://www.lee-dohm.com), [Lifted Studios](http://www.liftedstudios.com). See the [LICENSE](https://github.com/lee-dohm/package-sync/LICENSE.md) for more details.
