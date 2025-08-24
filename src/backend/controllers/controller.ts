import { Response, Request } from "express";
import { RequestBody } from "../models/custom-express.model";
import { studyAgent } from "../../agents/study-assistant.agent";

export function initialGetController(req: Request, res: Response) {
  res.json({ message: "No implementation for this route" });
}

export async function studyPostController(
  req: RequestBody<{
    message: string;
    temperature: number;
    nucleusSampling: number;
  }>,
  res: Response
) {
  const { message, temperature, nucleusSampling } = req.body;

  try {
    const tools = await studyAgent.getTools();

    const response = await studyAgent.generateVNext(message, {
      modelSettings: { temperature, topP: nucleusSampling },
      // // opcional: toolsets disponíveis
      // toolsets: await studyAgent.getTools(),
    });

    res.json({ answer: response.text });
  } catch (err) {
    console.error("Error in initialPostController:", err);
    res.status(500).json({ error: err });
  }
}
