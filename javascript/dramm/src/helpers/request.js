class Request {
    async get (url){
        const result = await fetch(url);
        return result.json();
    }

    postSound (payload, url){
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then(console.log("post complete"))


    }

    
}

export default Request;