// TODO: figure out how to support imports
const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, lastHash, hash, data) {
    // TODO: is the index part necessary?
    // yes the index is necessary to check additions of new blocks from multiple decentralized peers
    this.index = index;
    this.timestamp = timestamp;
    // the hash enforces the chain
    // each hash for each block is generated based off the lastHash.
    // So if you change one block, you must change all following blocks as well
    // A bad actor mess with one block individually, and pretend like everything will be fine
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Block -
      Index     : ${this.index}
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0, 10)}
      Hash      : ${this.hash.substring(0, 10)}
      Data      : ${this.data}`;
  }

  // Why static? Why not declare outside of the class?
  // Nice to be able to share functionality under the Block namespace.
  static genesis() {
    return new this(0, 'Genesis time', '-*-*-', 'first hash', 'genesis block');
  }

  static newBlock(lastBlock, data) {
    const timestamp = Date.now();
    const hash = Block.hash(timestamp, lastBlock.hash, data);

    return new this(lastBlock.index+1, timestamp, lastBlock.hash, hash, data);
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static blockHash(block) {
    return Block.hash(block.timestamp, block.lastHash, block.data);
  }
}

module.exports = Block;