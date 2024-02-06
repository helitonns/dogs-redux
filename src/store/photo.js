//Fazendo sem usar o reduxtoolkit
import { PHOTOS_GET } from './../api';

//constantes
const FETCH_PHOTO_STARTED = "photo/fetchStarted";
const FETCH_PHOTO_SUCCESS = "photo/fetchSuccess";
const FETCH_PHOTO_ERROR = "photo/fetchError";

//actions creators
const fetchStarted = ()=> ({
  type: FETCH_PHOTO_STARTED
});

const fetchSuccess = (data)=> ({
  type: FETCH_PHOTO_SUCCESS,
  payload: data
});

const fetchError = (error)=> ({
  type: FETCH_PHOTO_ERROR,
  payload: error
});

//estado inicial
const initialState = {
  loading: false,
  data: null,
  error: null
}

//redurces
export default function photo(state = initialState, action){
  switch(action.type){
    case FETCH_PHOTO_STARTED:
      return {
        ...state,
        loading: true,
        data: null,
        error: null
      }
    case FETCH_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case FETCH_PHOTO_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      return state;
  }
}

//Criando o thunk
export const fetchPhoto = (id)=> async (dispatch)=> {
  try {
    dispatch(fetchStarted());
    const {url, options} = PHOTOS_GET(id);
    const response = await fetch(url, options);
    const data = await response.json();

    if(response.ok === false) throw new Error(data.message);

    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
} 
