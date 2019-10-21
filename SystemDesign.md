## System Design

### Scalability 

- Vertical scaling: If you're running low on RAM or exhausting available CPU cycles or running low on disc place, get more RAM, more processor, more disc space. 
	- Cons: real-world constraints, financial resources, state of the art technology 

	- Hard Drive Types: SAS (serial attached scuzzy) - can help databases be read or written more quickly, SATA, IDE, Solid-state-drive(SSD) - best, have no moving parts so faster

- Horizontal scaling: Architect system to not hit ceiling, get lots of slower and cheaper machines

- Load balancing: Distribute traffic to all end servers 
	- return IP address of load balancer and let load balancer figure out how to route data to backend servers
	- backend servers can now have private IP addresses (rest of the world cannot see private IPs)
	- common approach is round robin style
		- Con: if bad luck, one server might get more heavy-weight users, or caching can contribute to disproportionate amount of load on a server due to bad luck 
	- more complex is basing routing on load/randomness 

	Software Types: Amazon's elastic load balancer, Nginx, Linux virtual server
	active-active: pair of load balancers that are listening for connections and either can receive packets and relay to backend servers (send heartbeats from left to right and right to left). If one stops hearing from the other guy, becomes completely in charge and continues to send packets 
	active-passive: passive will promote to active and take over other load balancer's IP address and now all traffic goes to him 

- Caching: 
	- Type: 
		- memcached: stores everything you want in RAM, stores key/value pair in cache (ex. user-id/user obj)
	- Cons: Finite because RAM is finite, run out of RAM or disk space 
	- Use garbage collection to remove expired objects 
	- Least Recently Used (LRU) eviction strategy 

- Database replication: mitigate risk that single server will go down, parent and multiple child databases are identical to each other
	- More ideal would be to have more than 1 master/parent server 
	- Pros: single point of failure
	- Cons: if one server dies if you only have 1 master/parent

- Database partitioning: Divide large tables into multiple smaller parts, making less data to scan -> reduce overall response time to read and load data for operations
	 - can balance load based on user information, for example


### Scalability (Cont.)

- Clones (horizontally scale)
	- 1st golden rule for scalability: Every server contains exactly the same codebase and does not store any user-related data, like sessions or profile pictures, on local disc or memory 
		- Sessions need to be stored in a centralized data store which is accessible to all your app servers (e.g. Redis, external database)

- Database
	- Path 1: master-slave replication (read from slaves, write to master) 
		- upgrade master server by adding RAM
		- data sharding
		- more expensive and time consuming

	- Path 2: Denormalize and include no mroe Joins in any database query.
		- Joins are done in application code 
		- Database requests will get slower and slower 
		- Will need cache

- Cache
	- Memcached, Redis
	- simple key-value store 
	- reside as a buffering layer between your application and data storage
	- lightning-fast bc it holds every dataset in RAM 

	- Pattern 1: Cached Database Queries
		- most common 
		- when you do a query to your database, you store the result dataset in cache
		- hashed version of query is cache key 
		- Cons: expiration, hard to delete a cached result when you cache a complex query 

	- Pattern 2: Cached Objects 
		- preferable 
		- let class assemble a dataset from your database and store complete instance of the class or the assembled dataset in the cache 

		- Ideas of objects to cache: 	
			- user sessions (never use the database) 
			- fully rendered blog articles
			- activity streams
			- user <=> friend relationships 

- Asynchronism
	- Async #1:
		- doing the time-consuming work in advance and serving the finished work with a low request time 
		- turn dynamic content into static content (e.g. Website pages are prerendered and locally stored as static HTML files on every change)
	- Async #2: 
		- Have a queue of tasks or jobs that a worker can process 
		- RabbitMQ

### Performance vs. Scalability 

Performance: if you have a performance problem, your system is slow for a single user. 
Scalability: if you have a scalability problem, your system is fast for a single user but slow under heavy load. 

### Latency vs. Throughput

Latency: time to perform some action or to produce some result (e.g. 8 hours)
Throughput: number of such actions or results per unit of time (e.g. 5 cars/hour)

- Aim for maximal throughput with acceptable latency 

### Availability vs. Consistency

In a distributed computer system, you can only support 2 of the following guarantees:

- Consistency - Every read receives the most recent write or an error
- Availability - Every request receives a response, without guarantee that it contains the most recent version of the information
- Partition Tolerance - The system continues to operate despite arbitrary partitioning due to network failures 

#### CP - consistency and partition tolerance

Waiting for a response from the partitioned node might result in a timeout error. CP is a good choice if your business needs require atomic reads and writes.

#### AP - availability and partition tolerance

