import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fs from 'fs';
import * as path from 'path';
const ipc      = require('electron').ipcRenderer;
@Component({
  selector: 'app-readwrite',
  templateUrl: './readwrite.component.html',
  styleUrls: ['./readwrite.component.scss']
})
export class ReadWriteComponent implements OnInit {
  
  constructor() { }
  ngOnInit (){
    // const result = fs.readFileSync('src\\app\\readwritefile\\read.txt', {encoding: 'utf-8'});
    // console.log(result);
    // fs.readFile('/read.txt', (err, data) => {
    //   if (err) {throw err;}

    //   console.log(data);
    // });
    let syncBtn  = document.querySelector('#syncBtn');
    let asyncBtn = document.querySelector('#asyncBtn');
    
    let replyDiv = document.querySelector('#reply');
    
    syncBtn.addEventListener('click', () => {
     let
     reply = ipc.sendSync('synMessage','A sync message to main');
     replyDiv.innerHTML = reply;
    });
    
    asyncBtn.addEventListener('click', () => {
     ipc.send('aSynMessage','A async message to main')
    });
    
    ipc.on('asynReply', (event, args) => {
     replyDiv.innerHTML = args;
    });
    

  }

}
