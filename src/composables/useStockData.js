import { ref } from 'vue'

const allStockData = ref({}) // ref({}) -> reactive vue object
const loading = ref(false)
const isReady = ref(false)

export function useStockData() {

  const addStockToGlobal = async (symbol, companyName, companyLogo, revenueIndex, quarterIndex) => {
    loading.value = true

    try {
      //Retrieve data from SheetDB API
      const res = await fetch(`https://sheetdb.io/api/v1/s9jszd8ymfgwg?sheet=$${symbol}`)
      if (!res.ok) throw new Error(`Error retrieving data for AAPL ${symbol}`)

      const data = await res.json()
      console.log("data", data)
      const revenueObj = data[revenueIndex]
      const quarterObj = data[quarterIndex]

      //Convert raw data into clean objects
      const keys = Object.keys(revenueObj)
      const formatted = keys.map(key => {
        const rawRevenue = revenueObj[key]
        const rawQuarter = quarterObj[key]
        const quarter = formatQuarter(rawQuarter)
        
        return {
          quarter,
          revenue: rawRevenue ? parseFloat(rawRevenue.replace(',', '.')) : null
        }
      })

      //Only extract valid Q-quarters
      //Sort them chronologically (by year, then quarter)
      const sorted = formatted
        .filter(e => e.quarter.startsWith('Q')).sort(sortByQuarterAndYear)
     
      //Get latest and previous quarter
      const last = sorted.at(-1) //actual quarter with entry
      const prev = sorted.at(-2) //previous quarter with entry
      
      //Calculate absolute and percentage change
      const salesDiff = last.revenue - prev.revenue //differencen in Milliarden
      const salesChangePercent = (salesDiff / prev.revenue) * 100 //changes in percent
      
      //Round values to 2 decimal places
      const lastQuart = last.quarter
      const lastRev = parseFloat(last.revenue.toFixed(2)) //tofixed rundet, parsefloat macht es zu zahl
      const diff = salesDiff.toFixed(2)
      const salesPerc = salesChangePercent.toFixed(2)
      const pos = salesDiff >= 0
     
      
      console.log("diff:", diff, "percent:", salesPerc, "last", last, "prev", prev)

      //Store in global stock data object
      allStockData.value[symbol] = {
        name: companyName,
        logo: companyLogo,
        data: sorted,              // All entries (sorted)
        lastQuarter: lastQuart,    // Latest quarter name
        lastRevenue: lastRev,      // Latest revenue (rounded)
        difference: pos? '+' + diff + ' ↑' : diff +  ' ↓',          // Revenue change in $ bn
        percentChange: salesPerc,  // % change from previous quarter
        positive: pos              // true if revenue increased
      }

      console.log(allStockData.value[symbol])

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


  return { loading, allStockData, addStockToGlobal, isReady }
}


