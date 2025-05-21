import { ref } from 'vue'

const order = [
  'Mar 21',
  'Jun 21',
  'Sep 21',
  'Dec 21',
  'Mar 22',
  'Jun 22',
  'Sep 22',
  'Dec 22',
  'Mar 23',
  '""',
  '3 Aug 23',
  '2 Nov 23',
  '1 Feb 24',
  '2 Mai 24',
  '1 Aug 24',
  '31 Oct 24',
  '30 Jan 25',
];
export function useStockData() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const revenue = ref([])
  const quarter = ref([])

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

  // Extracts and parses revenue values from the fetched data.
  // Uses the predefined 'order' array to ensure correct chronological sorting.
  // Converts string values to floats.
  const getRevenue = () => {
    if (!data.value || !data.value[3]) {
      console.warn('⚠️ Daten fehlen oder sind leer:', data.value)
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
      console.warn('⚠️ Daten fehlen oder sind leer:', data.value)
      return []
    }
    const obj = data.value[1]
     quarter.value = order.map(key => {
      const raw = obj[key]
      return {
        month: key,
        quarter: raw
      }
    })
    return quarter
  }
  
  return { data, loading, error, fetchData, getRevenue, revenue, getQuarter, quarter }
}


