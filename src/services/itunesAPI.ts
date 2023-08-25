import axios from 'axios';

const URL = 'https://itunes.apple.com/search';
const CORS = 'https://cors-anywhere.herokuapp.com/';

export const searchPodcasts = async (term: string, limit: number = 5) => {
  try {
    const response = await axios.get(
      `${CORS}${URL}?term=${term}&entity=podcast&limit=${limit}`,
    );
    console.log(response);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
