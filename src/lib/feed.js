export const saveKeyword = (keyword) => {
  let list = localStorage.getItem('savedKeywords')
  if (!list) list = keyword
  else if (!list.split(',').includes(keyword)) {
    list = `${list},${keyword}`
  }
  localStorage.setItem('savedKeywords', list)
}

export const getKeywords = () => {
  const list = localStorage.getItem('savedKeywords')
  if (list) return list.split(',')
  return null
}

export const saveSource = (source) => {
  let list = localStorage.getItem('savedSources')
  if (!list) list = source
  else if (!list.split(',').includes(source)) {
    list = `${list},${source}`
  }
  localStorage.setItem('savedSources', list)
}

export const getSources = () => {
  const list = localStorage.getItem('savedSources')
  if (list) return list.split(',')
  return null
}

export const removeSubscription = (type, query) => {
  switch (type) {
    case 'keyword':
      console.log('removing keyword')
      break
    case 'source':
      console.log('removing source')
      break
  }
}