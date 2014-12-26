var sortProduct = function (obj,sortby,asc,num){
  console.log('hhhhhhhh: '+sortby);
                    var newObj = obj.slice(0);

                    newObj.sort(function(a,b) {
                        
                        //text
                        if(!num){
                            var x = a[sortby].toLowerCase();
                            var y = b[sortby].toLowerCase();
                            if (!asc) {
                              return x > y ? -1 : x < y ? 1 : 0;
                            } else {
                              return x < y ? -1 : x > y ? 1 : 0;
                            }
                        //number
                        } else {
                            if(!asc) {
                              return a[sortby] - b[sortby];
                            } else {
                              return b[sortby] - a[sortby];
                            }
                          
                        }
                        
                    });
                    return newObj;

                  };
module.exports = sortProduct;