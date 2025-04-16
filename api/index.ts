import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { key, servicekey, type } = req.query;

  const apiUrl = 'http://apis.data.go.kr/B553077/api/open/sdsc2/storeZoneOne';

  if (!key || !servicekey || !type) {
    return res.status(400).send('Missing query parameters: key, servicekey, or type');
  }

  try {
    const response = await axios.get(apiUrl, {
      params: { key, servicekey, type },
      responseType: 'text',
    });

    res.setHeader('Content-Type', 'application/xml;charset=utf-8');
    res.status(200).send(response.data);
  } catch (error: any) {
    console.error('❌ API 요청 실패:', error.message);
    res.status(500).send('API 요청 중 오류 발생');
  }
}
