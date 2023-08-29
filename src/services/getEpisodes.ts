import axios from 'axios';

const LOOKUP_URL = 'https://itunes.apple.com/lookup';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const getEpisodes = async (podcastId: number, limit: number = 20) => {
  try {
    const response = await axios.get(
      `${CORS_PROXY}${LOOKUP_URL}?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=${limit}`
    );
    return response.data.results.slice(1);
  } catch (error) {
    handleErrors(error);
  }
};


const handleErrors = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 403) {
      console.error('Error: Acceso prohibido. No tienes permiso para acceder al recurso.');
      throw new Error('Acceso prohibido. Inténtalo de nuevo más tarde o verifica tus permisos.');
    } else if (error.response?.status === 429) {
      console.error('Error: Has alcanzado el límite de solicitudes para CORS Anywhere.');
      throw new Error('Has alcanzado el límite de solicitudes. Inténtalo de nuevo más tarde.');
    } else {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  } else {
    console.error('Unknown error:', error);
    throw new Error('Se produjo un error desconocido.');
  }
};