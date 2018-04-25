# HDFS and GFS 
<center>
**Cloud Computing Technology Fundamentals** 

Ankush Phulia | 2014CS50279
---|---

</center>

### Hadoop Distributed File System (HDFS)
* Hadoop Distributed File System follows a master-slave design, much like GFS, in which it has a central "NameNode", containing the image of the entire file system(FsImage), i.e. the metadata, and "DataNodes"(corresponding to chunk servers), which store the data. 

* Each file is split into blocks, and these blocks are stored on data nodes. The blockmap, a look-up table stored on NameNode, maps full file path to blocks

* A replication factor associated with each file dictates how many redundant copies of it are required to be stored. All nodes are usually not connected in a flat pattern, but form interconnected "racks', interconnected via switches.

* The NameNode executes all metadata actions like "moving", "renaming" files, whereas the read/write requests to data are served to the clients by the DataNodes. Memory model used is write-once-read-many, which simplifies implementation.


* **Fault Tolerance** : 
	* If a block is not accessible for reasons like data corruption, network failure or DataNode failure, copies of it can be retrieved from a different DataNode.
	* Further, additional copies are created till the redundancy corresponds to the replication factor. In case data on the NameNode is lost, filesystem metadata can be recovered from the redundant copies on the NameNode itself.
	* However, if the NameNode machine istself is stops functioning, manual intervention may be needed.

### Google File System (GFS)
* The Google File System is a distributed, fault-tolerant file system. It has a main "NameNode", which stores the metadata of the files in the form of a look-up table, mapping the full path names of files to the meta data. It does not have a "per-directory" metadata structure. 

* The files are split into “chunks”, stored and replicated to “chunk servers”. Each file has an associated "replication" factor which decides how many copies of it should be present at any time in the file system, which is 3 by default. 

* The filesystem allows caching of metadata at clients, but not the actual data.  The NameNode handles metadata requests, while the chunk servers deal with the data ones. It is meant for resource-intensive reading/streaming tasks on huge amounts of data with scarce writes, and that too mostly appends on files.

* ***Fault Tolerance*** : 
  	* A chunk failure at any point of time can not bring down its data chunks, because for all the chunks contained in the server, there are alternate replicas available in the nework, whose location is contained in the metadata.
  	* Whenever the number of copies of a file(or chunk) become less than the replication factor, new ones are created and placed strategically in the network.
  	* The metadata itself is made tolerant to NameNode faults using "shadow servers", that keep a replica of the file system metadata and keep updating their own copies.

### HDFS vs GFS


<center>

| Feature     |                                     GFS                                     |                                     HDFS                               |
|-------------|:--------------------------------------------------------------------------------:|:-----------------------------------------------------------:|
| Availabilty |                 File system exclusive to Google, proprietary                |                  Supports third-party file systems, public                  |
| Hierarchy   |                       Master server and Chunk servers                       |                   Master "NameNodes" and Slave "DataNodes"                  |
| Recovery    | Metadata secured using shadow servers,  but can't modify it before recovery | Metadata has multiple copies, but needs  intervention if NameNode goes down (as per paper) |
| Data Flow     |                      Leases at primary replica for a limited amount of time                      |                     No leases, client decides where to write, exposing block locations                     |
| Consistency |                            Append-once-Read-many                            |                             Write-once-Read-many                            |
| Network     |                      TCP connections for data transfer                      |                     RCP based protocol on top of TCP/IP                     |

</center>


### Sources Used
* [The Google File System](https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf) by S. Ghemawat, H. Gobioff, and Shun-Tak Leung.
* HDFS Class Notes


