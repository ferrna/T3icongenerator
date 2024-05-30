import { env } from "~/env";

const NEXT_PUBLIC_PAYPAL_CLIENT_ID = env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = env.PAYPAL_CLIENT_SECRET;
const base = "https://api-m.sandbox.paypal.com";

export async function handleResponse(response: Response): Promise<{
  jsonResponse: { status: string };
  httpStatusCode: number;
}> {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

interface OAuthData {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
}

/*Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.*/
export const generateAccessToken = async (): Promise<string> => {
  try {
    if (!NEXT_PUBLIC_PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }

    const auth = Buffer.from(
      NEXT_PUBLIC_PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");

    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data: OAuthData = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
    throw new Error("Failed to generate Access Token");
  }
};
