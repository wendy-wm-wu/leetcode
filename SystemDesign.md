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





