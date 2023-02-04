// Reduz um padrão ?key=value&key2=value2 para um objeto { key: value, key2: value2 }
export function extractQueryParams(query) {
  return query
    .substr(1)
    .split('&')
    .reduce((queryParams, param) => {
      const [key, value] = param.split('=')
      queryParams[key] = value
      return queryParams
    }, {})
}