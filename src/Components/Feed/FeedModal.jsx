import React from "react";
import styles from "./FeedModal.module.css";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import { fetchPhoto } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";

const FeedModal = ({photo, setModalPhoto}) => {

  const {data, loading, error} = useSelector(state => state.photo);
  const dispatch = useDispatch();

  React.useEffect(()=> {
    dispatch(fetchPhoto(photo.id));
  }, [photo, dispatch]);

  function handleOutsideClick(event){
    if(event.target === event.currentTarget) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error}/>}
      {loading && <Loading/>}
      {data && <PhotoContent />}
    </div>
  );
};

export default FeedModal;
