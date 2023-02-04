
// Captura possiveis parametros de rota
// Exemplo: /user/:id
// E também query params
// Exemplo: /user/:id?name=foo&age=20

export function buildRoutePath(path) {
  const getUrlParamRegex = /:([a-zA-Z0-9]+)/g
  const pathWithParams = path.replaceAll(getUrlParamRegex, '(?<$1>[a-zA-Z0-9\-_]+)')
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
  return pathRegex
}