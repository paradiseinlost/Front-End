import React, { useEffect, useState } from "react";
import { Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { buscaId, deleteId } from "../../../services/Service";
import Categoria from "../../../models/Categoria";
import "./DeletaCategoria.css";

function DeletarCategoria() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [token, setToken] = useLocalStorage("token");
  const [categoria, setCategoria] = useState<Categoria>();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    await buscaId(`/categorias/${id}`, setCategoria, {
      headers: {
        'Authorization': token,
      },
    });
  }

  async function sim() {
    navigate("/categorias");

    try {
      await deleteId(`/categorias/${id}`, {
        headers: {
          'Authorization': token,
        },
      });

      alert("Categoria deletada com sucesso!");
    } catch (error) {
      alert("Erro ao deletar");
    }
  }

  function nao() {
    navigate("/categorias");
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar qual categoria?
              </Typography>
              <Typography color="textSecondary">
                {categoria?.tipo}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="marginLeft"
                  size="large"
                  color="primary"
                >
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
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
export default DeletarCategoria;
