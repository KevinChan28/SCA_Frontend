const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getDocumentsList(page) {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}`+ `/documents?page=${page ? page : 0 }&size=10&sort=IdDocument%2CDESC`, { method: 'GET'});
    if (!response) throw new Error('Error en la red');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { content: [] };
  }
}