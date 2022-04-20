// App Configuration demo - https://docs.microsoft.com/en-us/azure/azure-app-configuration/quickstart-javascript?tabs=azure-powershell
// cybergavin
// Retrieve configuration (key-value) and feature flag from App Configuration using access key
// Pre-requisite: npm install @azure/app-configuration
// 
const appConfig = require("@azure/app-configuration");
// connect using connection string with read-only access key
const connection_string = "Endpoint=https://moneris365dev-conf-gstest.azconfig.io;Id=Ypic-ll-s0:tOCv7o/NOj0OaGuThGTn;Secret=IJ0CJOUUpLqph2LjhK7CSJQexzz2I1wS+c/Nif/1y7c=";
const client = new appConfig.AppConfigurationClient(connection_string);
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
