// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract Funding {
    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;

    constructor(){
        owner=payable(msg.sender); }
    
    function fundMe(string memory name ,string memory message) public payable{
       require(msg.value > 0 ,"please pay valid ETH ");
       owner.transfer(msg.value);
       memos.push(Memo(name, message , block.timestamp , msg.sender)); 
    }

    function getMemos()public view returns(Memo[] memory){
        return memos;
    }
}