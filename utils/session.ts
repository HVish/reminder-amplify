import { Auth } from 'aws-amplify';

export async function getAccessToken() {
  const session = await Auth.currentSession();
  return session.getAccessToken().getJwtToken();
}
