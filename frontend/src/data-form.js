import { useState } from "react"
import axios from "axios"
import "./data-form.css"

const endpointMapping = {
  Notion: "notion",
  Airtable: "airtable",
  Hubspot: "hubspot",
}

export const DataForm = ({ integrationType, credentials }) => {
  const [loadedData, setLoadedData] = useState(null)
  const endpoint = endpointMapping[integrationType]

  const handleLoad = async () => {
    try {
      const formData = new FormData()
      formData.append("credentials", JSON.stringify(credentials))
      const response = await axios.post(`http://localhost:8000/integrations/${endpoint}/get_hubspot_items`, formData)
      const data = response.data
      setLoadedData(data)
    } catch (e) {
      alert(e?.response?.data?.detail)
    }
  }

  return (
    <div className="data-form">
      <h3 className="data-form-title">Integration Data</h3>
      <div className="data-form-content">
        <pre className="data-form-pre">{loadedData ? JSON.stringify(loadedData, null, 2) : "No data loaded"}</pre>
      </div>
      <div className="data-form-buttons">
        <button onClick={handleLoad} className="data-form-button data-form-button-load">
          Load Data
        </button>
        <button onClick={() => setLoadedData(null)} className="data-form-button data-form-button-clear">
          Clear Data
        </button>
      </div>
    </div>
  )
}