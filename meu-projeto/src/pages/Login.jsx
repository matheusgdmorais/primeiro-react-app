import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/principal");
    } catch {
      setErro("Usuário não cadastrado ou senha incorreta.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} /><br />
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <button onClick={handleLogin}>Acessar</button>
      <p>Não tem conta? <a href="/cadastro">Cadastrar</a></p>
    </div>
  );
}