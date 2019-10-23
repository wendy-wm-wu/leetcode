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

### What are the different kinds of testing of a web system, and when do you use each? 

#### Unit tests

Unit-testing focuses on small, isolated units. Often these are individual functions.

#### Integration tests

Integration tests focus on testing the integration (the contract) between two or more units.

#### End-to-end tests

End-to-end tests are a kind of large integration test that treat an entire system or sub-system as a "black box" and usually involve manipulating the UI. 

#### Browser tests

For web systems, it's common nowadays to use testing frameworks that drive headless browsers to run your tests. You can render your components or pages in context, with a full rendering engine and Javascript engine, and see the rendered results as snapshots saved to disk or otherwise collect data about what happens when you really run the system "live". 

#### Headless browsers

A headless browser is one that doesn't display to the screen but otherwise functions just like a regular browser. This is helpful for distributing your testing out to servers (often Linux machines) that don't have displays. 

#### Automated tests

Automated tests run, of course, automatically.

#### CI

"Continuous Integration" refers to running your automated tests, well automatically -- whenever code is checked into a given branch. 

#### Test coverage

Test coverage tools can tell you what percentage (%) of your codebase is covered by your automated tests Literally, what percentage of your overall lines of code doesn't get exercised when running your test suite.

Test coverage percentages are not the end-all-be-all. If your tests are poorly constructed (they don't tell you much if they fail or they are testing silly things) then "100% test coverage" doesn't really help. Test coverage is just another metric to look at. 

#### Manual testing

Manual testing is often referred to as "black box" testing. To the human tester, the inner workings of the system are opaque; it's a "black box".

#### Regression testing

"Regression testing" looks at older functionality to make sure it didn't stop working when you added some new functionality. 

#### Acceptance testing

"Acceptance testing" is either human or automated testing that's used to "bless" or "green-light" a build for public release. It's usually a combo of regression testing and new-feature testing, and a combo of human and automated testing. It often leans more toward human/manual testing because human discernment (often by a Product Manager type) helps in determining whether a given new feature "passes muster" for release to other human beings. 

#### Smoke tests

A set of "smoke tests" are limited sets of tests of very high value areas of the system. Often this will be stuff like logging into the system or making a payment. If those areas are broken, there's absolutely no way we can ship. (Often called "show-stoppers"). The analogy is that "smoke is pouring out of the black box" -- you don't know exactly what's up, but it's Really Bad. They are usually small so you can routinely run them as a final "sanity check" before release. 

### What's the difference between encryption and hashing?

Encrypted data can be decrypted, in that sense that they are "two-way". Whereas hashes are "one-way". 

### What's the difference between encoding, obfuscation, minification, and compression? 

"Minification" of your JS usually refers to just removing whitespace and wahtnot to save space when transporting it over the wire. 

"Compression" is actually applying a compression algorithm, e.g., gzipping your code before transporting it over the wire. 

The two terms blur together a bit when you consider the Google Closure Compiler, which uses static analysis to perform aggressive optimizations like renaming your functions to very short names and pruning unused code.

"Obfuscation" means hiding human-readable code with harder-to-read equivalents. It's often a slightly useful side effect of minifying and compressing. Obfuscation has minor utility in discouraging hacking but it won't stop a determined hacker from looking at whatever code you're sending to the client. 

"Encoding" converts characters to make sure they can be transported safely. 

### What do "FIFO" and "LIFO" mean? 

FIFO stands for First In First Out.
LIFO stands for Last In First Out.

FIFO corresponds to the “queue” abstract data structure.
LIFO corresponds to the “stack” abstract data structure.

Queues are an important part of a robust system architecture. Jobs are placed on queues and consumed by workers. A series of such queues can be lined up to implement a workflow.  For example, let’s say you work at YouTube and you needed to send out a “this week’s recommendations” digest email to a large population of channel subscribers. You could organize that overall task as a series of work queues, one for each phase of the workflow.  

At the start of the workflow, a cluster of dispatcher processes can look up all the current subscribers (in a paginated/batched way of course).  They bundle up batches of subscribers into separate jobs (say 100 per job) and put those jobs onto the 1st queue..

Each job is pulled off 1st queue by a member of the next cluster of workers.That worker will find the video recommendations for each of the 100 subscribers in the job it just pulled. The worker then assembles up to 10 new jobs (to actually format the emails), for up to 10 subscribers per job, and puts those jobs onto the 2nd queue.  

When the workers for the 2nd queue are done, they forward a new job onto the 3rd queue, to actually send the emails.

After the workers consuming the 3rd queue are done, the workflow is complete! Tens of millions of people can now safely ignore the resulting spammy exhortations to watch entertainingly mindless videos.

That's "queues" in action at the system architecture level.

Stacks are also an important data structure and you use one every time you run a program. The call stack maintains the tree of function calls that expands and collapses at a tremendous pace throughout execution of your code. At every level of this tree there is a corresponding stack frame that represents the state when the function was called. Visualizing the state of the stack is key to understanding and making use of recursion. It’s also a good skill to have for debugging and generally understanding wth your program is actually doing.

### Explain what "Big O" notation is. 

It’s a formal way of comparing the complexity in time or space of different algorithms.

Because hardware can be very different, it isn’t that effective to compare the actual, clock-measured speed of one algorithm versus another. Benchmarks attempt to do this but are always confounded by the ambiguity introduced by different hardware / different runtime contexts.

However the inherent, abstract _complexity_ of one approach versus another does not change. The analogy here is boiling an egg vs making a souffle.  A beginning cook will take a lot longer in clock time to make a souffle than an experienced sous-chef. But both people have to do more work inherently to make a souffle than to boil an egg. The inherent _complexity_ is higher.

Time complexity is measured, in programming, in the number of _steps_ it takes to execute an algorithm, given some discrete input size (the number of elements in an array, say). 

If, given an input of size n, you can complete your processing in a single step, that’s called O(1) time.

If you have to loop over all the elements in order to complete the processing, that’s O(n) time.

If you have to nest 2 loops to complete the processing, that’s O(n^2) -- n-squared.  That’s called “quadratic time”.

If you can cut down the amount of elements that need to be processed in half with each pass, then that’s O(log n) time.

If the number of steps grows as an exponential function of some base, say base 2, then that’s  2^n (2 to the n power), where n is the number of elements, then your algorithm is toast…. you can’t scale at all.  That’s called “exponential time”.

Space complexity is similar, but talks about the growth in memory use required to execute a given algorithm, rather than the growth in the number of steps (CPU use).

The point of examining Big O performance is to get a sense for whether a given processing strategy is viable -- will it consume too many resources at scale ? Will it bog down with a large input size, and therefore slow the whole system to a crawl once we launch for real?

### What is "dynamic programming"? 

Dynamic programming (DP) is an algorithm design approach.  It’s especially good for optimization problems, or other problems where exhaustive search over the solution space helps to find the best solution. Normally exhaustive search is computationally too expensive to use in practice. However DP uses clever tricks to reduce the computation to a reasonable amount. One cute way of thinking about DP is “careful brute force”.

Like generic “divide and conquer” algorithms, DP involves solving a complex problem by breaking it down into a collection of simpler subproblems. So far, that sounds like quicksort and its ilk. However dynamic programming goes a step further by analyzing those subproblems and noting that there is some overlap between the subproblems. 

This is actually a good thing, because it is by avoiding recalculation of those repeated subproblems that DP achieves enough efficiency gains to be usable despite the "exhaustive search" aspect mentioned above. The technique for doing so is memoization, which you’ve already used. However memoization is not DP, nor does it compete with DP, it’s simply used by DP.

DP is a subtle technique that will require substantial time to sink in. We recommend you take a few hours sometime and watch the videos linked below. They provide a complete grounding in the technique, illustrated with real examples, and present a recipe for figuring out how to generate DP-style solutions on your own.


### JavaScript Event Loop
1. Maintain a queue of tasks
2. Run a continuous loop that waits synchronously for a task, runs it, and repeats. 
3. A task is always "run-to-completion" and cannot be pre-empted by any other message. 

#### Motivation

The point of the event loop is to organize the entire program-execution paradigm around asynchronicity. This pays big dividends in terms of responsiveness, freeing up the CPU to attend to other matters (aka being "non-blocking"). This was most useful originally in the context of browser UI's, but now is critical in writing efficent, scalable servers via the Node.js platform. In the latter case, the callbacks that the event loop is managing are related to I/O with resources external to the process -- disk access or network calls to other services. The asynchronicity powered by the Javascript event loop is what gives Node.js its fabled ability to manage 10k concurrent connections as a chat server, in a single process. 

#### Slightly more details

1. JavaScript maintains a queue of messages, which are essentially callbacks 
2. JavaScript also maintains a call stack, which is a stack of frames for nested function calls that have not yet completed evaluating.
3. It runs a while loop that waits synchronously for a message, processes the message synchronously, and repeats. 

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/eventloop.png)

