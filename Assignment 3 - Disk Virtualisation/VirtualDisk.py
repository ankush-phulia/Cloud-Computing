# import numpy as np
from random import randrange
import copy

class BlockInfo(object):
    def __init__(self, data):
        self.allocated = False
        self.data = data
        

class Disk(object):
    def __init__(self, ident, allocList, size):

        # ID of the disk
        self.id = ident 

        # Size of the disk
        self.size = size

        # Block mapping: BlockID to two tuple of (physicalDiskID, BlockNumber)
        self.blockMap = {}

        # List of allocated block range from the physical disk, tuple of (physcialDiskID, (start, size))
        self.allocList = copy.deepcopy(allocList)

        self.numBlocks = 0

        # List of command numbers at which check-pointing is done
        self.Commands = []  # List of commands

        self.commandNo = 0

        self.snapShot = []

    def calc_index_alloc(self, numBlock):
        #assuming numblocks start from 1 but "start" starts from 0
        ##double check
        temp = numBlock -1
        if (numBlock > self.size):
            raise Exception("Size of disk exceeded")
        else :
            index = 0
            for i in xrange(len(self.allocList)):
                if (self.allocList[i][1][1] > temp):
                    return self.allocList[i][1][0] + temp, self.allocList[i][0]
                else:
                    temp = temp - self.allocList[i][1][1]


    def remove_alloc(self, physicalBlockNo, physicalDiskID):
        for i in xrange(len(self.allocList)):
            if (self.allocList[i][0] == physicalDiskID):
                start = self.allocList[i][1][0]
                end = start + self.allocList[i][1][1]
                if ((physicalBlockNo >= start) and (physicalBlockNo < end)):
                    if (physicalBlockNo == start):
                        if (start+1<end):
                            self.allocList[i][1][0] = self.allocList[i][1][0] +1
                            self.allocList[i][1][1] = self.allocList[i][1][1] -1
                        else :
                            #!! remove this element from list
                            del self.allocList[i]
                    elif (physicalBlockNo == end-1):
                        self.allocList[i][1][1] = self.allocList[i][1][1] -1
                    else :
                        self.allocList[i][1][1] = physicalBlockNo - start
                        ## Triple check this
                        new_elem = [physicalDiskID,(physicalBlockNo+1,end - physicalBlockNo-1)]
                        self.allocList.insert(i+1,new_elem)
                    break





class Command(object):
    def __init__(self, type, args):
        self.type = type
        self.args = args
        
        
