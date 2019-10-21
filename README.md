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


### What does it mean to scale an architecture horizontally, instead of vertically? 

Horizontal scaling divides the load amongst many similar resources (can be done infinitely, with little incremental cost). Vertical scaling increases the power of a single resource (can be done only to a finite limit, and often at greater cost).

### What is a cookie? 

#### Background
- key-value pairs
- sent with every HTTP request
- the primary way to get around HTTP's stateless nature
- scoped by subdomain
- can be set to expire 

#### How is it used? 
- Remembering stateful information, e.g. items in a shopping cart or previously entered items in a form field
- Implementing sessions. For example, an encrypted session id can be stored in the cookie. 
- Generally, storing any client-specific data
- User tracking across sites 

#### Tips/Gotchas
- They only store up to around 4KB
- You can encrypt them but it's safer to just use them to store an id, keyed to fetch teh full user info, server-side 
- You can relax the scoping to just the domain to share cookies between subdomains, this is one way to get a poor man's SSO(todo)
- Setting them to never expire is often a security risk
- Since they're sent with every request, they can require bandwidth
	- Can fix this by putting static assets on a separate subdomain or domain

### What's the difference between a socket and a port? 

A socket is like a file descriptor - it's the object/abstraction that a running program (process) uses to talk to the OS about a connection. A port helps route to the correct socket. 

### What is the "same-origin policy"? 

It's a basic security measure implemented by browsers. The theory is that "you trust yourself". If you serve assets to a client, then those assets can trust each other not to be malicious. Stuff from other sources is untrusted. 

What "self" means here is a combination of protocol (e.g. http vs https), the domain (down to the sub-domain level), and port. If resources arrive from some other combination of those things, they are untrusted.

There are various techniques to get around same-origin restrictions but one clean way is to use teh official CORS (Cross-Origin Resource Sharing) mechanism. 





