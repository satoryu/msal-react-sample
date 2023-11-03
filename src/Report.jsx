import { PowerBIEmbed } from "powerbi-client-react"
import { models } from "powerbi-client"
import { useMsal } from "@azure/msal-react"
import { useState } from "react"

export default function Report() {

  const { instance, accounts } = useMsal()
  const [ accessToken, setAccessToken ] = useState(null)

  instance.acquireTokenSilent({
    scopes: ['https://analysis.windows.net/powerbi/api/.default'],
    account: accounts[0]
  }).then((response) => {
    setAccessToken(response.accessToken)
  })

  return (
  <>
  { accessToken ?
    (
    <PowerBIEmbed
      embedConfig={{
        type: 'report',
        id: import.meta.env.VITE_REPORT_ID,
        accessToken: accessToken,
        tokenType: models.TokenType.Aad,
      }}
      cssClassName="report"
    />
    ) : (
      <div>Loading ... </div>
    )
  }
  </>)
}