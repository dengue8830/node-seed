# node-seed
NodeJS project seed with best practices based on https://github.com/i0natan/nodebestpractices + preferred tools and configs


Resume:

- Component oriented development (user > user.ts, userApis.ts, _test_user.ts, etc). Reausable, testeable, readable
- Separate layers, eg: not pass express object to services, use custom object. Testeable, easy to change web server. This applies to ORM, Web servers, libs, etc.
- Wrap libs in your own code and (ideally) upload it as an independent npm package. More customizable, easy change lib, easy to add types if lib doesnt have.
- Split app and server. App can be reused on others server config instances
- Use hirearchical config files. Easy to find entries.
/**
 * https://www.npmjs.com/package/config
 * Hirearchical config helps to find entries and maintain huge config files
 * https://github.com/i0natan/nodebestpractices/blob/master/sections/projectstructre/configguide.md
 * TODO: ver como tener json de configuracion para dev y prod. Era algo con npm, node process env o una lib para hacer merge de los config files... algo asi
 */

- Use promises and async/await. For obvously reasons
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
- Use all server resources. Use pm2 or some docker tool to clusterize your app at least same instances like cpus number.
This comes with a problem, the process doesnt share memory to others so when a user login served by the process A and later press F5 he could be served by the process B and that process doenst know of the session of the user. Use a sesion stateless strategy for this (eg: memcached, jwt, etc).
- Use another thing to serve static content (html, js, etc.)

NOTE: In common/ dir must be the logic that is shared between components if it doesnt fit at 100% in some component, eg: middlewares, services, etc. This becouse in the component folder should be all the related stufs, middlewares, services, controllers, apis, etc. and if we have a services/ folder it should be confusing and favor the idea of put the services in that folder and that will destroy the "component oriented development"