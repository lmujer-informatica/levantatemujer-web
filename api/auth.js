export default async function handler(req, res) {
  const { code } = req.query;
  const SITE_URL = 'https://levantatemujer-web.vercel.app';

  // PASO 1: sin "code" -> redirigir a GitHub para iniciar el login
  if (!code) {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: `${SITE_URL}/api/auth`,
      scope: 'repo,user',
    });
    res.writeHead(302, {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
    });
    return res.end();
  }

  // PASO 2: con "code" -> intercambiar por token y devolver HTML con postMessage
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(401).send(renderMessage('error', { error: tokenData.error }));
    }

    return res.status(200).send(
      renderMessage('success', {
        token: tokenData.access_token,
        provider: 'github',
      })
    );
  } catch (error) {
    return res.status(500).send(renderMessage('error', { error: error.message }));
  }
}

function renderMessage(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  return `<!doctype html>
<html><body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage('${message}', e.origin);
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
</body></html>`;
}