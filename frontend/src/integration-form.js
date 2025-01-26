import { useState } from "react"
import { AirtableIntegration } from "./integrations/airtable"
import { NotionIntegration } from "./integrations/notion"
import { HubspotIntegration } from "./integrations/hubspot"
import { DataForm } from "./data-form"
import "./integration-form.css"

const integrationMapping = {
  Notion: NotionIntegration,
  Airtable: AirtableIntegration,
  Hubspot: HubspotIntegration,
}

export const IntegrationForm = () => {
  const [integrationParams, setIntegrationParams] = useState({})
  const [user, setUser] = useState("TestUser")
  const [org, setOrg] = useState("TestOrg")
  const [currType, setCurrType] = useState(null)
  const CurrIntegration = integrationMapping[currType]

  return (
    <div className="integration-form-container">
      <div className="integration-form-card">
        <h2 className="integration-form-title">Integration Setup</h2>
        <div className="integration-form-inputs">
          <input
            type="text"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="integration-form-input"
          />
          <input
            type="text"
            placeholder="Organization"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            className="integration-form-input"
          />
          <select onChange={(e) => setCurrType(e.target.value)} className="integration-form-select">
            <option value="">Select Integration Type</option>
            {Object.keys(integrationMapping).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {currType && (
          <div className="integration-form-component">
            <CurrIntegration
              user={user}
              org={org}
              integrationParams={integrationParams}
              setIntegrationParams={setIntegrationParams}
            />
          </div>
        )}
        {integrationParams?.credentials && (
          <div className="integration-form-data">
            <DataForm integrationType={integrationParams?.type} credentials={integrationParams?.credentials} />
          </div>
        )}
      </div>
    </div>
  )
}