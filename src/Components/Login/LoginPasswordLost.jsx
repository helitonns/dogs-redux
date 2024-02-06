import React from "react";
import Input from './../Forms/Input';
import Button from './../Forms/Button';
import useForm from './../../Hooks/useForm';
import useFetch from './../../Hooks/useFetch';
import { PASSWORD_LOST } from "../../api";
import Error from './../Helper/Error';
import Head from './../Helper/Head';

const LoginPasswordLost = () => {
  const login = useForm();
  const {data, loading, error, request} = useFetch();

  async function handleSubmit(event){
    event.preventDefault();
    
    if(login.validate()){
      const {url, options} = PASSWORD_LOST({login: login.value, url: "http://http://localhost:5173/login/resetar"});
      request(url, options);
    }
  }

  return (
    <section className="animeLeft">
      <Head title={"Perdeu a senha?"} />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? 
        <p style={{color: "#4c1", fontWeight: "bold"}}>{data}</p> 
        :
        <form onSubmit={handleSubmit}>
          <Input label="E-mial / Usuário" type="text" name="email" {...login}/>
          {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar E-mail</Button>}
        </form>
      }
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
