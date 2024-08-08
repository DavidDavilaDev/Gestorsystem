import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { editCard, archiveCard } from "../../actions/board";
import { Modal, TextField, Button, CircularProgress } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../utils/modalStyles";

const CardModal = ({ cardId, open, setOpen, card, list }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCard(cardId, { title, description }));
  };

  const onArchiveCard = async () => {
    dispatch(archiveCard(cardId, true));
    setOpen(false);
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("multimedia", file);

        // Aquí debes realizar la llamada a tu servidor para subir el archivo
        // Reemplaza esta llamada ficticia con tu lógica real de carga de archivos
        // Supongamos que la URL de tu endpoint de carga de archivos es '/api/upload'
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setFileURL(data.url);
        } else {
          console.error("Error al subir el archivo");
        }
      } catch (error) {
        console.error("Error al subir el archivo:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={`${classes.paper} ${classes.cardModal}`}>
        <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
          <div className={classes.modalTop}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              label="Card title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && onTitleDescriptionSubmit(e)
              }
              className={classes.cardTitle}
            />
            <Button onClick={() => setOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            label="Card description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" onChange={onFileChange} />
          {loading && <CircularProgress />}
          {fileURL && (
            <a href={fileURL} target="_blank">
              {file.name}
            </a>
          )}
          <Button variant="contained" color="secondary" onClick={uploadFile}>
            Subir archivo
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              title === card.title &&
              (description === card.description ||
                (description === "" && !card.description))
            }
            className={classes.button}
          >
            Guardar todos los cambios
          </Button>
        </form>
        {/* Resto del contenido del modal */}
      </div>
    </Modal>
  );
};

CardModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

export default CardModal;
