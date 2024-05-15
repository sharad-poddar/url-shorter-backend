import express from 'express';
import dotenv from 'dotenv';
import { URLS } from './models/Schmeas'
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());


server.get('/:id', async(req, res)=>{
    const id = req.params.id;
    const originalLink = await URLS.findOne({
        id: id
    })
    res.redirect(originalLink?.url || "");
})

server.post('/', async(req, res)=>{
    const body = req.body;
    const uniqueId = uuidv4();
   
    const createdUrl = await URLS.create({
        id: uniqueId,
        url: body.url
    });
    await createdUrl.save();

    const newUrl = req.protocol + '://' + req.get('host') + '/' + uniqueId;
    res.json(newUrl);
})

const PORT = process.env.PORT || 8080
server.listen(PORT ,()=>{
    console.log('server runs at: ',PORT);
})
