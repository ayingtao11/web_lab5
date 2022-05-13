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

after update, I give up using:
`app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});`
in server.js, and
`
 <form action="../../post" method="post" 
              className="form">
          <button type="submit">Connected?</button>
        </form>`
in app.js. 
But using:
`
componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/car_judges/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
`
, but it only gave me error message about didn't insert car information correctly when I try to insert car information.
{"error":"No Car_ID specified,No Judge_ID specified,No Judge_Name specified"}
