import axios from 'axios';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const getPodcastDescription = async (feedUrl: string) => {
  try {
    const response = await axios.get(`${CORS_PROXY}${feedUrl}`);
    const xmlData = response.data;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

    return xmlDoc.querySelector('description')?.textContent ?? '';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        console.error('Error: Acceso prohibido. No tienes permiso para acceder al recurso.');
        throw new Error('Acceso prohibido. Inténtalo de nuevo más tarde o verifica tus permisos.');
      } else if (error.response?.status === 429) {
        console.error('Error: Has alcanzado el límite de solicitudes para CORS Anywhere.');
        throw new Error('Has alcanzado el límite de solicitudes. Inténtalo de nuevo más tarde.');
      } else {
        console.error('Error fetching podcast description:', error.message);
        throw error;
      }
    } else {
      console.error('Unknown error:', error);
      throw new Error('Se produjo un error desconocido.');
    }
  }
};
