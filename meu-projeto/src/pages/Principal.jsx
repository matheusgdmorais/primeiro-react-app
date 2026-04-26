import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Principal() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsuario(docSnap.data());
        }
      } else {
        navigate("/login"); // redireciona se não estiver logado
      }
    });
    return () => unsubscribe();
  }, []);

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Bem-vindo, {usuario.nome}!</h2>
      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>Sobrenome:</strong> {usuario.sobrenome}</p>
      <p><strong>Data de Nascimento:</strong> {usuario.nascimento}</p>
    </div>
  );
}