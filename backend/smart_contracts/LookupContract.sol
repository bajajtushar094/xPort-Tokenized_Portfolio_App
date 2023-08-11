// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
 

contract LookupContract {

mapping (string => string) public myaccntID;
mapping (string => string) public mypubkey;

constructor (string memory _mobile, string memory _accntID, string memory _pubkey) public {
        myaccntID[_mobile] = _accntID;
        mypubkey[_accntID] = _pubkey;
    }

function setaccntID(string memory _mobile, string memory _accntID) public {
        mypubkey[_mobile] = _accntID;
    }

function setpubkey(string memory _accntID, string memory _pubkey) public {
        mypubkey[_accntID] = _pubkey;
    }

function getaccntID(string memory _mobile) public view returns (string memory) {
        return myaccntID[_mobile];
    }

function getpubkey(string memory _accntID) public view returns (string memory) {
        return mypubkey[_accntID];
    }

}