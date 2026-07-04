import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(__dirname, '../src')

// Path to the root of the `@antdv-next/x` package (the folder that contains
// `global.d.ts` and the built `dist/` output).
//
// Set the `ANTDV_NEXT_X_ROOT` environment variable to point at it, e.g.:
//   ANTDV_NEXT_X_ROOT=/path/to/antdv-next/x/packages/x pnpm generate
const antdvNextXRoot = process.env.ANTDV_NEXT_X_ROOT
  ? path.resolve(process.env.ANTDV_NEXT_X_ROOT)
  : path.resolve(__dirname, '../../x/packages/x')

// Matches `import { default as Actions, ActionsAudio } from './actions';`
const IMPORT_RE = /import\s+\{([^}]*)\}\s+from\s+['"]\.\/([^'"]+)['"];?/g
// Matches `type ActionsComponent = (typeof import("./dist/actions"))["default"];`
const ALIAS_RE = /type\s+(\w+)\s*=\s*\(typeof\s+import\(['"]\.\/dist\/([^'"]+)['"]\)\)\[['"]([^'"]+)['"]\]\s*;/g
// Matches `AxActions: ActionsComponent;`
const GLOBAL_RE = /(\w+):\s*(\w+)\s*;/g
// Matches a `default as Name` import specifier
const DEFAULT_AS_RE = /^default\s+as\s+(\w+)$/
// Matches a plain identifier specifier
const IDENT_RE = /^\w+$/

function warnMissing(filePath: string) {
  const hint = process.env.ANTDV_NEXT_X_ROOT ? '' : ' (set ANTDV_NEXT_X_ROOT to packages/x)'
  console.warn(`${filePath} not found${hint}`)
}

/**
 * Parse `dist/index.d.ts` of `@antdv-next/x` to learn how each subpath is
 * re-exported from the main entry.
 *
 * For example:
 *   import { default as Actions, ActionsAudio } from './actions';
 * gives:
 *   subpathMap['actions'] = { defaultName: 'Actions', named: Set(['ActionsAudio']) }
 */
function parseMainEntry(dtsContent: string): Record<string, { defaultName?: string, named: Set<string> }> {
  const subpathMap: Record<string, { defaultName?: string, named: Set<string> }> = {}

  for (const match of dtsContent.matchAll(IMPORT_RE)) {
    const specifiers = match[1]
    const subpath = match[2]
    if (!subpath)
      continue

    const entry = subpathMap[subpath] ?? { named: new Set<string>() }
    for (const raw of specifiers.split(',')) {
      const spec = raw.trim()
      if (!spec)
        continue

      const defaultMatch = spec.match(DEFAULT_AS_RE)
      if (defaultMatch) {
        entry.defaultName = defaultMatch[1]
      }
      else if (IDENT_RE.test(spec)) {
        entry.named.add(spec)
      }
    }
    subpathMap[subpath] = entry
  }

  return subpathMap
}

function generateComponents() {
  const globalDtsFilePath = path.resolve(antdvNextXRoot, 'global.d.ts')
  const indexDtsFilePath = path.resolve(antdvNextXRoot, 'dist/index.d.ts')

  if (!fs.existsSync(globalDtsFilePath)) {
    warnMissing(globalDtsFilePath)
    return
  }

  if (!fs.existsSync(indexDtsFilePath)) {
    warnMissing(indexDtsFilePath)
    return
  }

  const globalDts = fs.readFileSync(globalDtsFilePath, 'utf-8')
  const indexDts = fs.readFileSync(indexDtsFilePath, 'utf-8')

  // alias -> { subpath, exportName }
  const aliasMap = new Map<string, { subpath: string, exportName: string }>()
  for (const match of globalDts.matchAll(ALIAS_RE)) {
    const alias = match[1]
    const subpath = match[2]
    const exportName = match[3]
    if (!alias || !subpath || !exportName)
      continue
    aliasMap.set(alias, { subpath, exportName })
  }

  const subpathMap = parseMainEntry(indexDts)

  const result: Record<string, string> = {}
  for (const match of globalDts.matchAll(GLOBAL_RE)) {
    const globalName = match[1]
    const alias = match[2]
    if (!globalName || !alias)
      continue

    const aliasInfo = aliasMap.get(alias)
    if (!aliasInfo)
      continue

    const entry = subpathMap[aliasInfo.subpath]
    let mainName: string | undefined
    if (aliasInfo.exportName === 'default') {
      mainName = entry?.defaultName
    }
    else {
      if (entry?.named.has(aliasInfo.exportName))
        mainName = aliasInfo.exportName
    }

    if (!mainName) {
      console.warn(`Could not resolve "${globalName}" (alias ${alias}, subpath ${aliasInfo.subpath}, export ${aliasInfo.exportName})`)
      continue
    }

    result[globalName] = mainName
  }

  fs.writeFileSync(
    path.join(srcDir, 'components.ts'),
    `export default ${JSON.stringify(result, null, 2)} as Record<string, string>\n`,
  )

  console.log(`Generated ${Object.keys(result).length} components -> src/components.ts`)
}

generateComponents()