Responses return the most recent version of the data available on a node, which might not be the latest. Writes might take some time to propagate when tehe partition is resolved. 
AP is a good choice if the business needs allow for eventual consistency or when the system needs to continue working despite external errors. 

### Consistency Patterns

#### Weak Consistency

After a write, reads may or may not see it. This approach is seen in systems such as memcached. 

Weak consistency works well in real time use cases such as VoIP, video chat, and realtime multiplayer games. For example, if you are on a phone call and lose reception for a few seconds, when you regain connection you do not hear what was spoken during connection loss. 

#### Eventual Consistency

After a write, reads will eventually see it (typically within ms). Data is replicated asynchronously. 

This approach is seen in systems such as DNS and email. Eventual consistency works well in highly available systems. 

#### Strong Consistency

After a write, reads will see it. Data is replicated synchronously. 

This approach is seen in file systems and RDBMSes. Strong consistency works well in systems that need transactions. 

### Availability Patterns

There are 2 main patterns that support high availability. 

#### Fail-over

##### Active-passive

Heartbeats are set between the active and the passive server on standby. If the heartbeat is interrupted, the passive server takes over the active's IP address and resumes service. 

The length of downtime is determined by whether the passive server is already running in 'hot' standby or whether it needs to start up from 'cold' standby. Only the active server handles traffic. 

##### Active-active

Both servers are managing traffic, spreading the load between them. 

If the servers are public-facing, the DNS would need to know about the public IPs of both servers. If the servers are internal-facing, application logic would need to know about both servers. 

#### Disadvantage(s): failover
- Fail-over adds more hardware and additional complexity
- There is a potential for loss of data if the active system fails before any newly written data can be replicated to the passive. 

### Availability in numbers

Availability is often quantified by uptime (or downtime) as a percentage of time the service is available. Availability is generally measured in number of 9s -- a service with 99.99% availability is described as having four 9s. 

#### 99.9% availabilty - three 9s 

| Duration   	| Acceptable downtime | 
| ------------- |:-------------:|  
| Downtime per year          | 8hr 45min 57s			 | 
| Downtime per month | 43m 49.7s   |  
| Downtime per week      | 10m 4.8s     |   
| Downtime per day          | 1m 26.4s    |   

#### 99.99% availabilty - four 9s 

| Duration   	| Acceptable downtime | 
| ------------- |:-------------:|  
| Downtime per year          | 52min 35.7s			 | 
| Downtime per month | 4m 23s   |  
| Downtime per week      | 1m 5s    |   
| Downtime per day          | 8.6s   | 


### Domain Name System 

Domain Name System(DNS) translates a domain name such as google.com to an IP address.

DNS is hierarchical, with a few authoritative servers at the top level. Your router or ISP provides information about which DNS server(s) to contact when doing a lookup. Lower level DNS servers cache mappings. DNS results can also be cached by your browser or OS for a certain period of time, determined by the time to live (TTL).

Services such as CloudFlare and Route 53 provide managed DNS services. Some DNS services can route traffic through various methods
- Weighted round robin
	- prevent traffic from going to servers under maintenance
	- balance between varying cluster sizes
	- A/B testing
- Latency-based
- Geolocation-based 

### Disadvantage(s): DNS

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/DNS.jpeg)

- Accessing a DNS server introduces a slight delay, although mitigated by caching
- DNS server management could be complex and is generally managed by governments, ISPs, and large companies
- DNS services have recently come under DDoS attack, preventing users from accessing websites such as Twitter without knowing Twitter's IP address(es)

### Content Delivery Network

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/CDN.jpeg)

A content delivery network (CDN) is a globally distributed network of proxy servers, serving content from locations closer to the user. Generally, static files such as HTML/CSS/JS, photos, and videos are served from CDN, although some CDNs such as Amazon's CloudFront support dynamic content. The site's DNS resolution will tell clients which server to contact. 

Serving content from CDNs can significantly improve performance in 2 ways: 
1. Users receive content at data centers close to them
2. Your servers do not have to serve requests that the CDN fulfills 

#### Push CDNs

Push CDNs receive new content whenever changes occur on your server. You take full responsibility for providing content, uploading directly to the CDN and rewriting URLs to point to the CDN. You can configure when content expires and when it is updated. Content is uploaded only when it is new or changed, minimizing traffic, but maximizing storage. 

Sites with a small amount of traffic or sites with content that isn't often updated work well with push CDNs. Content is placed on the CDNs once, instead of being re-pulled at regular intervals. 

#### Pull CDNs

Pull CDNs grab new content from your server when the first user requests the content. You leave the content on your server and rewrite URLs to point to the CDN. This results in a slower request until the content is cached on the CDN. 

