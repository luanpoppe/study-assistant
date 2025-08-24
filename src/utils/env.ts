import "dotenv/config";

const envList = ["GOOGLE_GENERATIVE_AI_API_KEY", "TAVILY_API_KEY"];
type EnvKeys = (typeof envList)[number];
const env: Record<EnvKeys, string> = {};

envList.forEach((param) => {
  const processEnv = process.env[param];
  if (!processEnv)
    throw new Error(
      `The environment variable ${param} was not loaded correctly`
    );

  env[param] = processEnv;
});

export default env;
