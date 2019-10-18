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

- Database partitioning