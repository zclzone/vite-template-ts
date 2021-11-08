export function wrapperEnv(envOptions: Recordable): ViteEnv {
  const ret: any = {}
  if (!envOptions) return ret

  for (const key in envOptions) {
    let val = envOptions[key]
    if (['true', 'false'].includes(val)) {
      val = (val === 'true')
    }
    if (['VITE_PORT'].includes(key)) {
      val = +val
    }
    ret[key] = val
    if (typeof key === 'string') {
      process.env[key] = val
    } else if (typeof key === 'object') {
      process.env[key] = JSON.stringify(val)
    }
  }
  return ret
}