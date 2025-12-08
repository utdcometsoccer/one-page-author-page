# Infrastructure as Code

This directory contains Bicep templates for deploying Azure resources.

## Azure Static Web App Deployment

The `static-web-app.bicep` template deploys an Azure Static Web App resource.

### Required GitHub Secrets

For the GitHub Actions workflow to automatically deploy the infrastructure, the following secrets must be configured in your repository settings:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `AZURE_CREDENTIALS` | Azure service principal credentials in JSON format | See below for format |
| `AZURE_SUBSCRIPTION_ID` | Azure subscription ID | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `AZURE_RESOURCE_GROUP` | Azure resource group name | `my-resource-group` |
| `AZURE_STATIC_WEB_APP_NAME` | Name for the Static Web App | `my-static-web-app` |
| `AZURE_LOCATION` | Azure region (optional, defaults to eastus2) | `eastus2` |
| `AZURE_STATIC_WEB_APP_SKU` | SKU tier (optional, defaults to Free) | `Free` or `Standard` |

### Azure Credentials Format

The `AZURE_CREDENTIALS` secret should contain a JSON object with the following structure:

```json
{
  "clientId": "<service-principal-client-id>",
  "clientSecret": "<service-principal-client-secret>",
  "subscriptionId": "<azure-subscription-id>",
  "tenantId": "<azure-tenant-id>"
}
```

### Creating Azure Service Principal

To create a service principal with the necessary permissions:

```bash
az ad sp create-for-rbac \
  --name "github-actions-static-web-app" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group-name} \
  --sdk-auth
```

### Deployment Behavior

The GitHub Actions workflow will:

1. **Check for required secrets** - If any required secrets are missing, the deployment will be skipped gracefully
2. **Check if the Static Web App exists** - If the resource already exists, deployment will be skipped
3. **Deploy the Bicep template** - Only if secrets are present AND the resource doesn't exist

This ensures that:
- Deployments are safe and idempotent
- Existing resources are not accidentally modified or recreated
- The workflow can run successfully even without Azure credentials (e.g., in forks)

### Manual Deployment

To deploy the Bicep template manually using Azure CLI:

```bash
# Login to Azure
az login

# Create a resource group (if it doesn't exist)
az group create --name <resource-group-name> --location eastus2

# Deploy the Bicep template
az deployment group create \
  --resource-group <resource-group-name> \
  --template-file infrastructure/static-web-app.bicep \
  --parameters \
    staticWebAppName=<your-app-name> \
    location=eastus2 \
    sku=Free \
    repositoryUrl=https://github.com/your-org/your-repo \
    repositoryBranch=main \
    appLocation=/ \
    apiLocation= \
    outputLocation=dist
```

### Outputs

The template provides the following outputs:

- `defaultHostname` - The default hostname of the Static Web App
- `staticWebAppId` - The resource ID of the Static Web App
- `staticWebAppName` - The name of the Static Web App

### Notes

- The deployment uses the `azure/arm-deploy@v2` GitHub Action for Bicep template deployment
- The workflow logs in to Azure using the `azure/login@v2` action
- After deployment, the workflow logs out of Azure for security
- The `build_and_deploy_job` depends on the `deploy_infrastructure` job to ensure infrastructure is ready before deployment
