import { useState } from 'react';
import './style.css';
import firebase from './firebaseConnection';

function App() {
 
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  async function handleAdd(){
    
    await firebase.firestore().collection('posts')

   /* .doc('12345')
    .set({
      titulo: titulo,
      autor: autor
    })*/

    .add({
      titulo: titulo,
      autor: autor,
    })
    .then(()=>{
      console.log('Dados Cadastrados');
      setTitulo('');
      setAutor('');
    })
    .catch((error)=>{
      console.log('ERRO: '+ error);
    })

  }

  // async function buscarPost(){
  //   await firebase.firestore().collection('posts')
  //   .doc('123')
  //   .get()
  //   .then((snapshot)=>{
  //     setTitulo(snapshot.data().titulo);
  //     setAutor(snapshot.data().autor);
      
  //   })
  //   .catch((error)=>{
  //     console.log('ERRO' + error)
  //   })
  // }

  async function buscarPost(){
    await firebase.firestore().collection('posts')
    .get()
    .then((snapshot)=>{
      let lista = [];

      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })  
      })

      setPosts(lista);

    })
    .catch(()=>{
      console.log('erro')
    })

  }

  return (
    <div className="App">
      <h1>Teste</h1><br/>

        <div className='container'>

          <label>Titulo: </label>
          <textarea type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>

          <label>Autor: </label>
          <textarea type="text" value={autor} onChange={(e) => setAutor(e.target.value)}/>

          <button onClick={ handleAdd }> Cadastrar</button><br/>
          <button onClick={ buscarPost }> Buscar Post</button>

          <ul>
            {posts.map((post)=>{
              return(
                <li key={post.id}>
                  <span>Titulo: {post.titulo}</span><br/>
                  <span>Autor: {post.autor}</span><br/> <br/>
                </li>
              )
            })}
          </ul>

        </div>

    </div>
  );
}

export default App;
