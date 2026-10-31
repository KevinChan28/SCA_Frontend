const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getStatusList(page) {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}`+ '/status/all', { method: 'GET'});
    if (!response) throw new Error('Error en la red');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { content: [] };
  }
}