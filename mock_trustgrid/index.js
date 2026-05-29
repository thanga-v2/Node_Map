const express = require('express');
const PORT = process.env.PORT || 3005;
const mockapp = express();
mockapp.use(express.json());

// Mock data

const issuedCredentials = [
    {
        did: "did:trustgrid:abc123",
        holder_name: "Thanga",
        credential_type: "ID_CARD",
        issuer: "TrustGrid",
        status: "verified",
        zkp_verified: true
    },
    {
        did: "did:trustgrid:xyz789",
        holder_name: "Mani",
        credential_type: "PASSPORT",
        issuer: "TrustGrid",
        status: "verified",
        zkp_verified: false
    }
]

const trustgridVerify = async(did) => {

    const result = issuedCredentials.find(object => object.did === did);

    if(!result) {
        throw console.error(`DID not found: ${did}`);
    } 

    return {
        status : result.status,
        credential_type : result.credential_type,
        zkp_verified : result.zkp_verified
    }

}


const issueTrsutGridCred = async(holder_name, credential_type, issuer) => {

    const newCred = {
        did: `did:trustgrid:${Math.random().toString(36).slice(2, 10)}`,
        holder_name:holder_name,
        credential_type : credential_type,
        issuer : issuer,
        status : "Yet to verify",
        zkp_verified: false

    }

    issuedCredentials.push(newCred)  // save to mock DB
    return newCred;

}
console.log(issuedCredentials[0].did)
console.log(issuedCredentials[1].did)

mockapp.get('/listallcredentials', (req,res) => {
    res.json(issuedCredentials)
})


// verify a DID

mockapp.get('/api/verify/:did', async(req, res) => {
    
    try {                                                                                                                                                                                                                
        const result = await trustgridVerify(req.params.did)                                                                                                                                                             
        res.json(result)                                                                                                                                                                                                 
    } catch (err) {                                                                                                                                                                                                      
        res.status(404).json({ success: false, error: err.message })                                                                                                                                                     
    }
})

mockapp.post('/api/issuecred', async(req, res) => {
    
    const {holder_name, credential_type, issuer} = req.body;

    if (!holder_name || !credential_type || !issuer) {                                                                                                                                                                       
        return res.status(400).json({ error: "holder_name, credential_type and issuer are required" })                                                                                                                       
    }
    // mock 
    // {
    //     "holder_name" : "thanga", 
    //     "credential_type": "AADHAAR", 
    //     "issuer" : "TN GOV",
    //     "temp" : "do nothing"
    // }
    console.log(holder_name, credential_type, issuer);
    const credential = await issueTrsutGridCred(holder_name, credential_type, issuer);

    res.status(201).json(credential);
})

mockapp.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})


// localhost:3005/api/issuecred

// {
//     "holder_name" : "thanga", 
//     "credential_type": "AADHAAR", 
//     "issuer" : "TN GOV",
//     "temp" : "do nothing"
// }


// localhost:3005/listallcredentials

// localhost:3005/api/verify/did:trustgrid:xeuqescj



