import { ref } from 'vue'

const allStockData = ref({}) // ref({}) -> reactive vue object
const loading = ref(false)

export function useStockData() {

  const addStockToGlobal = async (symbol, revenueIndex, quarterIndex) => {
    loading.value = true

    try {
      const res = await fetch(`https://sheetdb.io/api/v1/s9jszd8ymfgwg?sheet=$${symbol}`)
      if (!res.ok) throw new Error(`Error retrieving data for AAPL ${symbol}`)

      const data = await res.json()
      const revenueObj = data[revenueIndex]
      const quarterObj = data[quarterIndex]

      const keys = Object.keys(revenueObj)
      const formatted = keys.map(key => {
        const rawRevenue = revenueObj[key]
        const rawQuarter = quarterObj[key]
        const quarter = formatQuarter(rawQuarter)
        // let quarter = rawQuarter || '-'
        // if (rawQuarter && rawQuarter.length >= 4) {
        //   const year = rawQuarter.slice(0, 2)
        //   const q = rawQuarter.slice(2)
        //   quarter = `${q} 20${year}`
        // }
        return {
          quarter,
          revenue: rawRevenue ? parseFloat(rawRevenue.replace(',', '.')) : null
        }
      })
      const sorted = formatted
      .filter(e => e.quarter.startsWith('Q')).sort(sortByQuarterAndYear)
      allStockData.value[symbol] = sorted
     
    } catch (err) {
      console.warn(`Error at ${symbol}:`, err.message)
    } finally {
      loading.value = false
    }
  }

  const formatQuarter = (input) => {
  if (!input) return '-'

  const cleaned = input.trim().toLowerCase()
  if (cleaned === 'quarter') return '-'
  //Ersetzt Bindestriche durch Leerzeichen und splittet den String:
  const parts = input.replace('-', ' ').split(/\s+/)
  let q, year
  //Prüft, ob es zwei Teile gibt
  if (parts.length === 2) {
    // e.g. "Q1 23" oder "23 Q1"
    if (parts[0].startsWith('Q')) {
      [q, year] = parts
    } else {
      [year, q] = parts
    }
  } else {
    // e.g. "23Q1", "Q123", "2023Q1"
    const match = input.match(/(20\d{2}|\d{2})?Q?(\d)/)
    if (match) {
      year = match[1] || ''
      q = match[2] ? `Q${match[2]}` : ''
    }
  }

  if (!year || !q) return input

  year = year.length === 2 ? '20' + year : year
  q = q.startsWith('Q') ? q : 'Q' + q

  return `${q} ${year}`
}


const sortByQuarterAndYear = (a, b) => {
  const [qa, ya] = a.quarter.split(' ')
  const [qb, yb] = b.quarter.split(' ')

  const yearA = parseInt(ya)
  const yearB = parseInt(yb)
  const quarterA = parseInt(qa.replace('Q', ''))
  const quarterB = parseInt(qb.replace('Q', ''))

  // Sortiere nach Jahr, dann Quartal
  if (yearA !== yearB) return yearA - yearB
  return quarterA - quarterB
}


  const buildAllStockData = async () => {
    await addStockToGlobal('AAPL', 3, 1)
    await addStockToGlobal('AMZN', 7, 1)
    await addStockToGlobal('GOOG', 3, 1)
    await addStockToGlobal('META', 3, 1)
    await addStockToGlobal('MSFT', 7, 1)
    await addStockToGlobal('NVDA', 3, 1)
    await addStockToGlobal('TSLA', 13, 1)
     console.log(allStockData)
  }
  return { loading, allStockData, addStockToGlobal, buildAllStockData }
}


