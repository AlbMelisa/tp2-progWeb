const express = require('express');
const { findAll, create, findById, findByLastName, updateById, deleteById } = require('../services/studentsServices');
const { validateById, validateBody, validateByLastname } = require('../middleware/studentsMiddleware');


const router = express.Router();

//CREATE
router.post('/', validateBody, async (req, res) => {
    try {
        const newStudent = await create(req.body);
        res.json(newStudent);
    } catch (error) {
        res.sendStatus(500)
    } 
});

//GET
router.get('/',async (req, res) => {
    const search = req.query.search ? req.query.search : "";
    const currentPage = req.query.currentPage ? req.query.currentPage : 1;
    const pageSize = req.query.pageSize ? req.query.pageSize : 5;
    console.log(search,currentPage,pageSize)
    try {
        //search, currentPage, pageSize)
        //search=${criteria}&page=${currentPage}&pageSize=${pageSize}
        
        const students = await findAll(search, currentPage, pageSize);
        res.json(students);
    } catch (error) {
        res.sendStatus(500);
    }
});


// //GET
// router.get('/', async (req, res) => {
//     try {
//         const students = await findAll(req.query.search);
//         res.json(students);
//     } catch (error) {
//         res.sendStatus(500);
//     }
// });

//GET BY LASTNAME

// router.get('/:lastname', validateByLastname, async(req, res) => {
//     try {
//         const students = await findByLastName(req.params.lastname);
//         res.json(students);
//     } catch (error) {
//      res.sendStatus(500);
//     }    
// })

//GET BY ID 
router.get('/:id', validateById, async (req, res) => {
    try {
        const student = await findById(Number(req.params.id));

        if (!student) {
            res.status(404).json({
                message: 'Student not found'
            });
            return;
        }

        res.json(student);
    } catch (error) {
        res.sendStatus(500);
    }
});

//DELETE BY ID 
router.put('/:id', validateById, async (req, res) => {
    try {
        await deleteById(req.params.id);
    
        res.json('Ok');
    } catch (error) {
        res.sendStatus(500);
    }
});


module.exports = router;
