const DOMAIN = 'http://localhost:3001';

function getLaunches() {
  return fetch(`${DOMAIN}/api/launches`, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  })
    .then(function(res) { return res.json() })
    .catch(error => {
      console.log('Request failed:', error);
    });
}

export { getLaunches };
