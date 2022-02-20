import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function getQuery (
        req: { 
            body: { 
                answer: string; 
            }; 
        },
        res: { 
            status: (arg0: number) => { 
                (): any; 
                new(): any; 
                json: { 
                    (arg0: {}): void;
                    new(): any; 
                }; 
            }; 
        }
    ) {
    const completion = await openai.createCompletion("text-davinci-001", {
        prompt: "Extract keywords from this text:" + req.body.answer,
        temperature: 0.3,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0.8,
        presence_penalty: 0
    })

    

    res.status(200).json({ result: completion.data.choices })
    return completion.data.choices;
}