class VirtualDisk(object):
    def __init__(self, Asize=200, Bsize=300):
        self.A = [BlockInfo(None) for i in xrange(Asize)]
        self.B = [BlockInfo(None) for i in xrange(Bsize)]

        self.phyMap = {"A" : self.A , "B" : self.B}

        self.freeBlockRangeA = [[0,Asize-1]]
        self.freeBlockRangeB = [[0,Bsize-1]]

        self.repFactor = 2

        self.availableSize = Asize + Bsize

        self.Disks = {}  # Disk Id to disk object

        self.funMap = {
            "createDisk" : lambda x: self.createDisk(**x),
            "deleteDisk" : lambda x: self.deleteDisk(**x),
            "readFromDisk" : lambda x: self.readFromDisk(**x),
            "writeToDisk" : lambda x: self.writeToDisk(**x),
            "snapShot" : lambda x: self.snapShot(**x),
            "rollBack" : lambda x: self.rollBack(**x)
        }

         


    def createDisk(self,diskId, size):
        '''
        Allocate 'size' blocks to new disk with ID diskId
        '''

        # Check if disk can be created in the first itself
        if self.availableSize < size:
            raise Exception("Disk {} with size {} cannot be created".format(diskId, size))

        # check for contiguous space in disk A
        for i in xrange(len(self.freeBlockRangeA)):
            if self.freeBlockRangeA[i][1] - self.freeBlockRangeA[i][0] + 1 >= size:

                # Store id: (Physical Disk, (Start, size)) mapping
                allocBlockList = [("A",(self.freeBlockRangeA[i][0], size))]

                self.Disks[diskId] = Disk(diskId, allocBlockList, size)

                self.freeBlockRangeA[i][0] += size

                if self.freeBlockRangeA[i][0] > self.freeBlockRangeA[i][1]:
                    self.freeBlockRangeA = self.freeBlockRangeA[1:]

                self.availableSize -= size

                return True

        # check for contiguous space in disk B
        for i in xrange(len(self.freeBlockRangeB)):
            if self.freeBlockRangeB[i][1] - self.freeBlockRangeB[i][0] + 1 >= size:

                # Store id: (Physical Disk, (Start, size)) mapping
                allocBlockList = [("B",(self.freeBlockRangeB[i][0], size))]

                self.Disks[diskId] = Disk(diskId, allocBlockList, size)

                self.freeBlockRangeB[i][0] += size

                if self.freeBlockRangeB[i][0] > self.freeBlockRangeB[i][1]:
                    self.freeBlockRangeB = self.freeBlockRangeB[1:]

                self.availableSize -= size

                return True        
        
        # Checking for fragmented space in A and B
        diskSize = size
        allocBlockList = []

        for i in xrange(len(self.freeBlockRangeA)):
            if diskSize == 0:
                break

            if self.freeBlockRangeA[i][1] - self.freeBlockRangeA[i][0] + 1 >= diskSize:

                # Store id: (Physical Disk, (Start, size)) mapping
                allocBlockList += [("A",(self.freeBlockRangeA[0], diskSize))]

                self.freeBlockRangeA[i][0] += diskSize

                if self.freeBlockRangeA[i][0] > self.freeBlockRangeA[i][1]:
                    self.freeBlockRangeA = self.freeBlockRangeA[1:]

                diskSize = 0
            else:
                rangeSize = self.freeBlockRangeA[i][1] - self.freeBlockRangeA[i][0] + 1
                allocBlockList += [("A",(self.freeBlockRangeA[0], rangeSize))]
                self.freeBlockRangeA = self.freeBlockRangeA[1:]
                diskSize -= rangeSize

        if diskSize != 0:
            for i in xrange(len(self.freeBlockRangeB)):
                if diskSize == 0:
                    break

                if self.freeBlockRangeB[i][1] - self.freeBlockRangeB[i][0] + 1 >= diskSize:

                    # Store id: (Physical Disk, (Start, size)) mapping
                    allocBlockList += [("B",(self.freeBlockRangeB[0], diskSize))]

                    self.freeBlockRangeB[i][0] += diskSize

                    if self.freeBlockRangeB[i][0] > self.freeBlockRangeB[i][1]:
                        self.freeBlockRangeB = self.freeBlockRangeB[1:]

                    diskSize = 0
                else:
                    rangeSize = self.freeBlockRangeB[i][1] - self.freeBlockRangeB[i][0] + 1
                    allocBlockList += [("B",(self.freeBlockRangeB[0], rangeSize))]
                    self.freeBlockRangeB = self.freeBlockRangeB[1:]
                    diskSize -= rangeSize            

        self.Disks[diskId] = Disk(diskId, allocBlockList, size)
        self.availableSize -= size

        return True
        
    def addRangeToList(self, phyDiskId, bRange):
        if phyDiskId == "A":
            temp_list = []
            block_list = self.freeBlockRangeA
            if not block_list:
                temp_list = [bRange]
            elif len(block_list) == 1:
                if bRange[1] < block_list[0][0]:
                    temp_list = [bRange] + block_list
                else:
                    temp_list = block_list + [bRange]
            else:
                for i in xrange(len(block_list)):
                    temp_list += [block_list[i]]
                    if i < len(block_list)-1 and bRange[0] > block_list[i][1] and bRange[1] < block_list[i+1][0]:
                        temp_list += [bRange]

            # Merging intervals
            merge_list = [temp_list[0]]

            for interval in (temp_list[1:]):
                if merge_list[-1][1] == interval[0] - 1:
                    merge_list[-1] = [merge_list[-1][0],interval[1]]
                else:
                    merge_list += [interval]

            self.freeBlockRangeA = copy.deepcopy(merge_list)
        else:
            temp_list = []
            block_list = self.freeBlockRangeB
            if not block_list:
                temp_list = [bRange]
            elif len(block_list) == 1:
                if bRange[1] < block_list[0][0]:
                    temp_list = [bRange] + block_list
                else:
                    temp_list = block_list + [bRange]
            else:
                for i in xrange(len(block_list)):
                    temp_list += [block_list[i]]
                    if i < len(block_list)-1 and bRange[0] > block_list[i][1] and bRange[1] < block_list[i+1][0]:
                        temp_list += [bRange]

            # Merging intervals
            print temp_list
            merge_list = [temp_list[0]]

            for interval in (temp_list[1:]):
                if merge_list[-1][1] == interval[0] - 1:
                    merge_list[-1] = [merge_list[-1][0],interval[1]]
                else:
                    merge_list += [interval]

            self.freeBlockRangeB = copy.deepcopy(merge_list)

    def deleteDisk(self, diskId):
        '''
        Delete the disk with given disk ID
        '''
        if diskId not in self.Disks:
            raise Exception("Disk with disk id {} does not exist.".format(diskId))

        allocList = self.Disks[diskId].allocList

        for block in allocList:
            freeRange = [block[1][0], block[1][0] + block[1][1] - 1]
            self.addRangeToList(block[0], freeRange)

        self.Disks.pop(diskId, None)



    def readFromDisk(self, diskId, blockNo):
        '''
        Read data from block given the id and info
        '''
        curDisk = self.Disks[diskId]
        if blockNo in curDisk.blockMap:
            if (randrange(0,10) > 8):
                # print 'Block Error at ',blockNo
                physicalDiskID,physicalBlockNo = curDisk.blockMap[blockNo][1]
                curDisk.numBlocks -= 1
                curDisk.remove_alloc(physicalBlockNo,physicalDiskID)
                curDisk.blockMap[0] = curDisk.blockMap[1]
                curData = self.phyMap[physicalDiskID][physicalBlockNo].data
                newPhysicalDiskID, newPhysicalBlockNo = self.replicate(blockNo,curData,diskId)
                curDisk.blockMap[blockNo][1] = (newPhysicalBlockNo,newPhysicalDiskID)
                return curData 
            else:
                physicalDiskID,physicalBlockNo = curDisk.blockMap[blockNo][0]
                return self.phyMap[physicalDiskID][physicalBlockNo].data
        else:
            raise Exception("Physical Block not found")

    def writeToDiskhelper(self, blockNo,data,diskId,replicate):
        '''

        '''
        curDisk = self.Disks[diskId]
        if (replicate):
            numBlocks = curDisk.numBlocks
            alloc_index,physicalDiskId = curDisk.calc_index_alloc(numBlocks+1)
            self.phyMap[physicalDiskID][alloc_index].data = data
            curDisk.numBlocks += 1
            return physicalDiskID,alloc_index

        else :
            if blockNo in curDisk.blockMap:
                locations = curDisk.blockMap[blockNo]
                for i in xrange(len(locations)):
                    physicalDiskID,physicalBlockNo = locations[i]
                    self.phyMap[physicalDiskID][physicalBlockNo].data = data
            else :
                locations = []
                for i in xrange(self.repFactor):
                    numBlocks = curDisk.numBlocks
                    alloc_index,physicalDiskID = curDisk.calc_index_alloc(numBlocks+1)
                    self.phyMap[physicalDiskID][alloc_index].data = data
                    curDisk.numBlocks += 1
                    locations.append((physicalDiskID,alloc_index))
                curDisk.blockMap[blockNo] = locations





    def writeToDisk(self, diskId, blockNo, data):
        '''
        Write data to block given id and info
        '''
        # if write successful
        self.writeToDiskhelper(blockNo,data,diskId,False)

        # if write fail
        # print 'Failed writing data to {}'.format(blockNo)
        

    def replicate(self,blockNo,diskId,data):
        physicalDiskID,physicalBlockNo = self.writeToDiskhelper(blockNo,data,diskId,True)
        return physicalDiskID, physicalBlockNo



    def snapShot(self, diskId):
        self.Disks[diskId].snapShot += [(self.Disks[diskId].commandNo)]

        return len(self.Disks[diskId].snapShot)


    def rollBack(self, diskId, snapshotNo):
        '''
        
        '''

        curDisk = self.Disks[diskId]
        curDisk.blockMap = {}
        tempCommand = copy.deepcopy(curDisk.Commands[:curDisk.snapShot[snapshotNo - 1]])
        curDisk.commands = []
        curDisk.commandNo = 0
        curDisk.snapShot = curDisk.snapShot[:snapshotNo]

        for i in xrange(len(tempCommand)):
            self.CallCmd(tempCommand[i].type,diskId,tempCommand[i].args)



    def CallCmd(self, cmdType, diskId, args):

        # Do we need to check for Rollbacks?
        if cmdType not in ["createDisk", "snapShot", "rollBack"]:
            self.Disks[diskId].Commands += [Command(cmdType,args)]
            self.Disks[diskId].commandNo += 1

        if cmdType == 'createDisk':
            self.createDisk(diskId, args['size'])
        elif cmdType == 'deleteDisk':
            self.deleteDisk(diskId)
        elif cmdType == 'readFromDisk':
            return self.readFromDisk(diskId, args['blockNo'])
        elif cmdType == 'writeToDisk':
            self.writeToDisk(diskId, args['blockNo'], args['data'])
        elif cmdType == 'snapShot':
            return self.snapShot(diskId)
        elif cmdType == 'rollBack':
            self.rollBack(diskId, args['snapShotNo'])
        #self.funMap[cmdType](args)

