# Assignment 3 : COL733 
---
### Disk Virtualisation

***Group 20***

Authors | Kabir Chhabra| Vaibhav Bhagee| Ankush Phulia  | Rachit Arora
---|---|---|---|---
**Entry No.**| 2013CS50287| 2014CS50297 | 2014CS50279 | 2014CS50292
---

## Design

### 3.1 Consolidation and Partitioning

* Consolidating disks A and B is achieved by storing their free lists of blocks other than the block array itself.
* This object representing the consolidated disk created using A and B also stores all the virtual disk id to object mappings created.
* Each of these virtual disks that are created are maintained using an object that stores a dictionary mapping each of the virtual block numbers to the actual underlying disk id (A/B) and the disk block containing the data.
* Additionally the virtual disk object also stores allocList which is a list of all the memory regions across the physical disks allocated to this virtual disk as blocks. This is achieved using the tuple (physical_disk_id, (start, size)) where start is the start block no. of the allocated region in the physical disk and size is the number of contiguous blocks in the allocated region.

--- 

### 3.2 Replication
* We maintain a replication factor of 2 by storing an additional secondary block copy in the block map in the event of read errors.
* We therefore have 2 copies for each chunk of data stored in two maps.
* In the event of a read error, the allocated block memory is freed from the virtual disk allocation list. The secondary replica becomes the primary, it is used to retrieve the data and then create a new replica to maintain the replication factor 2.
* Inspite of the double metadata storage requirement of this approach it is suited for its speed and seamless recovery capability especially the failure rate is very high.

---

### 3.3 Snapshot and Rollback
* Snapshot and rollback could be implemented using two different approaches. One way was to create a copy of the disk state of all the memory and store it at every snapshot. 
* A more interesting alternate was to store the state as the sequence of commands (events) that lead to it. This is much like a log that can be used to reproduce a state. 
* Therefore snapshot is lightweight and only stores the index of the last command in the required state.
* Additionally, rollback is achieved by performing this sequence of commands on freed memory.
* These snapshots are simply stored as a list of indices of the last commands executed before the corresponding snapshots were created.

---

### 3.4 APIs

A high level overview of the API implementations.

#### 3.4.1 createDisk
This function tries to allocates an unfragmented chunk of memory present leftmost in A or B to a new virtual disk to keep fragmentation to a minimum.  
If no continuous chunk of memory of required size  is available in either A or B, the function resorts to allocating blocks in bits and pieces over A and B.
#### 3.4.2 deleteDisk
To delete a virtual disk, the function looks at its list of allocated intervals of blocks, and frees those physical blocks (regions) by adding them back to the consolidated disk free list.This is achieved using a smart combination of interval sorting and merging.  
The virtual disk id to object mapping is then removed from the consolidated disk metadata.
#### 3.4.3 readFromDisk
Read is very simple in its base case where all that need to be accessed is the mapping from the virtual block no. of a virtual disk to the real block no. and its physical disk id.  
The function becomes more interesting if their is a read error. In such a circumstance as discussed  in **3.2**, the secondary replica is utilized to retrieve data and reinstate a new primary replica to maintain robustness.
The corrupted block of memory is eliminated from the allocated region (mapping) of the virtual disk memory.
#### 3.4.4 writeToDisk
The function functions simply goes to the right block no of the referred virtual disk, accesses the mapping to physical blocks and write the data there.  
In order to maintain identical replicas, a helper writing function also ensures that the secondary replica is also corresponding modified.
#### 3.4.5 snapShot
As discussed earlier in **3.3** snapShot simply stores the index of the last issued command no. before snapshot.
#### 3.4.6 rollBack
Rollback accesses the command list (history) and calls them till the point dictated by the referred snapshot.
