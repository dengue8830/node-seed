# node-seed
NodeJS project seed with best practices based on https://github.com/i0natan/nodebestpractices + preferred tools and configs

# Run app in dev mode
npm start

# Deploy
npm run deploy

# Run all tests
# We use ts-jest for quick re-run in order to get a more friendly test environment and get more tests written
npm test

# Debug app in vscode
open debug left panel > select debug > press run button

# Debug a single test file in vscode. It also works for debug server code
open the target file > open debug left panel > select test current file > run button

# Resume of the features in this project:

(Read app.ts to see, remove or customize the features)

- Auth with jwt and passport
- Conection with socket-io
- Implementation of a working mail service
- Integration with sequelize as orm
- Example of own types definition (typescript)
- Implementation of a logger interface
- Implementation of a general error handler
- Implementation of a solution to the concurrency problem
- Implementation of config files by environment
- Implementation of a test environment
- Implementation of a component development oriented's structure

# Resume of the best practices:

- Component oriented development (user > user.ts, userApis.ts, user.test.ts, etc). Reausable, testeable, readable
- Separate layers, eg: not pass express object to services, use custom object. Testeable, easy to change web server. This applies to ORM, Web servers, libs, etc.
- Wrap libs in your own code and (ideally) upload it as an independent npm package. More customizable, easy change lib, easy to add types if lib doesnt have.
- Split app and server. App can be reused on others server config instances
- Use hirearchical config files. Easy to find entries.
/**
 * https://www.npmjs.com/package/config
 * Hirearchical config helps to find entries and maintain huge config files
 * https://github.com/i0natan/nodebestpractices/blob/master/sections/projectstructre/configguide.md
 */

- Use promises and async/await. For obvious reasons
- Use only the built-in Error object. All your components and 3th library can share an unifed way to handle errors
- Handle errors in an custom object. You can add logic (eg: sending email to admin) independently of the layer (web, bd, etc.)
- Sanitize apis arguments, never trust in client. In this case its not convenient wrap the lib in our code, the result would be a huge file with tons of not related code.
https://www.npmjs.com/package/joi

- Use momentjs for dates. Ensures that UTC is used by default and have many useful methods like compare, etc.
- Name all functions, avoid anonymous functions. Useful when profiling a node app
- Prefer const over let. Ditch the var
- Use the === operator. Otherwise, strange things like this false == '0' (=> true) could happen!
- At the very least, write API (component) testing. You can use chai-http to ensure the api params and result are correct. Later, you can add other types of testing like bd, performance, etc.
- Find a way to tag the tests, so only run the tests that corresponds to a code modified or a code that you want to test. This prevents of execute all the tests every time.
- Use CI platform. Hard work tools like jenkins can take too much time. 3th party solutions can be more quikly but could not be too much customizable as you need.
- Use healt dependency checker 
sudo npm install -g nsp
nsp check --output summary
- Delegate anything possible (e.g. gzip, SSL) to a reverse proxy (eg: nginx)
- Modify package.json to match exact versions. Otherwise diferents developers (or even server) could have diferent versions of dependencies.
- Use all server resources. Use pm2 or some docker tool to clusterize your app at least same instances like cpu's number.
This comes with a problem, the process doesn't share memory to others so when a user login served by the process A and later press F5 he could be served by the process B and that process doesn't know of the session of the user. Use a sesion stateless strategy for this (eg: memcached, jwt, etc).
- Use another thing to serve static content (html, js, etc.)

NOTE: In common/ dir must be the logic that is shared between components if it doesn't fit at 100% in some component, eg: middlewares, services, etc. This becouse in the component folder should be all the related stufs, middlewares, services, controllers, apis, etc. and if we have a services/ folder it should be confusing and favor the idea of put the services in that folder and that will destroy the "component oriented development"

NOTE 2: The components/user/ is an example of the structure of a single component, its empty, you can delete it