import { draftMode } from "next/headers";

export async function GET() {
  const draft = await draftMode();

  if (draft.isEnabled) {
    draft.disable();
  } else {
    draft.enable();
  }

  return new Response(JSON.stringify({ enabled: draft.isEnabled }));
}
