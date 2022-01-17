import { useState, useEffect } from 'react';
import './style.css';
import firebase from './firebaseConnection';

function App() {
 
  const [idPost, setIdPost] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  

  useEffect(()=>{
    async function loadPosts(){
      await firebase.firestore().collection('posts')
      .onSnapshot((doc)=>{
        let meusPosts = [];

        doc.forEach((item)=>{
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor,
          })
        });

        setPosts(meusPosts);

      })
    }

    loadPosts();

  }, [])

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

  async function editarPost(){
    await firebase.firestore().collection('posts')
    .doc(idPost)
    .update({
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('DADOS ATUALIZADOS');
      setIdPost('');
      setTitulo('');
      setAutor('');
    })
    .catch(()=>{
      console.log('ERRO')
    })
    
  }

  async function excluirPost(id){
    await firebase.firestore().collection('posts').doc(id)
    .delete()
    .then(()=>{
      alert('ITEM EXCLUIDO')
    })
  }

  async function novoUsuario(){
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((value)=>{
      console.log(value)
    })
    .catch((error)=>{
      if(error.code === 'auth/weak-password'){
        alert('Senha muito fraca.')
      }else if(error.code === 'auth/email-already-in-use'){
        alert('Esse email já existe!');
      }
    })
  }

  return (
    <div className="App">
      <h1>Usando Auth do Firebase</h1><br/>

        <div className='container'>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>

          <label>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/><br/>

          <button onClick={novoUsuario}>Cadastrar</button>

        </div>
      

        <div className='container'>

          <h2>Banco de Dados</h2>

          <label>ID: </label>
          <input type="text" value={idPost} onChange={(e) => setIdPost(e.target.value)}/>

          <label>Titulo: </label>
          <textarea type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>

          <label>Autor: </label>
          <textarea type="text" value={autor} onChange={(e) => setAutor(e.target.value)}/>

          <button onClick={ handleAdd }> Cadastrar</button><br/>
          <button onClick={ buscarPost }> Buscar Post</button><br/>
          <button onClick={ editarPost }>Editar</button>


          <ul>
            {posts.map((post)=>{
              return(
                <li key={post.id}>
                  <span>ID - {post.id}</span><br/>
                  <span>Titulo: {post.titulo}</span><br/>
                  <span>Autor: {post.autor}</span><br/>
                  <button onClick={()=> excluirPost(post.id)} >Excluir Post</button> <br/><br/>
                </li>
              )
            })}
          </ul>

        </div>

    </div>
  );
}

export default App;
