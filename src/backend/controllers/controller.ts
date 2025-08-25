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
  const userId = req.headers.userid as string;
  const conversationId = req.headers.conversationid as string;

  try {
    const response = await studyAgent.generateVNext(message, {
      modelSettings: { temperature, topP: nucleusSampling },
      memory: {
        resource: userId,
        thread: conversationId,
      },

      // // opcional: toolsets disponíveis
      // toolsets: await studyAgent.getTools(),
    });

    res.json({
      answer:
        response.text ??
        "The model answered with a empty text. Try asking your question again",
    });
  } catch (err) {
    console.error("Error in initialPostController:", err);
    res.status(500).json({ error: err });
  }
}
