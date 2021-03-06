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

### How does git rebase function compare to git merge? 

#### git rebase

The git rebase command "replays" your local commits after the newly-pulled-down HEAD. This "rewrites history", creating new commits. Because the commit history before each of these new commits is different than it originally was, and because commit history is one of the inputs in the hashing that occurs to compute the final SHA-1 has for each commit, each of these new commits ends up with a new SHA-1 hash (different than it had before).

#### git merge

The git merge command creates a "merge commit" wherein, as the name suggests, a 3-way merge automatically takes place. No "rewriting of history" takes place. The existing branches are left untouched. 

#### Both git merge and git rebase can trigger 3-way merging

In either style of integrating your changes into a branch, conflicts with previous commits can occur. Those conflicts are resolved in the same way (search for conflict markers). 

#### Pros and cons

Git rebase results in a much cleaner commit history. Git merge litters the commit history with merge commits. 

Git rebase is an invasive operation. If you are working on a shared branch, it is possible to screw over your teammates by rewriting history and pushing that back out to them. The SHA-1 hashes won't match their local copies anymore, and chaos ensues. 

Git merge is safe, in that respect. It's less likely to create conflicts, and because history is preserved, it's easier to see what happened.

The safe way to use git rebase is to only use it on local, private branches, to pull in upstream or remote changes and keep your own changes at the tip of a freshly-updated branch. Thus, you can keep up with teammates' changes while maintaining a clean, linear history. 


### Present a quick overview of TDD

TDD stands for "test-driven development".

Specifically, it means to write your tests before you write your code. 

#### Pros

People commonly think of tests as being written on order to catch bugs. This is true. 

However, the way that tests catch bugs is a bit counter-intuitive. Many people imagine that the tests are run and then the bugs are caught. 

However, what actually happens more often is the act of thinking through your code in order to create meaningful tests itself creates substantially higher-quality code that has fewer bugs to begin with. Designing your code to be testable has a similar positive effect. 

TDD forces you to think through your code more thorougly than just diving in and implementing. It encourages you to think in terms of the "contract" of the module that is about to be written. 

#### Cons

TDD is counter-intuitive to the way that many developers naturally think and work. Software is more malleable than, say, constructing a house. Many (very likely most, although I have no data on that) developers like to get a little something working, then write a test for it. 

In a similar vein, sometimes the design is not clear early on, and some rapid prototyping is helpful to sketch out the outline of an approach. In such cases, writing a lot of tests very early on can feel wasteful, because there's a high likelihood of throwing away some or all of those tests as the design evolves. 

That leads to the largest perceived con, which is that writing tests up front slows you down. This is arguable of course since proponents will point to the overall time savings from avoiding pitfalls, but nonetheless is a widely-held view. 

#### Popularity

Because of the aforementioned cons, pure TDD is less common. However, it is completely standard practice to write automated tests for your code, usually very close in time to when the code is written. 

For example, solid development teams often have a fairly strict policy of refusing to merge pull requests that don't include tests, unless the change is "trivial". 

#### Should I use it? 

You should try it! Pure TDD is a bit mind-bending (in a similar veing to trying a pure functional programming language like Haskell). Even if you fall back to the more-common "write tests at about the asme time as writing the code" mode, careful and detailed forethought about the contract of the code you are about to write is an intriguing experience. 

### Is JavaScript a functional language? What does it mean for a language to be "functional"?

A functional programming paradigm emphasizes construction programs from functions, rather than objects (object-oriented paradigm) or lists of instructions (imperative paradigm). 

It's based on the mathematical idea of functions. 

#### Mathematical functions are RELIABLE

Given some INPUT, a valid mathematical function will only map to one OUTPUT.

No matter how many times you supply that input, a given function will keep producing the same output. 

That makes the function reliable and easy to reason about. 

#### Mathetmatical functions are SELF-CONTAINED

Math functions only accept INPUT. 

There is no concept of GLOBAL STATE. They do not refer to values other than the input. 

This aspect of being self-contained means that they are tidy, predictable black boxes. A change in some value outside of teh function will not have an impact on the working of the function. 

#### Mathematical functions have no SIDE EFFECTS

Math functions only evaluate to their OUTPUT. 

Again there is no concept of GLOBAL STATE. They do not affect values outside themselves. 

This aspect of having no side effects means taht they are tidy, predictable black boxes. The workings of the function will not randomly impact values outside the function. 

#### Mathematical functions DO ONE THING

