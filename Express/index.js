// import express from 'express'
// import fs from 'fs'
// import path from 'path';

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

const dirPath = path.join('E:/GUVI/NodeJs-Express/NodeJs-Day2/Express')

// To create a text file with current timestamp
app.get('/write-file',(req, res)=>{
    const date = new Date()
    let currentTimeStamp = date.toISOString().replace(/:/g,'-');
    let filename = `${currentTimeStamp}.txt`;
    let filepath = path.join(dirPath, filename)

    try {
        fs.writeFileSync(filepath, currentTimeStamp, 'utf-8')
        console.log("Write File successful")
        res.send("Write File Successful")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error occured while writing the file")
    }
})

//To retrieve all the text files in the directory
app.get('/list-files', (req, res)=>{
    let txt_files = []
    try {
        let files = fs.readdirSync(dirPath)
        files.forEach((f)=>{
            if(path.extname(f)==='.txt'){
                txt_files.push(f)
            }
        })
        console.log(txt_files)
        res.send(txt_files)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error Occured")   
    }
})


app.listen(port,()=>console.log(`Server is listening port ${port}`))
