const clarifai = require('clarifai');

const handleImageUrl = (req, res)=>{
    const PAT = 'c929b58434b54acb8e976c1cf3b807c8';
    const USER_ID = 'musadango';
    const APP_ID = 'first-app';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = req.body.input;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(data=> res.json(data))
        .catch(err => res.status(400).json('Unable to work with API'));        
}

const handleImage = (req, res, dbase)=>{
    const { id } = req.body;

    dbase.select('entries').from('users')
    .where({id: id})
    .increment('entries', 1)
    .returning('entries')
    .then(entry =>{ 
        if(entry.length){
            return res.json(entry[0].entries);
        }
        else{
            return res.status(422).json("Fail to load entries");
        }
    })
    .catch(err=> res.status(400).json('Error'));
}

module.exports = { handleImage, handleImageUrl };