import { ref } from 'vue'

export function useStockData() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

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

  return { data, loading, error, fetchData }
}
