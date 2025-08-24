import { Response, Request } from "express";
import { RequestBody } from "../models/custom-express.model";
import { studyAgent } from "../../agents/study-assistant.agent";

export function initialGetController(req: Request, res: Response) {
  res.json({ message: "No implementation for this route" });
}

export async function studyPostController(
  req: RequestBody<{ message: string }>,
  res: Response
) {
  const { message } = req.body;

  try {
    const tools = await studyAgent.getTools();

    const response = await studyAgent.generateVNext(message, {
      // // opcional: toolsets disponíveis
      // toolsets: await studyAgent.getTools(),
    });

    res.json({ answer: response.text });
  } catch (err) {
    console.error("Error in initialPostController:", err);
    res.status(500).json({ error: err });
  }
}