Because math functions are self-contained and have no side effects, they can be understood as doing one thing. They map INPUT to OUTPUT in some predetermined, completely reliable way. The nature and purpose of that mapping might be quite complex, but the function only performs that mapping. 

##### How this applies to programming

The features described above regarding mathematical functions are very useful in the programming world. 

Composing a system from programming functions that are written to behave similarly to mathematical functions means it is a lot easier to reason about that system. 

- There will be fewer bugs.
- It will be easier to debug the problems that do arise.
- It will be easier to understand and explain the system to others.
- It will be easier to safely extend it with new functionality. 

#### This is true even in small programs

Bugs, confusion, and difficulty of extension all happen even in small programs. 

Decomposing your problem solution into a system of small, well-named, single-purpose functions with no side effects will reap benefits even at a small scale. 

#### So, is JavaScript "functional"?

JavaScript is a "multi-paradigm" language. It supports the object-oriented paradigm (albeit in an unusual prototypal-inheritance style) and it of course supports imperative programming. 

It definitely allows you to program in a functional style as well. 

- JavaScript supports passing functions as arguments to other functions.
- JavaScript also supports lambda functions (anonymous functions)
	- Lambdas are important because they are a key construct supporting higher-order functions (i.e. functions that can create other functions).
- JavaScript supports higher-order functions.
- Javascript supports closures (lambda expressions bound to the current state)

#### It's not completely cut-and-dried...

HOWEVER, here are some things that more "pure" functional languages support that JavaScript does not support: 
- first-class, deep support for immutability 
- first-class support for partial application 
- algebraic data types
- pattern matching 

#### The short answer is...

Yes, JavaScript supports the functional paradigm.

### What's a "declarative" language? 

In "imperative" programming, you specify HOW to get what you want. 

In "declarative" programming, you specify WHAT you want. You don't know or care how it will happen. 

#### Examples of declarative languages
- HTML
- SQL
- ORM's
- Functional languages

#### HTML is a language? 

Well, HTML doesn't have control flow or overt data processing and it's not Turing complete, so sure, it can be a stretch to call it a full-blown language. But there's a reason why the "L" in "HTML" stands for "Language", right? It's a markup language, yes, so it's a limited domain-specific language, but it is a formally parse-able way of expressing the semantic and visual structure of a document. 

There's a lot of imperative logic hidden behind HTML5 tags such as <video> or form field constraint validation.

More broadly, the way that HTML is rendered (in conjunction with CSS) is fantastically complex. As a programmer, you enjoy the benefit of an enormous amount of programming logic that resides behind this declarative markup language. 

#### How is that different from just using an app like Word?

A declarative language is still a language. Even though Word can visually style your document in a way that is similar to HTML... you don't programmatically parse a Word doc to produce its result. Instead, you manipulate a GUI. It isn't a language. 

#### SQL is declarative?

A SQL statement can look like it's specifying imperative logic... do exactly this, then that, then this other thing:

```
SELECT * FROM books WHERE author = "George R.R. Martin";
```

This kind of looksl ike imperative logic...?

However, it's not. You're really specifying what you are looking for (including the location(s) of what you are looking for). You are delegating to the SQL enging the exact details of how it is looked up. 

To take a simple case, for the same query, the SQL engine might decide to perform a full table scan or it might choose to use an index (assuming the presence of a relevant index). You might think it would always use an index if it were available, but for very small tables, it might not choose to do so.

You can see the "query plan" for a given query by executing EXPLAIN PLAN.

#### Wait, how is that different from what an interpreter does? 

You might say that any compiler or interpreter translates from your higher-level, imperative instructions into lower-level instructions that are harder for you to write or understand. Abstracting away that low-level complexity has been key to increasing programmer productivity for a long time. So -- how is this different from SQL, say? 

The difference is that a declarative language gives you no way to write in the imperative style. You aren't asking the interpreter or engine to convert your imperative instructions into a lower-level imperative instructions. You're asking the engine to translate your declarations of what you want produced into whatever happens to produce that output. 

#### Functional languages?

Yes, functional languages can be considered to be a subset of declarative languages. 

In functional languages, you specify the output that you want from each function. You don't care about the implementation of those functions, as long as they relibaly produce the same output for a given input. In that sense, functions are black boxes. 

As such, the implementation can be swapped out by the compiler/interpreter without you caring. 

This is imilar to how you don't really care how SELECT is implemented in SQL, or how <video> is implemented in HTML5. 

