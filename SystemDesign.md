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

- Accessing a DNS server introduces a slight delay, although mitigated by caching
- DNS server management could be complex and is generally managed by governments, ISPs, and large companies
- DNS services have recently come under DDoS attack, preventing users from accessing websites such as Twitter without knowing Twitter's IP address(es)

### Content Delivery Network

A content delivery network (CDN) is a globally distributed network of proxy servers, serving content from locations closer to the user. Generally, static files such as HTML/CSS/JS, photos, and videos are served from CDN, although some CDNs such as Amazon's CloudFront support dynamic content. The site's DNS resolution will tell clients which server to contact. 

Serving content from CDNs can significantly improve performance in 2 ways: 
1. Users receive content at data centers close to them
2. Your servers do not have to serve requests that the CDN fulfills 









