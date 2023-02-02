import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import sharp from "sharp";
import { encode } from "blurhash";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;
    const uri = image.split(';base64,').pop();
    const imgBuffer = Buffer.from(uri, "base64");

    const { data, info } = await sharp(new Uint8ClampedArray(imgBuffer)).ensureAlpha().raw().resize(32, 32).toBuffer({resolveWithObject: true});
    const hash = encode(data, info.width, info.height, 4, 4);

    res.status(200).json({ photo: image, hash });
  } catch(err) {
    console.log(err);
    res.status(500).send(err)
  }
})

export default router;