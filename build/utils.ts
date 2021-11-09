import fs from 'fs'
import path, { resolve } from 'path'

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

/**
 * 遍历所有文件的路径
 * @param {string} dir 
 * @returns {Array<string>}
 */
function traverseFilePath(dir: string): Array<string> {
  let res = []
  fs.readdirSync(dir).forEach(file => {
    const pathName = path.join(dir, file)
    if (fs.statSync(pathName).isDirectory()) {
      res = [...res, ...traverseFilePath(pathName)]
    } else {
      res.push(pathName)
    }
  })
  return res
}

export function getAllPages(pageDir) {
  const pagesDir = resolve(process.cwd(), pageDir)
  const pages = traverseFilePath(pagesDir)
  const pageObj = {}
  pages.filter(fileName => fileName.endsWith('.html')).forEach(filePath => {
    const pathArr = filePath.split('\\pages\\')[1].split('\\')
    const key = pathArr.filter(path => path !== 'index.html').join('-') || pathArr[0]

    pageObj[key.replace('.html', '')] = filePath
  })
  return pageObj
}