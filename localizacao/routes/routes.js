const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const {MONGO_URI} = require('../mongodb');
const Localizacao = require('../models/Localizacao');
const client = new MongoClient(MONGO_URI);


//Schema
/**
 * @swagger
 * definitions:
 *   Localizacao:
 *     type: object
 *     properties:
 *       rua:
 *         type: string
 *       supermercado:
 *         type: string
 *       farmacia: 
 *         type: string
 *       restaurante:
 *         type: string
 *       banco:
 *         type: string
 *     xml:
 *       name: Localizacao
 */

//Adicionar um novo voluntario
/**
 * @swagger
 * paths:
 *   /addLocalizacao:
 *     post:
 *       tags:
 *       - Localizacao
 *       summary: Adicionar novo localizacao
 *       operationId: postLocalizacao
 *       consumes:
 *       - application/json
 *       - application/xml
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - in: body
 *         name: body
 *         description: Adicionar um novo localizacao
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Localizacao'
 *       responses:
 *         405:
 *           description: Invalid input
 */

router.post('/addLocalizacao', async (req, res) => {
    const newLocalizacao = new Localizacao(req.body);
    try {
        const collection = await newLocalizacao.save();
        if(!collection) throw Error('Something went wrong while saving the post');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

//Atualizar os dados de uma localizacao
/**
 * @swagger
 * paths:
 *   /updateLocalizacao:
 *     put:
 *       tags:
 *       - Localizacao
 *       summary: Atualizar uma localizacao
 *       operationId: updateLocalizacao
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - in: query
 *         name: Nome
 *         description: "Nome da localizacao que pretende atualizar"
 *         required: true
 *         type: "string"
 *       - in: body
 *         name: body
 *         description: Atualizar uma localizacao
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Localizacao'
 *       responses:
 *         405:
 *           description: Invalid input
 */
 router.put('/updateLocalizacao', async (req, res) => {
    const query = req.query;
    const updtbody = req.body;
    try {
        const collection = await Localizacao.findOneAndUpdate(updtbody);
        if(!collection) throw Error('Something went wrong while saving the post');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

//Apagar uma localizacao
/**
 * @swagger
 * paths:
 *   /deleteLocalizacao:
 *     delete:
 *       tags:
 *       - Localizacao
 *       summary: Apagar uma localizacao
 *       operationId: deleteLocalizacao
 *       produces:
 *       - application/json
 *       - application/xml
 *       parameters:
 *       - name: nome
 *         in: "path"
 *         description: "Nome da localizacao que pretende apagar"
 *         required: true
 *         type: "string"
 *         schema:
 *           $ref: '#/definitions/localizacao'
 *       responses:
 *         405:
 *           description: Invalid input
 */
 router.delete('/deleteLocalizacao', async (req, res) => {
    const nome = req.nome;
    try {
        const collection = await Localizacao.findOneAndDelete(nome);
        if(!collection) throw Error('No Items');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

//Pesquisar localizacao
/**
 * @swagger
 * paths:
 *   /searchLocalizacao:
 *     get:
 *       tags:
 *       - Localizacao
 *       summary: Pesquisar localizacao
 *       description: Lista de localizacoes
 *       operationId: getLocalizacoes
 *       produces:
 *       - application/json
 *       - application/xml
 *       responses:
 *         '200':
 *           description: success
 *           schema:
 *             $ref: '#/definitions/Localizacao'
 *         '500':
 *           description: Lista vazia
 */
 router.get('/searchLocalizacao', async (req, res) => {
    try {
        const collection = await Localizacao.find();
        if(!collection) throw Error('No Items');
        res.status(200).json(collection);
    } catch (err){
        res.status(400).json({msg: err});   
    }
});

//Contagem do numero de ruas
/**
 * @swagger
 * paths:
 *   /countRua:
 *     get:
 *       tags:
 *       - Rua
 *       summary: Numero de ruas 
 *       description: Numero de ruas registadas na base de dados
 *       operationId: getCountRua
 *       responses:
 *         '200':
 *           description: success
 *           schema:
 *             $ref: '#/definitions/rua'
 *         '500':
 *           description: Nao existem ruas
 */
 router.get('/countRua', async (req, res) => {  
    try{
        await client.connect();
        const database = client.db("localizacao");
        const nrua = database.collection("localizacaos");
        const estimate = await nrua.estimatedDocumentCount();
        res.status(200).json(estimate);
    }finally {
        await client.close();
      }
});

module.exports = router;