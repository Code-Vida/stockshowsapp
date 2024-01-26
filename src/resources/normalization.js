import { pipe, path, defaultTo, curry, replace } from 'ramda'

export const getNodes = curry((nodeName, data, field = 'nodes') =>
  pipe(path([nodeName, field]), defaultTo([]))(data),
)

export const stringToInt = (value) => parseInt(value)

export const toDate = (value) => new Date(value)

export const formatWithIntl = (value) =>
  new Intl.DateTimeFormat('pt-BR').format(value)

export const currencyToFloat = pipe(
  replace(/\./g, ''),
  replace(/,/g, '.'),
  replace(/R\$/g, ''),
)
