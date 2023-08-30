import axios from 'axios';

const ITUNES_URL = 'https://itunes.apple.com/search';
const CORS_PROXY = 'https://corsproxy.io/?';

export const searchPodcasts = async (term: string, limit: number = 5) => {
  try {
    const response = await axios.get(
      `${CORS_PROXY}${ITUNES_URL}?term=${term}&entity=podcast&limit=${limit}`,
    );
    return response.data.results;
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