A time-to-live (TTL) determines how long content is cached. Pull CDNs minimize storage space on the CDN, but can create redundant traffic if files expire and are pulled before they have actually changed. 

Sites with heavy traffic work well with pull CDNs, as traffic is spread out more evenly with only recently-requested content remaining on the CDN. 

### Disadvantages(s): CDN
- CDN costs could be significant depending on traffic, although this should be weighed with additional costs you would incur not using a CDN
- Content might be stale if it is updated before the TTL expires it 
- CDNs require changing URLs for static content to point to the CDN


### Load Balancer

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/load%20balancer.png)

Load balancers distribute incoming client requests to computing resources such as application servers and databases. In each case, the load balancer returns the response from the computing resource to the appropriate client. Load balancers are effective at: 
- Preventing requests from going to unhealthy servers
- Preventing overloading resources
- Helping eliminate single points of failure

Loand balancers can be implemented with hardware (expensive) or with software such as HAProxy or Nginx. 

Additional benefits include: 
- SSL termination - Decrypt incoming requests and encrypt server responses so backend servers do not have to perform these potentially expensive operations 
	- Removes the need to install X.509 certificates on each server
- Session persistence - Issue cookies and route a specific client's requests to same instance if the web apps do not keep track of sessions 

To protect against faliures, it's common to set up multiple load balancers, either in active-passive or active-active mode. 

Load balancers can route traffic based on various metrics, including: 
- Random
- Least loaded
- Session/cookies
- Round robin or weighted round robin
- Layer 4
- Layer 7 

#### Layer 4 load balancing

Layer 4 load balancers look at info at the transport layer to decide how to distribute requests. Generally, this involves the source, destination IP addresses, and ports in the header, but not the contents of the packet. Layer 4 load balancers forward network packets to and from the upstream server, performing Network Address Translation (NAT). 

#### Layer 7 load balancing

Layer 7 load balancers look at the application layer to decide how to distribute requests. This can involve contents of headers, message, and cookies. Layer 7 load balancers terminate network traffic, reads the message, makes a load-balancing decision, then opens a connection to the selected server. For example, a layer 7 load balancer can direct video traffic to servers that host videos while directing more sensitive user billing traffic to security-hardened servers. 

At the cost of flexibility, layer 4 load balancing requires less time and computing resources than Layer 7, although the performance impact can be minimal on modoern commodity hardware. 

#### Horizontal Scaling

Load balancers can also help with horizontal scaling, improving performance and availability. Scaling out using commodity machines is more cost efficient and results in higher availability than scaling up a single server on more expensive hardware, called Vertical Scaling. It is also easier to hire for talent working on commodity hardware than it is for specialized enterprise systems.

##### Disadvantage(s): horizontal scaling
- Scaling horizontally introduces complexity and involves cloning servers
	- Servers should be stateless: they should not contain any user-related data like sesions or profile pictures
	- Sessions can be stored in a centralized data store such as a database (SQL, NoSQL) or persistent cache (Redis, Memcached)
- Downstream servers such as caches and databases need to handle more simultaneous connections as upstream servers scale out 

#### Disadvantage(s): load balancer
- The load balancer can become a performance bottleneck if it does not have enough resources or if it is not configured properly
- Introducing a load balancer to help eliminate single points of failure results in increased complexity
- A single load balancer is a single point of failure, configuring multiple load balancers further increases complexity 

### Reverse proxy (web server)

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/proxy.png)

A reverse proxy is a web server that centralizes internal services and provides unified interfaces to the public. Requests from clients are forwarded to a server that can fulfill it before the reverse proxy returns the server's response to the client. 

Additional benefits include: 
- Increased security - Hide information about backend servers, blacklist IPs, limit number of connections per client 
- Increased scalability and flexibiilty - Clients only see the reverse proxy's IP, allowing you to scale servers or change their configuration 
- SSL termination - Decrypt incoming requests and encrypt server responses so backend servers do not have to perform these potentially expensive operations
	- Removes the need to install X.509 certificates on each server
- Compression - Compress server responses
- Caching - Return the response for cached reqeusts
- Static content - Serve static content directly
	- HTML/CSS/JS
	- Photos
	- Videos

#### Load balancer vs. Reverse Proxy
- Deploying a load balancer is useful when you have multiple servers. Often, load balancers route traffic to a set of servers serving the same function.
- Reverse proxies can be useful even with just one web server or application server, opening up the benefits in previous section
- Solutions such as NGINX and HAProxy can support both layer 7 reverse proxying and load balancing. 

