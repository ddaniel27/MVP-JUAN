const {deleteSellerByCode, updateSeller, getSellerByCode, addNewSeller, createConnection} = require('./sqlQueriesController')

const connection = createConnection()

async function postASeller(req,res){
    try{
    const {code, name, phone, pic} = req.body
    const result = await addNewSeller({code, name, phone, pic}, connection)
    res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}

async function getASeller(req,res){
    try{
    const {code} = req.query
    const result = await getSellerByCode(code, connection)
    res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}

async function updateASeller(req,res){
    try{
    const {code, name, phone, pic} = req.body
    const result = await updateSeller({code, name, phone, pic}, connection)
    res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}

async function deleteASeller(req,res){
    try{
    const {code} = req.query
    const result = await deleteSellerByCode(code, connection)
    res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}


module.exports = { postASeller, getASeller, updateASeller, deleteASeller }