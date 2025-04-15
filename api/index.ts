import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('✅ TypeScript Express 서버가 정상 실행 중입니다!');
});

app.get('/sosang', async (req: Request, res: Response) => {
  const { key, servicekey, type } = req.query;

  const apiUrl = 'http://apis.data.go.kr/B553077/api/open/sdsc2/storeZoneOne';

  try {
    const response = await axios.get(apiUrl, {
      params: {
        key,
        servicekey,
        type,
      },
      responseType: 'text', // XML 응답일 경우
    });

    res.set('Content-Type', 'application/xml;charset=utf-8');
    res.send(response.data);
  } catch (error: any) {
    console.error('API 요청 실패:', error.message);
    res.status(500).send('API 요청 중 오류 발생');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 서버 주소: http://localhost:${PORT}`);
  console.log(`🔗 테스트 URL: http://localhost:${PORT}/sosang?key=9174&servicekey=zWJZJMGi7kBIlToG%2FGVb4RpeALKnhLOKl6B0XRnr%2Bs2w2WtifQ1c8ktURng7cT9gtnNh%2FjkBOrSD0rBqE2mPlA%3D%3D&type=xml`);
});
