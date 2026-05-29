const express = require('express');
const PORT = process.env.PORT
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


const issueTrsutGrid = async(holder_name, credential_type, issuer) => {

    const newCred = {
        did: `did:trustgrid:${Math.random().toString(36).slice(2, 10)}`,
        holder_name:holder_name,
        credential_type : credential_type,
        issuer : issuer,
        status : "Yet to verify",
        zkp_verified: false

    }

    issuedCredentials.push(newCredential)  // save to mock DB
    return newCredential()

}
console.log(issuedCredentials[0].did)
console.log(issuedCredentials[1].did)

mockapp.get('/listallcredentials', (req,res) => {
    res.json(issuedCredentials)
})


// verify a DID

mockapp.get('/api/verify/:did', async(req, res) => {
    console.log(req.params);
    const result = await trustgridVerify(req.params.did);
    console.log(result);
    res.send();
})

mockapp.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})