#### A note on setTimeout

When setTimeout is used, Javascript will wait delay milliseconds before adding the callback to the queue. At that time, if there are still previous messages in the queue, those will be processed first and our callback may end up being called later than delay milliseconds. Thus, delay is not a guaranteed exact delay, but a minimum. 

This is why setting setTimeout on a function with a zero delay will still ensure that the function is called after the current message is finished (and indeed, after everything else that might be in the queue before it). 

### Tuples
### What's a tuple? A triple? What's the difference between a tuple and a set?

A tuple is an ordered series of values, in a meaningful sequence. 

Tuples are different from simple ordered lists because each index has a specific meaning. 

Tuples are different from sets because the latter are unordered and guarantee uniqueness of the values. 

#### Examples

A coordinate pair is a tuple. The 1st index means "x-coordinate" and the 2nd index means "y-coordinate".

An RGB value is a tuple. The 1st index means "red", the 2nd index means "green", and the 3rd index means "blue". 

#### Triples and beyond

Often, a tuple is a pair of values, but don't be thrown by the "two" sound in "tuple". YOu can have a tuple of any length. A "triple" is a tuple with 3 values, as we saw above. An n-tuple is a tuple of n values, so you can talk about "4-tuples", "5-tuples", and so forth. 

#### Where are they used?

