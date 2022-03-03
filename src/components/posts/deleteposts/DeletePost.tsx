import React, { useEffect, useState } from 'react'
import { Typography, Button, Box, Card, CardActions, CardContent } from "@material-ui/core"
import { useHistory, useParams } from 'react-router-dom';
import Post from '../../../models/Post';
import { buscaId, deleteId } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './DeletePost.css';

function DeletePost() {
    
  let history = useHistory();
  const { id } = useParams<{id: string}>();

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  
  const [post, setPosts] = useState<Post>()

  useEffect(() => {
      if(token === ''){
          alert("Você precisa estar logado.")
          history.push('/login')
      }
  }, [token])

  useEffect(() => {
      if(id !== undefined){
          findById(id)
      }
  }, [id])

  async function findById(id: string) {
      buscaId(`/postagens/${id}`, setPosts, {
          headers: {
              'Authorization': token
          }
      })
  } 

  function sim() {
    history.push('/postagens')
    deleteId(`/postagens/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    alert('Post deletado com sucesso.');
  }

    function nao() {
      history.push('/postagens')
    }
   
  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o post?
              </Typography>
              <Typography color="textSecondary" >
              {post?.titulo}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
              <Button onClick={sim} variant="contained" className='sim-button' size='large'>
                Sim
              </Button>
              </Box>
              <Box>
              <Button onClick={nao} variant="contained" size='large' className='nao-button'>
                Não
              </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default DeletePost;