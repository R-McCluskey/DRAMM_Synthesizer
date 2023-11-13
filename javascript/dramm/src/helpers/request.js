class Request {
    async get (url){
        const result = await fetch(url);
        return result.json();
    }

    
}

export default Request;