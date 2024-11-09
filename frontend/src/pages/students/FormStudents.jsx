import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PageContent from "../../components/pageContent/PageContent";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import InputField from "../../components/inputField/InputField";
import './formStudents.css';
import Modal from "../../components/modal/Modal";

const defaultValues = {
  inputNameValue: "",
  inputLastNameValue: "",
  inputEmailValue: "",
  inputDniValue: "",
};

const FormCareer = ({ id = null, values = defaultValues }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ 
    defaultValues: values,
    mode: "all"
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (values) => {
    if (isLoading) return;  // Evita que se ejecute si ya está en proceso

    setIsLoading(true); // Establece el estado de carga a verdadero

    try {
      const body = JSON.stringify({
        firstname: values.inputNameValue,
        lastname: values.inputLastNameValue,
        dni: values.inputDniValue,
        email: values.inputEmailValue
      });
      
      const endpoint = id ? `/api/students/${id}` : '/api/students';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      console.log("Estudiante guardado exitosamente");
      setShowModal(true);
      reset(); 
      
    } catch (error) {
      alert("Error al guardar el estudiante: " + error.message);
    } finally {
      setIsLoading(false); // Restablece el estado de carga a falso
    }
  };

  return (
    <PageContent
      headerTitle="Agregar alumnos"
      actions={[
        <Button 
          page="form" 
          key="button-form"
          text="Atrás"
          onClick={() => navigate("/students")}
          type=""
        />,
      ]}
    >
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="grid-form">
          <InputField
            label="Nombre"
            name="inputNameValue"
            register={register}
            rules={{
              required: "Nombre es requerido",
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "Nombre solo puede ser letras"
              },
              maxLength: {
                value: 100,
                message: "Nombre no puede ser mayor a 100 caracteres"
              },
            }}
            errors={errors}
          />

          <InputField
            label="Apellido"
            name="inputLastNameValue"
            register={register}
            rules={{
              required: "Apellido es requerido",
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "Apellido solo puede ser letras"
              },
              maxLength: {
                value: 100,
                message: "Apellido no puede ser mayor a 100 caracteres"
              },
            }}
            errors={errors}
          />

          <InputField
            label="DNI"
            name="inputDniValue"
            register={register}
            rules={{
              required: "DNI es requerido",
              pattern: {
                value: /^[0-9]{1,10}$/,
                message: "DNI solo puede contener números"
              },
              maxLength: {
                value: 10,
                message: "DNI no puede ser mayor a 10 caracteres"
              },
            }}
            errors={errors}
          />

          <InputField
            label="Email"
            name="inputEmailValue"
            register={register}
            rules={{
              required: "Email es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido"
              },
              maxLength: {
                value: 100,
                message: "Email no puede ser mayor a 100 caracteres"
              },
            }}
            errors={errors}
          />

          <div className="btn-align">
            <Button 
              page="students" 
              text="Guardar"
              type="submit"
              disabled={isLoading} // Deshabilita el botón si está cargando
            />
          </div>
        </form>
      </Card>
      <Modal isOpen={showModal} onClose={handleCloseModal} message='Formulario enviado correctamente.'/>
    </PageContent>
  );
};

export default FormCareer;

