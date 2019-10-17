# leetcode

## Domain Knowledge

### Angular Directive: 

What directives actually are under the hood is simply JavaScript functions that manipulate and add behaviors to HTML DOM elements.

A main advantage of the directive, in addition to being intuitive-looking as its declarative aspect resides inline in your markup, is that it's a reusable component.

Regular declarative markup (regular HTML) can be mixed and matched in many ways to construct arbitrarily complex web pages. The behavior of those elements is configurable via attributes. Similarly, your custom declarative markup can be mixed and matched to construct your complex web application. This is more maintainable because the reuse of components cuts down the overall amount of code and centralizes and standardizes the logic of your app. 


### Angular.js vs React

| 		       	| Angular       | React |
| ------------- |:-------------:| -----:|
| Age           | 6 yrs			 | 2 yrs |
| Extensibility | yes    |   yes|
| Speed         | 1.35s     |    310ms |
| DOM           | browser     |   virtual; only renders changed data |
| Architecture  | full MVC      |    just View component |
| Structure & Components  | HTML, JS, CSS    | same; combine HTML & JS - JSX |


Angular's Verdict: more powerful, feature packed b/c of full MVC architecture, age, and community, but suffers small performance hit

React's Verdict: lightweight and features virtual DOM; lightning fast for web apps that render large amounts of data but only contains View component - you need to provide own controller and model 


### Describe some strategies for handling high traffic. What is likely to fail? How can you design your system to prevent those failures?

- Spin up a virtual cluster of web servers utilizing child processes on each instance to take advantage of multithreading.
- Funnel all traffic through a load balancer
- Check requests to load balancer against a rate limiter service to ensure the request is allowed and avoid DDOS attacks.
- Load balancer spreads traffic amongst several distinct web servers (all comprised of virtual clusters).
- Host static assets on a CDN to decrease load on server.
- Cache most-requested data to avoid excessive database reads.
- Add database write operations to a queue to prevent overloading and data loss in the event of a db failure.
- Shard databases: ea shard is held on a separate database server instance to spread load
- Mirror shards to boost fault/failure tolerance and allow concurrent reads across shards.


![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/database%20sharding.png)


### What happens when you type gmail.com into the browser? Outline the "life of a request" from beginning to end.

- DNS lookup on the URL, now you have an IP address.
- Use the IP address + the port number (which is explicitly or implicitly described in the URL) to connect to the server via TCP/IP.
- Google is obviously a huge site with many servers, so some kind of load-balancing is involved to route the request to a specific available server.
- Use the TCP stream thus opened up to start sending text to the server.
- Send an HTTP request (which is just text) to tell the server which path, host, and "verb" (GET, POST, etc) you are requesting.
- The HTTP request also contains a variety of other important headers which tell the server who you are and more about what you want.
- The server process the text of the HTTP request into a request object in memory.
- The server probably has some kind of an MVC framework; it processes the request through that.
- The resulting bundle of HTML, inline JavaScript, inline CSS, and possibly inlined binary data, is packaged up into an HTTP response.
- The HTTP response is shipped back through the TCP stream.
- The browser begins parsing the big wad of text in the HTTP response.
- As HTML, JavaScript, CSS are parsed, more HTTP requests are sent out to fetch more assets for the page.
- The browser executes script and renders the results of all its parsing to the viewport.

Note: there is a LOT more than can be said, but outlining up to this level is probably good enough for most interviews.




