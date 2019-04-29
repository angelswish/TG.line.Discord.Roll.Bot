if (process.env.mongoURL) {
    const mongoose = require('mongoose');
    let uristring = process.env.mongoURL;
    mongoose.connect(uristring, {
        useNewUrlParser: true
    });
    var Schema = mongoose.Schema;
    //export 
    var switchJson;
    var ObjectId = mongoose.Schema.Types.ObjectId;
    mongoose.connect(uristring, function (err, res) {
        if (err) {
            console.log('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
            console.log('Succeeded connected to: ' + uristring);
            // console.log('allswitch: ' + allswitch);
            functionSwitch.find({})
                .exec(function (error, posts) {
                    switchJson = posts.map(function (p) {
                        return p.toJSON()
                    });
                    switchJson.forEach(function (functionSwitch) {
                        if (functionSwitch.groupid == '002') console.log('DONE');
                    });
                })
        }
    });

    const functionSchema = new Schema({

        groupid: ObjectId,

        user: {
            userid: String,
            admin: Boolean
        },
        function_name: Array,
        switch: String
    });
    const GroupSchema = new Schema({
        group: {
            groupid: String
        },
        user: {
            userid: String,
            admin: Boolean
        },
        function_name: Array,
        switch: String
    });


    // Compiles the schema into a model, opening (or creating, if
    // nonexistent) the 'PowerUsers' collection in the MongoDB database
    var functionSwitch = mongoose.model('functionSwitchs', functionSchema);

    module.exports = {
        functionSwitch: functionSwitch,
        Schema: Schema
    };

}