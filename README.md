# web_lab5

Could not find a way to connect react to server.js..

I try to run the Nodejs process npm run dev in one terminal and in another terminal start Reactjs using npm start simultaneously in order to connect react and nodejs. Based on the website: https://www.geeksforgeeks.org/how-to-connect-node-js-with-react-js/.

But unfortunately it always shows `Proxy error: Could not proxy request /post from localhost:3000 to http://localhost:5000 (ECONNRESET).`
or
`Proxy error: Could not proxy request /post from localhost:3000 to http://localhost:5000/ (ECONNRESET).`
I could not find a way to fix it after hours of searching

The last attempt I was working on is in file `lab` as react.js

Working in Ubuntu made me harder to search for solution.

Accordint to https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/
, I also tried:
`"scripts": {
    "client": "cd lab && yarn start",
    "server": "nodemon server.js",
    "dev": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\""
  },`
  and commmand `yarn dev`, but it still did not work.
