import { Modal } from "react-bootstrap";
import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationPost = yup.object().shape({
  marca: yup.string().required("Preenchimento obrigatório").matches(/^[A-Za-z0-9]*$/, "somente numeros e letras")
});

const AddMarca = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationPost),
  });

  const onSubmit = async (data) => {
    await axios.post("http://localhost:5000/marcas", data);
    navigate("/listagemMarcas");
  };

  return (
    <div className="model_box">
      <Modal.Dialog size="md">
        <Modal.Title>Cadastro de Marcas</Modal.Title>
        <form class="form-group" onSubmit={handleSubmit(onSubmit)}>
          <div class="form-group mt-3">
            <label className="label">Marca Time</label>
            <input
              type="text"
              class="form-control"
              placeholder="Marcas"
              {...register("marca")}
            />
            <p className="error-message">{errors.marca?.message}</p>
          </div>
          <br />
          <button
            style={{
              width: "100%",
              backgroundColor: "blue",
              color: "white",
              height: "40px",
            }}
          >
            Adicionar
          </button>
        </form>
      </Modal.Dialog>
    </div>
  );
};
export default AddMarca;
