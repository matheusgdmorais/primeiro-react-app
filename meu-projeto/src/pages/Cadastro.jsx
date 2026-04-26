import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [form, setForm] = useState({
    email: "", senha: "", nome: "", sobrenome: "", nascimento: ""
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCadastro = async () => {
    try {
      // Cria usuário no Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth, form.email, form.senha
      );
      const uid = userCredential.user.uid;

      // Salva dados extras no Firestore com o UID
      await setDoc(doc(db, "usuarios", uid), {
        uid,
        nome: form.nome,
        sobrenome: form.sobrenome,
        nascimento: form.nascimento,
        email: form.email,
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      setErro("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <input name="email" placeholder="E-mail" onChange={handleChange} /><br />
      <input name="senha" type="password" placeholder="Senha" onChange={handleChange} /><br />
      <input name="nome" placeholder="Nome" onChange={handleChange} /><br />
      <input name="sobrenome" placeholder="Sobrenome" onChange={handleChange} /><br />
      <input name="nascimento" type="date" onChange={handleChange} /><br />
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <button onClick={handleCadastro}>Cadastrar</button>
      <p>Já tem conta? <a href="/login">Entrar</a></p>
    </div>
  );
}