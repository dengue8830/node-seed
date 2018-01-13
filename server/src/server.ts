import app from './app';

// Splitting this from app.ts we can eg: create multiples servers on diferent ports with the same app, or something else
const server = app.listen(8080, () => {
    console.log('running on 8080....');
});
export default server;