@description('Name of the Azure Static Web App')
param staticWebAppName string

@description('Location for the Static Web App')
param location string = resourceGroup().location

@description('SKU for the Static Web App')
@allowed([
  'Free'
  'Standard'
])
param sku string = 'Free'

@description('Repository URL')
param repositoryUrl string = ''

@description('Repository branch')
param repositoryBranch string = 'main'

@description('Build properties for the Static Web App')
param appLocation string = '/'

@description('API location for the Static Web App')
param apiLocation string = ''

@description('Output location for the Static Web App')
param outputLocation string = 'dist'

@description('Tags for the Static Web App')
param tags object = {}

resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticWebAppName
  location: location
  tags: tags
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: repositoryBranch
    buildProperties: {
      appLocation: appLocation
      apiLocation: apiLocation
      outputLocation: outputLocation
    }
  }
}

@description('The default hostname of the Static Web App')
output defaultHostname string = staticWebApp.properties.defaultHostname

@description('The resource ID of the Static Web App')
output staticWebAppId string = staticWebApp.id

@description('The name of the Static Web App')
output staticWebAppName string = staticWebApp.name
