function getTargetsForEnvironment(env) {
  switch (env) {
    case 'test':
      return 'current node'
    default:
      return 'last 2 Chrome versions, last 2 Firefox versions, last 2 Edge versions, last 2 Safari versions, last 2 iOS versions, not dead'
  }
}

function getEMAScriptModulesForEnvironment(env) {
  switch (env) {
    case 'test':
      return false
    default:
      return true
  }
}

function getBabelModuleTransformsForEnvironment(env) {
  switch (env) {
    case 'test':
      return 'commonjs'
    default:
      return 'false'
  }
}

function getBabelEnvBuiltInsForEnvironment(env) {
  switch (env) {
    case 'test':
      return 'usage'
    default:
      return 'entry'
  }
}

module.exports = function(api) {
  const nodeEnv = process.env.NODE_ENV
  if (nodeEnv === 'production' || nodeEnv === 'development' || nodeEnv === 'test') {
    api.cache.using(() => process.env.NODE_ENV)
  } else {
    throw new Error('your env flag is defined but not supported...')
  }

  const environment = api.env()
  const debugBabel =
    (typeof process.env.DEBUG_ENV !== 'undefined' && process.env.DEBUG_ENV === 'true') || api.env('test-debug-on')

  const presets = [
    [
      '@babel/env',
      {
        targets: getTargetsForEnvironment(environment),
        useBuiltIns: getBabelEnvBuiltInsForEnvironment(environment),
        modules: getBabelModuleTransformsForEnvironment(environment),
        debug: debugBabel
      }
    ]
  ]

  const plugins = []
  if (environment && environment === 'test') {
    plugins.push('transform-es2015-modules-commonjs')
    plugins.push('babel-plugin-dynamic-import-node')
  } else {
    const babelEnv = [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
        useESModules: getEMAScriptModulesForEnvironment(environment)
      }
    ]

    plugins.push(babelEnv)
    plugins.push('@babel/plugin-syntax-dynamic-import')
  }

  return {
    presets,
    plugins,
    sourceMaps: environment === 'development'
  }
}
