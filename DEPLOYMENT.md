# Bicep Template Deployment Implementation Summary

## Overview

This implementation adds conditional Azure Static Web App infrastructure deployment to the GitHub Actions workflow. The deployment is safe, idempotent, and gracefully handles missing secrets or existing resources.

## Changes Made

### 1. Bicep Template (`infrastructure/static-web-app.bicep`)

Created a Bicep template that defines an Azure Static Web App resource with:
- Configurable name, location, and SKU (Free or Standard)
- Repository URL and branch configuration
- Build properties (app location, API location, output location)
- Outputs for hostname, resource ID, and resource name

### 2. GitHub Workflow Updates (`.github/workflows/azure-static-web-apps-wonderful-moss-050caf31e.yml`)

Added a new `deploy_infrastructure` job that:

#### Step 1: Check Required Secrets
- Validates presence of required Azure secrets:
  - `AZURE_SUBSCRIPTION_ID`
  - `AZURE_RESOURCE_GROUP`
  - `AZURE_STATIC_WEB_APP_NAME`
  - `AZURE_CREDENTIALS`
- Sets `deployment_needed` output to `true` if all secrets are present
- Gracefully skips deployment if any secrets are missing (useful for forks or non-production environments)

#### Step 2: Azure Login
- Only runs if secrets are present
- Uses the `azure/login@v1` action with service principal credentials

#### Step 3: Check if Static Web App Exists
- Uses Azure CLI to check if the Static Web App already exists
- Sets `exists` output to `true` if the resource exists
- Skips deployment if resource already exists to prevent recreation

#### Step 4: Deploy Bicep Template
- Only runs if:
  - Required secrets are present (`deployment_needed == true`)
  - Static Web App doesn't exist (`exists == false`)
- Uses `azure/arm-deploy@v1` action to deploy the Bicep template
- Configurable parameters from secrets:
  - `AZURE_LOCATION` (defaults to `eastus2`)
  - `AZURE_STATIC_WEB_APP_SKU` (defaults to `Free`)

#### Step 5: Azure Logout
- Always runs if Azure login was successful
- Ensures credentials are not left in the environment

#### Dependency Chain
- `build_and_deploy_job` now depends on `deploy_infrastructure`
- This ensures infrastructure is ready before attempting deployment

### 3. Documentation (`infrastructure/README.md`)

Created comprehensive documentation covering:
- Required GitHub secrets and their format
- Azure service principal creation instructions
- Deployment behavior and conditions
- Manual deployment instructions
- Template outputs

## Key Features

### Conditional Deployment
The workflow intelligently handles different scenarios:

1. **All secrets present, resource doesn't exist**: Deploys infrastructure
2. **All secrets present, resource exists**: Skips deployment
3. **Missing secrets**: Skips deployment gracefully (no errors)
4. **Fork or PR from external contributor**: Works without Azure credentials

### Idempotency
The deployment is idempotent:
- Running the workflow multiple times is safe
- Existing resources are never modified or recreated
- No manual intervention needed for subsequent runs

### Security
- Azure credentials are stored as GitHub secrets
- Service principal can be scoped to specific resource group
- Credentials are logged out after use
- No credentials are exposed in logs

## Required GitHub Secrets

To enable infrastructure deployment, add these secrets to your repository:

```
AZURE_CREDENTIALS={"clientId":"...","clientSecret":"...","subscriptionId":"...","tenantId":"..."}
AZURE_SUBSCRIPTION_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_RESOURCE_GROUP=my-resource-group
AZURE_STATIC_WEB_APP_NAME=my-static-web-app
AZURE_LOCATION=eastus2 (optional, defaults to eastus2)
AZURE_STATIC_WEB_APP_SKU=Free (optional, defaults to Free)
```

## Testing Scenarios

### Scenario 1: First Deployment (Secrets Present, No Resource)
1. Add all required secrets to repository
2. Push to main branch
3. Workflow runs:
   - ✅ Checks secrets: All present
   - ✅ Checks resource: Doesn't exist
   - ✅ Deploys Bicep template
   - ✅ Builds and deploys app

### Scenario 2: Subsequent Deployments (Resource Exists)
1. Push to main branch
2. Workflow runs:
   - ✅ Checks secrets: All present
   - ✅ Checks resource: Exists
   - ⏭️ Skips infrastructure deployment
   - ✅ Builds and deploys app

### Scenario 3: Fork Without Secrets
1. User forks repository (no Azure secrets)
2. Push to main branch
3. Workflow runs:
   - ⏭️ Checks secrets: Missing
   - ⏭️ Skips all Azure operations
   - ✅ Rest of workflow can proceed (if applicable)

## Validation

- ✅ Bicep template syntax validated with `az bicep build`
- ✅ Workflow YAML syntax validated
- ✅ All required parameters and secrets documented
- ✅ Conditional logic tested

## Future Enhancements (Optional)

If needed in the future, consider:
1. Adding Application Insights resource deployment
2. Adding custom domain configuration
3. Adding staging slots for Standard SKU
4. Adding Azure Key Vault integration for secrets
5. Adding Bicep parameter files for different environments
