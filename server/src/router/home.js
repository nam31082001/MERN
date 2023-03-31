const express =require('express')
const homeController=require('../controllers/homeControllers')
const router=express.Router()
router.patch('/items/:id',homeController.put)
router.post('/data/items',homeController.post)
router.delete('/data/:id',homeController.delete)
router.get('/data',homeController.get)

module.exports=router