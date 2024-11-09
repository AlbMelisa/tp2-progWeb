const { Students } = require('../model/students');

const create = async (student) => {
    try {
        const lastSID = await Students.getLastSid();
        const isUnique = Students.findByDniOrEmail(student.dni, student.email);
        
        if(!isUnique){
         throw new Error(100);
        }

        const newStudent = await Students.create({...student , sid: lastSID + 1});

        return newStudent;
    } catch (error) {
        console.error('studentServices: ' + error);
        throw error;
    }
};
// creo que aqui era que se colocaba el numero de paginacion , el numero de paginas 
const findAll = async (search,currentPage, pageSize) => {
    try {
        const students = await Students.findAllWithPagination(search,currentPage, pageSize);
        console.log("studetns",students)
        return students;
    } catch (error) {
        console.error('students: ' + error);
        throw error;
    }
};
// const findAll = async (search) => {
//     try {
//         const students = await Students.getAll(search);
//         return students;
//     } catch (error) {
//         console.error('students: ' + error);
//         throw error;
//     }
// };

const findById = async (id) => {
    try {
        const student = await Students.getById(id);

        return student;
    } catch (error) {
        console.error('studentsServices: ' + error);
        throw error;
    }
};

const findByLastName = async(lastname) => {
    try {
        // const students = await StudentsRepository.getLastName(lastname);
        const students = await Students.getByLastName(lastname);
        return students;
    } catch (error) {
        console.error('studentServices: ' + error);

    }
}

const updateById = async (id, payload) => {
    try {
        await Students.updateById(id,  { name: payload.name });
    } catch (error) {
        console.error('studentsServices: ' + error);
        throw error;
    }
};

const deleteById = async (id) => {
    try {
        await Students.deleteById(id);
    } catch (error) {
        console.error('studentsServices: ' + error);
        throw error;
    }
};

module.exports = {
    findAll,
    findById,
    create,
    findByLastName,
    updateById,
    deleteById
};