#### Disadvantage(s): reverse proxy
- Introducing a reverse proxy results in increased complexity
- A single reverse proxy is a single point of failure, configuring multiple reverse proxies (i.e. failover) further increases complexity.  


### Application Layer

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/applayer.png)

Separating out the web layer from the application layer (also known as platform layer) allows you to scale and configure both layers independently. Adding a new API results in adding application servers without necessarily adding additional web servers. The single responsibility principle advocates for small and autonomous services that work together. Small teams with small services can plan more aggressively for rapid growth. 

#### Microservices

Microservices are a suite of independently deployable, small, modular services. Each service runs a unique process and communicates through a well-defined, lightweight mechanism to serve a business goal. 

#### Disadvantage(s): application layer
- Adding an application layer with loosely coupled services requires a different approach from an architectural, operations, and process viewpoint (vs a monolithic system)
- Microservices can add complexity in terms of deployments and operations 

### Database

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/database.png
)

#### Relational database management system (RDBMS)
A relational detabase like SQL is a collection of data items organized in tables. 

ACID is a set of properties of relational database transactions. 
- Atomicity - Each transition is all or nothing 
- Consistency - Any transaction will bring the database from one valid state to another 
- Isolation - Executing transactions concurrently has the same results as if the transactions were executed serially 
- Durability - Once a transaction has been committed, it will remain so 

There are many techniques to scale a relationahip database: master-slave replication, master-master replication, federation, sharding, denormalization, and SQL tuning. 

##### Master-slave replication

The master serves reads and writes, replicating writes to one or more slaves, which serve only reads. Slaves can also replicate to additioanl slaves in tree-like fashion. If the master goes offline, the system can continue to operate in read-only mode until a slave is promoted to a master or a new master is provisioned. 

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/masterslave.png
)

###### Disadvantage(s): master-slave replication
- Additional logic is needed to promote a slave to a master

##### Master-master replication

Both masters serve reads and writes and coordinate with each other on writes. If either master goes down, the system can continue to operate with both reads and writes. 

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/mastermaster.png
)

###### Disadvantage(s): master-master replication
- You'll need a load balancer or you'll need to make changes to your application logic to determine where to write 
- Most master-master systems are either loosely consistent (violating ACID) or have increased write latency due to synchronization
- Conflict resolution comes more into play as more write nodes are added and as latency increases 

###### Disadvantage(s): replication
- There is a potential for loss of data if the master fails before any newly written data can be replicated to other nodes
- Writes are replayed to the read replicas. If there are a lot of writes, the read replicas can get bogged down with replaying writes and can't do as many reads 
- The more read slaves, the more you have to replicate, which leads to greater replication lag
- On some systems, writing to the master can spawn multiple threads to write in parallel, whereas read replicas only support writing sequentially with a single thread 
- Replication adds more hardware and additional complexity 

#### Federation

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/federation.png
)

Federation (or functional partitioning) splits up databases by function. For example, instead of a single, monolithic databsae, you could have three databases: forums, users, and products, resulting in less read and write traffic to each database and therefore less replication lag. Smaller databases result in more data that can fit in memory, which in turn results in more cache hits due to improved cache locality. With no single central master serializing writes, you can write in parallel, increasing throughput. 

##### Disadvantage(s): federation
- Federation is not effective if your schema requires huge functions or tables
- You'll need to update your application logic to determine which database to read and write. 
- Joining data from two databases is more complex with a server link
- Federation adds more hardware and additional complexity 

#### Sharding

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/sharding.png
)

Sharding distributes data across different databases such that each database can only manage a subset of the data. Taking a users database as an example, as the number of users increases, more shards are added to the cluster. 

Similar to the advantages of federation, sharding results in less read and write traffic, less replication, and more cache hits. Index size is also reduced, which generally improves performance with faster queries. If one shard goes down, the other shards are still operational, although you'll want ot add some form of replication to avoid data loss. Like federation, there is no single central master serializing writes, allowing you to write in parallel with increased throughput. 

Common ways to shard a table of users is either through the user's last name initial or the user's geographic location

###### Disadvantage(s): sharding
- You'll need to update your application logic to work with shards, which could result in complex SQL queries 
- Data distribution can become lopsided in a shard. For example, a set of power users on a shard could result in increased load to that shard compared to others. 
	- Rebalancing adds additional complexity. A sharding function based on consistent hasing can reduce the amount of transferred data. 
- Joining data from multiple shards is more complex
- Sharding adds more hardware and additional complexity 

#### Denormalization

Denormalization attempts to improve read performance at the expense of some write performance. Redundant copies of the data are written in multiple tables to avoid expensive joins. Some RDBMS such as PostgreSQL support materialized views which handle the work of storing redudant information and keeping redudant copies consistent. 

