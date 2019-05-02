const Record = require('../model/records');
module.exports = {
    postSearch: function(req,res){
        let startDate = req.body.startDate;
        startDate = new Date(startDate);
        let endDate = req.body.endDate;
        endDate = new Date(endDate);
        let minCount = req.body.minCount;
        let maxCount = req.body.maxCount;
        let response = {
            code:0,
            msg:"success",
            records:[],
        }
        let query = [{$project:{
            _id:0,
            key:1,
            createdAt:1,
            "totalCount":{$sum:'$counts'},
        }}];

        if(req.body.startDate){
        query = query.concat([{$match:{'createdAt':{$gte:startDate}}},])
        }
        if(req.body.endDate){
            query = query.concat([{$match:{'createdAt':{$lte:endDate}}},])
        }
        if(req.body.minCount){
        query = query.concat([{$match:{'totalCount':{$gte:minCount}}},])
        }
        if(req.body.maxCount){
            query = query.concat([{$match:{'totalCount':{$lte:maxCount}}},])
        }
        Record.aggregate(query,(err,result)=>{
            if(err){res.send(err)}
            if(result.length > 0){ // Check if the result has records in it
                response.records = result;
            } else {
                response.code=1;
                response.msg="No Records";
                response.records = result
            }
            if(minCount>maxCount){ // Check if minCount is greater than maxCount
                response.code = 2,
                response.msg = "minCount can not be greater than maxCount"
            }
            if(startDate>endDate){ // Check if startDate is greater than endDate
                response.code = 3,
                response.msg = "startDate can not be greater than endDate"
            }
            res.json(response);
        })
    }
}