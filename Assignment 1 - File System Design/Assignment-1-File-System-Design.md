# Assignment 1 : File System Design
_**Cloud Computing Technology Fundamentals**_  
**Group 20**

Authors | Rachit Arora| Vaibhav Bhagee| Ankush Phulia | Kabir Chhabra
---|---|---|---|---
**Entry No.**| 2014CS50292| 2014CS50297 | 2014CS50279 | 2013CS50287
  

## A. Current File Systems
#### 1. File Allocation Table (FAT)
* File Allocation Table stores files as a linked list of blocks, where the links are stored in a single table called the File Allocation Table. Each entry describes a "block" that may be made up of multiple contiguous sectors of the disk. The root directory can either be at a fixed location in the FAT or have a table in the boot sector, sector 0.  

* ***Handling Block Read Error*** : 
	* If a block of a file gets corrupted and cannot be read, the damage is proportional to the number of blocks unreadable. 
	* However, in case the block containing the file links or the boot sector becomes unreadable, the damage can lead to the whole file, folder or boot sector becoming unreadable. Thus, multiple copies of the FAT are stored to avoid losing entire files and filesystem.

#### 2. Third Extended Filesystem (EXT3)
* The space on disk is partitioned into blocks. Each file/directory corresponds to an “inode” - indexed node, which contains data about size, permission, ownership, and location on disk of the file or directory. It contains pointers to the blocks that comprise the file. 
* Implements “journaling”, i.e. keeps track of changes not yet committed to the file system's main part by recording the intentions of such changes in a data structure known as a “journal” or a log.  Changes are later flushed asynchronously; only then is the “transaction” completed and writes occur to disk.

* ***Handling Block Read Error*** : 
	  * If a data block is rendered unreadable, the data lost is exactly the data contained in that block. This can be catastrophic if the block is an inode because then there is no way to track the corrupted file/directory blocks. 
	  * ext3 lacks "modern" filesystem features, such as dynamic inode allocation and extents. This might sometimes be a disadvantage, but for recoverability, it is a significant advantage.
  	* All the file system metadata is present in fixed, well-known locations, and these data structures have some redundancy. In significant data corruption, ext2 or ext3 may be recoverable, while a tree-based file system may not.

#### 3. Google File System (GFS)
* The Google File System is a distributed, fault-tolerant file system. It has a main "NameNode", which stores the metadata of the files in the form of a look-up table, mapping the full path names of files to the meta data. It does not have a "per-directory" metadata structure. 
* The files are split into “chunks”, stored and replicated to “chunk servers”. By default, each chunk has three instances of itself stored across the chunk servers for fault tolerance. The filesystem allows caching of metadata at clients, but not the actual data. It is meant for resource-intensive reading/streaming tasks on huge amounts of data with scarce writes.

* ***Fault Tolerance*** : 
  	* A chunk failure at any point of time can not bring down its data chunks, because for all the chunks contained in the server, there are alternate replicas available in the nework, whose location is contained in the metadata.
  	* The metadata itself is made tolerant to NameNode faults using "shadow servers", that keep a replica of the file system metadata and keep updating their own copies.

#### 4. Hadoop File System (HDFS)
* Hadoop Distributed File System follows a master-slave design, much like GFS, in which it has a central "NameNode", containing the image of the entire file system(FsImage), and "DataNodes"(corresponding to chunk servers), which store the actual data. 
* Each file is split into blocks, and these blocks are stored on data nodes. The blockmap, a look-up table stored on NameNode, stores which blocks correspond to which files. A replication factor associated with each file dictates how many redundant copies of it are required to be stored.

* ***Fault Tolerance*** : 
	* If a block is not accessible for reasons like data corruption, network failure or DataNode failure, copies of it can be retrieved from a different DataNode.
	* Further, additional copies are created till the redundancy corresponds to the replication factor. In case data on the NameNode is lost, filesystem metadata can be recovered from the redundant copies on the NameNode itself.


## B. Designing a fault tolerant system
#### 1. Design : The Auxiliary Look-Up Table
* The file data is split up into blocks.

* If we have a "per-directory" structure of the metadata (like inode) , then if the block containing the inode corresponding to a directory becomes unreadable, all of the directory information is lost.
* To avoid this, we can have our meta data stored as a look-up table, call it the "Auxillary Look-Up Table", hereafter referred to as ALUT, mapping (complete) file paths to the block-pointers of that file.

