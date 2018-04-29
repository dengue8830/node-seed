/**
 * Example of how to create a custom module, for example to create the types
 * for a third party lib that doesn't have a type in npm.
 *
 * 1. Use the "include" and "paths" options in the tsconfig.json of this project
 * 2. Create a /types folder
 * 3. Create a folder for your custom module (the same name of the module you want create)
 * 4. Create a index.d.ts in that folder
 * 5. Declare the module with the same name of the folder in quotes
 * 6. Exports your elements
 * 7. Use your elements like this
 *
 * import { SomeClass } from 'exampleModule';
 */

// just
declare module 'exampleModule';

// or more specifically
declare module 'exampleModule' {
    export class SomeClass { }
    export interface SomeInterface { }
}

// TODO: how to create interfaces for the classes on the lib