def printState(disk):
    print '-'*80
    print 'Current Disks'
    print '-'*80
    for diskobj in disk.Disks.values():
        print 'Disk Id :', diskobj.id
        print 'Disk Size :', diskobj.size
        if diskobj.blockMap:
            print  'Disk Contents :'
            for blockid, blockdata in diskobj.blockMap.iteritems():
                print 'VA :', blockid, '   Replica 1 - PA :', blockdata[0][1], \
                '   Replica 2 - PA :', blockdata[1][1], '   Data :', disk.phyMap[blockdata[0][0]][blockdata[0][1]].data
        print ''
    print 'Free Lists : '
    print disk.freeBlockRangeA
    print disk.freeBlockRangeB
    print '-'*80
    print ''


def BasicTest():
    Disk = VirtualDisk(200, 300)
    Disk.CallCmd("createDisk", 1, {'size':100})
    Disk.CallCmd("createDisk", 2, {'size':200})
    Disk.CallCmd("writeToDisk", 1, {'blockNo':5, 'data':'Five'})
    Disk.CallCmd("writeToDisk", 2, {'blockNo':10, 'data':'Ten'})
    printState(Disk)
    # Disk.CallCmd("readFromDisk", 2, {'blockNo':5})
    print 'Read', Disk.CallCmd("readFromDisk", 2, {'blockNo':10})
    print 'Read', Disk.CallCmd("readFromDisk", 1, {'blockNo':5})
    Disk.CallCmd("writeToDisk", 1, {'blockNo':5, 'data':'Six'})
    print 'Read', Disk.CallCmd("readFromDisk", 1, {'blockNo':5})
    Disk.CallCmd('deleteDisk', 2, {})
    # Disk.CallCmd("readFromDisk", 1, {'blockNo':10})
    # Disk.CallCmd("", 2, {'size':200})
    printState(Disk)
    Disk.CallCmd('deleteDisk', 1, {})
    printState(Disk)