Python has a distinct data type called a tuple. It is often used to return more than one value from a function. Since tuples in Python are immutable, they are also used as dictionary keys. It can be handy to glom together multple fields of an object as its "primary key" so to speak in this way. 

Ruby also has tuples, via a standard library.

JavaScript does not have tuples as such. However, when you return an array from a function and assign each element to a separate variable, you effectively have returned a tuple, because the order matters and each index has a meaning. 

### What is the average and worst-case time complexity of access, search, and insertion for common data structures? For each answer, briefly explain why.

#### Arrays

Random Access: O(1)
Search: O(n)
	 - best case is O(log n) if array is sorted 
Insert: O(n)
Delete: O(n)

#### Queues

Random Access: O(n)
Search: O(n)
Insert: O(1)
Delete: O(1)

To achieve O(1) performance, you can implement a queue as either: 
- a doubly-linked list, which naturally allows you to manipulate each end as a single operation
- a "circular array", where you keep track of pointers that tells you where the front and back of the queue reside. The "front" and "back" can float around the array arbitrarily. 

#### Stacks

Random Access: O(n)
Search: O(n)
Insert: O(1)
Delete: O(1)

#### Linked Lists

Random Access: O(n)
Search: O(n)
Insert: O(1)
	- Inserting into a linked list requires re-pointing the previous node (the node before the insertion point) to the inserted node, and pointing the newly-inserted node to the next node. 
Delete: O(1)

#### Binary Search Trees (BST)

Random Access: O(log n)
	- access in the common case is often O(n)
Search: O(log n)
Insert: O(log n)
Delete: O(log n)

##### Worst case scenarios for BSTs

The worst-case scenarios for BSTs all involve a completely unbalanced tree, which degenerates into a singly-linked list. In the worst-case scenario, access, search, insertion, and deletion would be O(n). 

### When using git, what do people mean when they talk about "the SHA-1"? How is that related to how git works?

Git is designed to provide an absolute assurance that one person's version of a given codebase is exactly the same as another person's version of a given codebase, at the same revision.

In order to provide this assurance, Git relies heavily on hashing both data (the files themselves) and metadata (such as commit descriptions). 

#### What's hashing

Hashing is converting an arbitrarily-large input to a small (fixed-length) output in a one-way manner. This is different from encryption, in that an encrypted item can be decrypted. 

Git uses the SHA-1 hashing mechanism. SHA-1 converts any string into a 40-digit hexadecimal number. 

#### Git hashes the world

Using SHA-1, git hashes all kinds of things. It hashes the files themselves, it hashes the directory trees that those files live in, it hashes previous commits, it hashes the current commit, and various other bits of metadata. 

At each pass of processing, it keeps feeding those hashes in as inputs into other hashes, recursively. 

In the end, you get a single commit hash, that represents the full "state of the world" at that time. 




