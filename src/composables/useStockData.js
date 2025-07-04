import { ref } from 'vue'

let order = []

export function useStockData() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const revenue = ref([])
  const quarter = ref([])
  const quarterAndRevenue = ref([])

  // Fetches stock data from the SheetDB API for a given symbol (default: AAPL).
  // Sets loading, error and stores the result in data.value
  const fetchData = async (symbol = 'AAPL') => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`https://sheetdb.io/api/v1/s9jszd8ymfgwg?sheet=$${symbol}`)
      if (!res.ok) throw new Error(`Fehler beim Abrufen der Daten für ${symbol}`)
      data.value = await res.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getOrder = () => {
    if (!data.value || !data.value[3]) {
      console.warn('⚠️ data is missing or empty', data.value)
      return []
    }
    const obj = data.value[3]
    order = Object.keys(obj)
    return order
  }

  // Extracts and parses revenue values from the fetched data.
  // Uses the predefined 'order' array to ensure correct chronological sorting.
  // Converts string values to floats.
  const getRevenue = () => {
    if (!data.value || !data.value[3]) {
      console.warn('⚠️ data is missing or empty', data.value)
      return []
    }
    const obj = data.value[3]
    revenue.value = order.map(key => {
      const raw = obj[key]
      return {
        quarter: key,
        revenue: raw ? parseFloat(raw.replace(',', '.')) : null
      }
    })
    return revenue.value
  }

  const getQuarter = () => {
    if (!data.value || !data.value[1]) {
      console.warn('⚠️ data is missing or empty:', data.value)
      return []
    }
    const obj = data.value[1]
    quarter.value = order.map(key => {
      const raw = obj[key]

      let flippedQuarter = raw
      if (raw && raw.length >= 4) {
        const year = raw.slice(0,2)
        const quarterPart = raw.slice(2)
        flippedQuarter = `${quarterPart} 20${year}`
      }

      return {
        month: key,
        quarter: flippedQuarter
      }
    })
    return quarter
  }

  //experimental!
  const getQuarterAndRevenue = () => {
    if (!data.value || !data.value[1] || !data.value[3]) {
      console.warn('⚠️ data is missing or empty:', data.value)
      return []
    }
    const quartersObj = data.value[1]
    const revenueObj = data.value[3]

    // durch das mapping entsteht ein Array aus Objekten!
    quarterAndRevenue.value = order.map(key => {
      const rawQuarter = quartersObj[key]
      const rawRevenue = revenueObj[key]
      return {
        monthKey: key,
        quarter: rawQuarter || '-',
        revenue: rawRevenue ? parseFloat(rawRevenue.replace(',', '.')) : null
      }
    })
  }

  return { data, loading, error, fetchData, getOrder, getRevenue, revenue, getQuarter, quarter, getQuarterAndRevenue, quarterAndRevenue }
}


