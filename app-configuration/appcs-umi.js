// App Configuration demo - https://docs.microsoft.com/en-us/azure/azure-app-configuration/quickstart-javascript?tabs=azure-powershell
// cybergavin
// Retrieve configuration (key-value) and feature flag from App Configuration using User-assigned managed identity
// Pre-requisite: npm install @azure/app-configuration @azure/identity
// 
const appConfig = require("@azure/app-configuration");
const appId = require("@azure/identity");
// Use user-assigned managed identity for credential
const credential = new appId.DefaultAzureCredential({
    managedIdentityClientId: "50m3n0n53n537f@#%^%^^^^-48a4408a57c4"
  });
// connect using connection string with read-only access key
const connection_string = "https://moneris365dev-conf-gstest.azconfig.io";
const client = new appConfig.AppConfigurationClient(connection_string, credential);
async function run() {
  // retrieve key "demo1:url:backend" 
  let retrievedSetting = await client.getConfigurationSetting({
    key: "demo1:url:backend"
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
