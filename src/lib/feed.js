export const saveKeyword = (keyword) => {
  let list = localStorage.getItem('savedKeywords')
  if (!list) list = keyword
  else if (!list.replace(/_\d*/, '').split(',').includes(keyword)) {
    list += `,${keyword}`
  }
  localStorage.setItem('savedKeywords', list)
}

export const getKeywords = () => {
  const list = localStorage.getItem('savedKeywords')
  if (list) return list.split(',')
  return null
}

export const saveCountry = (country) => {
  let list = localStorage.getItem('savedCountries')
  if (!list) list = country
  else if (!list.split(',').includes(country)) {
    list = `${list},${country}`
  }
  localStorage.setItem('savedCountries', list)
}

export const getCountries = () => {
  const list = localStorage.getItem('savedCountries')
  if (list) return list.split(',')
  return null
}

export const removeSubscription = (type, query) => {
  let itemName
  switch (type) {
    case 'keyword':
      itemName = 'savedKeywords'
      break
    case 'country':
      itemName = 'savedCountries'
      break
    default:
      break
  }
  
  localStorage.setItem(itemName,
    localStorage.getItem(itemName)
      .split(',')
      .filter(item => item !== query)
      .join(',')
  )
}