* The OS has a data structure to keep record of the bases of the ALUTs.
* Two copies of this lookup table are stored, sufficiently far away from each other on the disk (one at the centre of the disk and one towards the periphery). This is to avoid the case when a contiguous segment on the disk gets damaged.
* We generate a cryptographic hash (checksum) for each of the two lookup tables in the disk on shutdowns/unmounts. These hashes can be matched on the next mount and verified to detect corruption of the blocks containing lookup tables.

* The Filesystem also implements journaling much like that of ext3, via transactions and a log file, hereafter referred to as transaction log, to keep track of changes to all data (and metadata) before they are commited to disk, allowing for crash recovery, assuming that a transaction is atomic with respect to crash causes.

#### 2. Dealing with Data Loss
* Corruption that affects normal data blocks would lead to a loss of only that given disk block leaving the rest of the file and other files unaffected. 
* This is in agreement with the principle that information loss should be in proportion to the (block) damage.

#### 3. Dealing with Metadata Loss
* Meta-data for the file-system consists of ALUT and its copies, as well as the transaction log.

* Since journaling is implemented like in ext3, we do not need to worry about keeping redundant copies for the transaction log, that is taken care of by the journaling system itself.
* In case of loss of a block containing the ALUT, assuming the probability of simultaneous corruption of both the blocks containing the the tables is sufficiently low, the base address of the ALUT(which is known to OS) is changed to point at the remaining copy (also known).

* Further, the file system chooses a live block, acquires the lock for it (with priority over user writing tasks), and copies the ALUT to it, asynchronously.

#### 4. Pros
* The system is resilient and robust to any corruption in data blocks or one of the lookup table blocks. Since both of the lookup table blocks are located far enough, we are guaranteed that affected data is always proportional to the damage and not more.
eg. Loss of a data block does not affect any other block. Even if the affected block is from a lookup table, the table can be recovered from the auxiliary copy.

* Choosing to store just two copies of the lookup table instead of more is a pragmatic decision, primarily taken due to the extreme costs of maintaining multiple copies on the disk, with its large write latencies

* The lazy/asynchronous update of the auxiliary look-up table ensures that there are minimal overheads to updating it because of the nature of the elevator update algorithm.

#### 5. Cons
* Losing blocks means that the data contained in those is lost, without chance for recovery. However, this does not render the entire file/filesystem unusable.

* Meta-data updates require multiple writes to disk - the physical location of the the meta-data structure influences the time needed for consistency in the multiple copies. This can be partially mitigated by issuing asynchronous updates to the second copy of the lookup table when the primary copy is modified.

* Choosing to store only two copies of the lookup table instead of more, also comes at some cost to reliability. However this decrease in reliability is acceptable when compared to the additional overheads associated with maintaining multiple copies (>2).

## C. Towards a completely fault tolerant system
```Addition to the previous design (B) , within reasonable confidence bounds.```  
#### 1. Design
* The design remains the same as described above (B). The only addition is that now, along with the ALUT, we also duplicate every file block.

* Care is taken to place the duplicate block far from the original. The policy followed for this is to keep the primary copies of the hash table and the files, close to the centre of the disk, whereas the auxiliary copies of the ALUT and the files are kept towards the periphery with the storage growing inwards.

#### 2. Pros
* Similar advantages as in the previous design - efficient disk writes, journaling providing reliabilty in the face of crashes, etc.

* In case of a block getting corrupted, the block data can be restored from its auxiliary block in the same way as outlined for the ALUT in the previous design.
* While we do not discount the probability of multiple points of data loss on the disk, here, the underlying assumption is that the probability of the primary block and its auxiliary copy getting corrupted at the same time is very low

#### 3. Cons
* The confidence in the reliability of this design declines when the probability of simultaneous corruption of both the copies of data/metadata becomes significant.

* The downside of this design is that the maximum size of the file system becomes half of the total available space.

## D. Sources Used
* [The Google File System](https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf) by Sanjay Ghemawat, Howard Gobioff, and Shun-Tak Leung.
* [Prof. Sorav Bansal’s Notes on Filesystem Implementation](http://www.cse.iitd.ernet.in/~sbansal/os/lec/l32.html)
* HDFS Class Notes


