'use babel'

import path from 'path'

export function fixture (name) {
  return path.join(__dirname, 'fixtures', name)
}
