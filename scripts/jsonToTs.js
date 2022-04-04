/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const openapiTS = require('openapi-typescript').default;

// inputBasePath and swaggerFilename must match what is in main.ts
const inputBasePath = 'swagger';
const swaggerFilename = 'api.json';
const outputBasePath = 'generated-typescript';
const outputFilename = 'types.ts';

fs.promises.readFile(`${inputBasePath}/${swaggerFilename}`, 'utf8').then((schema) => {
  openapiTS(JSON.parse(schema), { prettierConfig: '.prettierrc' })
    .then((tsOutput) => fs.writeFileSync(`${outputBasePath}/${outputFilename}`, tsOutput))
    .catch((err) => console.error(`Error generating ${outputFilename} file: ${err}`));
});
