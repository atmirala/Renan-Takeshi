import React, { useState } from "react";
import axios from "axios";
// import styled from "styled-components";

function CadastroUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  function cadastrarUsuario() {
    const dados = {
      name: nome,
      email: email,
    };
    const header = { headers: { Authorization: "renan-takeshi-mello" } };
    const url =
      "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";
    axios
      .post(url, dados, header)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <input
        value={nome}
        placeholder="Usuario"
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        value={email}
        placeholder="E-mail"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={cadastrarUsuario}>Cadastrar</button>
    </div>
  );
}

export default CadastroUsuario;
