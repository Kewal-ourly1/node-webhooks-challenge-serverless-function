export default async function handler(request, response) {
  
    // /api/webhooks/nylas?challenge={{CHALLENGE_STRING}}
    if (request.method === "GET" && request.query.challenge) {
      console.log(`Received challenge code! - ${request.query.challenge}`);
      console.log(`Now returning challenge code! - ${request.query.challenge}`);
      // we need to enable the webhook by responding with the challenge parameter
      // CHALLENGE_STRING
      return response.send(request.query.challenge);
    }
  
    if (request.method === "POST") {
      // Get headers and body from the original request
      const { body } = request;
      const headers = {
        'Content-Type': 'application/json',
      };
  
        // Add any other headers required by the API
  
  
      console.log('==========Message updated start==========');
      request.body.deltas.map(deltas => console.log(JSON.stringify(deltas)));
      console.log('==========Message updated end==========\n');
  
      // Define the URL to forward the data to
      const forwardUrl = 'https://hook.us1.make.com/s5jp0o1ch92t1o965s8o8zvh4uv9bcvc';
  
      try {
        // Perform POST request to the forward URL
        const res = await fetch(forwardUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
        });
  
        if (!res.ok) {
          throw new Error(res.statusText);
        }
  
        console.log('Data forwarded successfully!');
      } catch (error) {
        console.error(`Failed to forward data: ${error.status}, ${error.message}, ${error.statusText}`);
      }
  
      // Responding to Nylas is important to prevent the webhook from retrying
      return response.status(200).end();
    }
  }
  