Once data becomes distributed with techniques such as federation and sharding, managing joins across data centers further increases complexity. Denormalization might circumvent the need for such complex jions.

In most systems, reads can heavily outnumber writes 100:1 or even 1000:1. A read resulting in a complex database join can be very expensive, spending a significant amount of time on disk operations. 

##### Disadvantage(s): denormalization
- Data is duplicated 
- Constraints can help redudant copies of information stay in sync, which increases complexity of the database design
- A denormalized database under heavy write load might perform worse than its normalized counterpart 

#### SQL tuning

It's important to benchmark and profile to simulate and uncover bottlenecks.

- Benchmark - Simulate high-load situations with tools such as ab. 
- Profile - Enable tools such as the slow query log to help track performance issues. 

Benchmarking and profiling might point you to the following optimizations. 

###### Tighten up the schema
- MySQL dumps to disk in contiguous blocks for fast access. 
- Use CHAR instead of VARCHAR for fixed-length fields
	- CHAR effectively allows for fast, random access, whereas with VARCHAR, you must find the end of a string before moving onto the next one. 
- Use TEXT for large blocks of text such as blog posts. TEXT also allows for boolean searches. Using a TEXT field results in storing a pointer on disk that is used to locate the text block.
- Use INT for larger numbers up to 2^32 or 4 billion.
- Use DECIMAL for currency to avoid floating point representation errors. 
- VARCHAR(255) is the largest number of characters that can be counted in an 8 bit number, often maximizing teh use of a byte in some RDBMS. 
- Set the NOT NULL constraint where applicable to improve search performance

###### Use good indices
- Columns that you are querying (SELECT, GROUP BY, ORDER BY, JOIN) could be faster with indices
- Indices are usually represented as self-balancing B-tree that keeps data sorted and allows searches, sequential access, insertions, and deletions in logarithmic time
- Placing an index can keep the data in memory, requiring more space
- Writes could also be slower since the index also needs to be updated 
- When loading large amounts of data, it might be faster to disable indices, load the data, and then rebuild the indices 

###### Avoid expensive joins 
- Denormalize where performance demands it 

###### Partition tables
- Break up a table by putting hot spots in a separate table to help keep it in memory 

###### Tune the query cache
- In some cases, the query cache could lead to performance issues 


### NoSQL

NoSQL is a collection of data items represented in a key-value store, document store, wide column store, or a graph database. Data is denormalized, and joins are generally done in the application code. Most NoSQL stores lack true ACID transactions and favor eventual consistency.

BASE is often used to describe the properties of NoSQL databases. BASE chooses availability over consistency. 
- Basically available - the system guarantees availability
- Soft state - the state of the system may change over time, even without input 
- Eventual consistency- the system will become consistent over a period of time, given that the system doesn't receive input during that period 

#### Key-value store

A key-value store generally allows for O(1) reads and writes and is often backed by memory or SSD. Data stores can maintain keys in lexicographic order, allowing efficient retrieval of key ranges. Key-value stores can allow for storing metadata with a value. 

Key-value stores provide high performance and are often used for simple data models or for rapidly-changing data, such as in-memory cache layer. Since they offer a limited set of operations, complexity is shifted to the application layer if additional operations are needed. 

A key-value store is the basis for more complex systems such as a document store, and in some cases, a graph database. 

#### Document store

A document store is centered around documents (XML, JSON, binary, etc), where a document stores all information for a given object. Document stores provide APIs or a query language to query based on the internal structure of the document itself. Note, many key-value stores include features for working with a value's metadata, blurring the lines between these two storage types. 

Based on the underlying implementation, documents are organized by collections,t ags, metadata, or directories. Although documents can be organized or grouped together, documents may have fields that are completely different from each other. 

Some document stores like MongoDB also provide a SQL-like language to perform complex queries. 

Document stores provide high flexibility and are often used for working with occasionally changing data. 

#### Wide column store

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/columnstore.png
)

A wide column store's basic unit of data is a column (name/value pair). A column can be grouped in column families (analogous to a SQL table). Super column families further group column families. You can access each column independently with a row key, and columns with the asme row key form a row. Each value contains a timestamp for versioning and for conflict resolution. 

Cassandra from Facebook. Stores like Cassandra maintain keys in lexicographic order, allowing efficient retrieval from selective key ranges. 

Wide column stores offer high availability and high scalability. They are often used for very large data sets. 

### SQL or NoSQL

![alt text](https://github.com/wendy-wm-wu/leetcode/blob/master/sqlvsnosql.png
)


