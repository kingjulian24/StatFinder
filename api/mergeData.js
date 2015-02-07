
    // check for deviation
    function deviated (spR, mpR, data) {
      var sp = parseInt(spR, 10);
      var mp = parseInt(mpR, 10);
      // limits
      var upperLimit = data.upperLimit + mp;
      var lowerLimit = mp - data.lowerLimit;
      return ( (sp > upperLimit) || (sp < lowerLimit) ) ? true : false;
    }

    
    // merge objects
    exports.init = function (storeData, formData, callback){

        var data = {
            _id         : formData.id,
            title       : storeData.title,
            store_name  : storeData.storeName,
            my_price    : parseInt(formData.myPrice),
            store_price : parseInt(storeData.storePrice),
            upper_limit : formData.upperLimit,
            lower_limit : formData.lowerLimit,
            description : storeData.description,
            image       : storeData.image,
            link        : storeData.link,
            instock     : storeData.stock,
            deviated    : deviated(storeData.storePrice, formData.myPrice, formData),
            store_id    : storeData.storeID,
            timestamp   : new Date().getTime(),
            status      : formData.status //storeData.stock ? 'isv' : 'osuv' //formData.status
        };

        callback(data);
    };

    