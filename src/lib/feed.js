export const saveKeyword = (keyword) => {
  console.log('saving..')
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