def SegmentationTest():
    Disk = VirtualDisk(200, 300)
    Disk.CallCmd("createDisk", 1, {'size':50})
    Disk.CallCmd("createDisk", 2, {'size':50})
    Disk.CallCmd("createDisk", 3, {'size':100})
    Disk.CallCmd("createDisk", 4, {'size':100})
    printState(Disk)
    Disk.CallCmd('deleteDisk', 1, {})
    printState(Disk)
    Disk.CallCmd('deleteDisk', 3, {})
    printState(Disk)
    Disk.CallCmd('deleteDisk', 4, {})
    printState(Disk)
    Disk.CallCmd('deleteDisk', 2, {})
    printState(Disk)


def RollBackTest():
    Disk = VirtualDisk(200, 300)
    Disk.CallCmd("createDisk", 1, {'size':100})
    Disk.CallCmd("createDisk", 2, {'size':200})
    Disk.CallCmd("writeToDisk", 1, {'blockNo':5, 'data':'Five'})
    Disk.CallCmd("writeToDisk", 2, {'blockNo':10, 'data':'Ten'})

    printState(Disk)
    # Disk.CallCmd("readFromDisk", 2, {'blockNo':5})
    print 'Read', Disk.CallCmd("readFromDisk", 2, {'blockNo':10})
    print 'Read', Disk.CallCmd("readFromDisk", 1, {'blockNo':5})

    snap = Disk.CallCmd("snapShot", 1, {})
    Disk.CallCmd("writeToDisk", 1, {'blockNo':5, 'data':'Six'})
    print 'Read', Disk.CallCmd("readFromDisk", 1, {'blockNo':5})

    snap2 = Disk.CallCmd("snapShot", 2, {})
    Disk.CallCmd("writeToDisk", 2, {'blockNo':11, 'data':'Eleven'})
    printState(Disk)

    print 'Rolling Back 2'
    Disk.CallCmd('rollBack', 2, {'snapShotNo':snap2})
    printState(Disk)
    print 'Rolling Back 1'
    Disk.CallCmd('rollBack', 1, {'snapShotNo':snap})
    printState(Disk)

    Disk.CallCmd('deleteDisk', 2, {})
    # Disk.CallCmd("readFromDisk", 1, {'blockNo':10})
    # Disk.CallCmd("", 2, {'size':200})
    Disk.CallCmd('deleteDisk', 1, {})
    printState(Disk)

if __name__ == '__main__':
    SegmentationTest()