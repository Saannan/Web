import { Router } from 'express';
import axios from 'axios';

const aiRouter = Router();

aiRouter.all('/:service', async (req, res) => {
    const { service } = req.params;
    const { text } = req.query;

    try {
        if (service === 'openai') {
            const response = await axios.get(`https://api.agatz.xyz/api/gpt4o?message=${encodeURIComponent(text)}`);
            return res.status(200).json({
                status: true,
                result: response.data.data.result,
            });
        } else if (service === 'blackbox') {
            const requestData = {
                content: text,
                cName: "S-AI",
                cID: "S-AIbAQ0HcC",
            };
            const response = await axios.post('https://luminai.my.id/', requestData);
            return res.status(200).json({
                status: true,
                result: response.data.result,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message,
        });
    }
});

export default aiRouter;
