// App Configuration demo - https://docs.microsoft.com/en-us/azure/azure-app-configuration/quickstart-javascript?tabs=azure-powershell
// cybergavin
// Retrieve configuration (key-value) and feature flag from App Configuration using a user-assigned managed identity
// Pre-requisite: npm install @azure/app-configuration @azure/identity dotenv
//////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// Source environment variables 
// APP_CONFIGURATION_ENDPOINT = App configuration endpoint URL (https://xxx.azconfig.io)
// IDENTITY_CLIENTID = Managed Identity client_id
require('dotenv').config();

// Include Azure modules
const appConfig = require("@azure/app-configuration");
const appId = require("@azure/identity");

// Create credential for user-assigned managed identity
const credential = new appId.DefaultAzureCredential({
    managedIdentityClientId: String(process.env.IDENTITY_CLIENTID) 
  });
  
// Connect to App configuration
const client = new appConfig.AppConfigurationClient(process.env.APP_CONFIGURATION_ENDPOINT, credential);

// Retrieve configuration
async function run() {
  // retrieve key-value "demo1host" 
  let retrievedSetting = await client.getConfigurationSetting({
    key: "demo1host"
  });
  // retrieve feature flag "debug" (JSON value returned)
  let dflag = await client.getConfigurationSetting({
    key: ".appconfig.featureflag/debug"
  });
  // Log value and use flag
  console.log("Retrieved value:", retrievedSetting.value);
  if ( JSON.parse(dflag.value)["enabled"] ){
     console.log("Debug is ON");
  }else{
     console.log("Debug is OFF");
  }
}
run().catch((err) => console.log("ERROR:", err));
