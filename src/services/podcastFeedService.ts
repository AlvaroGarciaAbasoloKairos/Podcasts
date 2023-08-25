import axios from 'axios';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const getPodcastFeed = async (feedUrl: string) => {
  try {
    const response = await axios.get(`${CORS_PROXY}${feedUrl}`);
    const data = await response.data; 
    
    const episodes = parseXMLToEpisodes(data);

    return episodes;
  } catch (error) {
    throw error;
  }
};

const parseXMLToEpisodes = (xmlData: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "text/xml");
  
  const items = xmlDoc.getElementsByTagName("item");
  const episodes = [];

  for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      const enclosure = item.getElementsByTagName("enclosure")[0];
      if (enclosure) {
          const audioUrl = enclosure.getAttribute("url");
          episodes.push(audioUrl);
      }
  }
  return episodes;
};
