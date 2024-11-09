import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContent from "../../components/pageContent/PageContent";
import Button from "../../components/button/Button";
import "./listStudents.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ButtonPagination from "../../components/buttonPagination/ButtonPagination";

const ListStudents = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [criteria, setCriteria] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Valor inicial de elementos por página
  const [totalRecords, setTotalRecords] = useState(0); // Número total de registros

  useEffect(() => {
    fetchStudents();
  }, [currentPage, pageSize]);

  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "PUT",
      });
      fetchStudents();
    } catch (error) {}
  };

  const fetchStudents = async () => {
    try {
      setFetchingStudents(true);
      const response = await fetch(`/api/students?search=${criteria}&page=${currentPage}&pageSize=${pageSize}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("respidne",response)

      console.log(data)
      setTotalRecords(data.rows.length);
      setStudents(data.rows);
    //  setStudents(data);
      
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingStudents(false);
    }
  };


  // Manejar la búsqueda
  const handleSearchChange = (e) => {
    setCriteria(e.target.value);
    setCurrentPage(1); // Resetear página al buscar
  };

  // Manejar el cambio de tamaño de página
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Resetear página al cambiar pageSize
  };

  // Manejar la paginación
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PageContent
      headerTitle="Alumnos"
      key="page-list"
      actions={[
        <Button
          key="add"
          page="students"
          text="Agregar"
          onClick={() => navigate("/students/form")}
          type=""
        />,
      ]}
    >
      <div className="input-head">
        <input
          type="text"
          placeholder="Buscar por Apellido"
          className="align-input"
          minLength="3"
          maxLength="45"
          id="criteria"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
        />
        <Button
          page="students"
          text={<i className="fa-solid fa-magnifying-glass"></i>}
          type="button"
          onClick={() => fetchStudents()}
        />
      </div>
      {fetchingStudents ? (
        <p>Por favor espere, recuperando información...</p>
      ) : (
        <>
          {!students?.length ? (
            <p>NO posee alumnos cargados.</p>
          ) : (
            <table border={1} className="table-design">
              <thead>
                <tr>
                  <th>Legajo</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {students?.map((student) => (
                  <tr key={student.id}>
                    <td> {student.sid} </td>
                    <td> {student.firstname} </td>
                    <td> {student.lastname} </td>
                    <td>
                      <Button
                        page="form"
                        text="Borrar"
                        key="back"
                        onClick={() => {
                          if (
                            window.confirm(
                              "¿Estás seguro de que deseas eliminar este estudiante?"
                            )
                          ) {
                            deleteStudent(student.id);
                          }
                        }}
                        type=""
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      <div className="items">
        <label>Ítems por página:</label>
        <select id="options" name="opciones" onChange={handlePageSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div>
        <li>
        {Array.from({ length: Math.ceil(totalRecords / pageSize) }, (_, i) => (
         <ButtonPagination
          key={i} 
          onClick={() => goToPage(i + 1) }
          disabled={currentPage === i + 1}
          number={i+1}/> 
        ))}
        </li>
        
      </div>
    </PageContent>
  );
};

export default ListStudents;
