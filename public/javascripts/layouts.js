// new modal
exports.blankModal = function (title){
  return '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">'+title+'</h4> </div><div class="modal-body"> </div><div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div></div></div></div>';
};


// source/edit/delete modal
exports.getModalTemplate =   function (data) {
  /*jshint multistr: true */
  var profitLoss = data.profitLoss ? 'Yes' : 'No';
  var instock = data.instock ? 'Yes' : 'No';

  var layout = '\
    <div class="modal fade" id="myModal">\
      <div class="modal-dialog">\
        <div class="modal-content">\
          <div class="modal-header">\
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span>\
            </button>\
            <h4 class="modal-title">'+data.title+'</h4> \
          </div>\
          <div class="modal-body">\
            <div class="row">\
              <div class="col-xs-4">\
                <img src="'+data.image+'" class="img-responsive" />\
              </div>\
              <div class="col-xs-8">\
                <p><strong>ID: </strong>'+data.id+'</p>\
                <p><strong>Last Updated: </strong>'+data.timestamp+'</p>\
                <p><strong>StorePrice: </strong>'+data.storePrice+'</p>\
                <p><strong>My Price: </strong>'+data.myPrice+'</p>\
                <p><strong>ProfitLoss: </strong>'+ profitLoss +'</p>\
                <p><strong>Instock: </strong>'+instock +'</p>\
                <p><strong>Description: </strong>'+data.description+'</p>\
              </div>\
            </div>\
          </div>\
          <div class="modal-footer">\
            <button type="button" class="btn btn-default view-source-btn">View Source</button>\
            <button type="button" class="btn btn-default  edit-btn">Edit</button>\
          </div>\
        </div>\
      </div>\
    </div>';

  return layout;
};

exports.productBodyModal = function (data) {
    var profit = parseInt(data.myPrice) - parseInt(data.storePrice);
    /*jshint multistr: true */
    var layout = '\
    <div class="row">\
      <div class="col-xs-4">\
        <img src="'+data.image+'" class="img-responsive" />\
      </div>\
      <div class="col-xs-8">\
        <p><strong>StorePrice: </strong>$'+data.storePrice+'</p>\
        <p><strong>My Price: </strong>$'+data.myPrice+'</p>\
        <p><strong>Profit: </strong>$'+profit+'</p>\
        <p><strong>Description: </strong>'+data.description+'</p>\
      </div>\
    </div>';
    return layout;
  };

  exports.iframeBody = function (data) {
    /*jshint multistr: true */
    var layout = '<div id="loading"><img src="http://www.windowdesigngroup.com/images/loading.gif" /></div>\
    <iframe src="'+data.link+'" style="width: 100%; height: 600px;">\
    <p>Your browser does not support iframes.</p>\
    </iframe>';

    return layout;
  };


  exports.editForm = function  (data,config) {
    var layout;
    var checked = data.osv ? 'checked' : '';
    if(config.new){
      layout = '<form class="form-horizontal new-product-form" action="/save?action=Added" method="post">\
                 <fieldset>\
                  <legend>Add New Product</legend>\
                  <div class="form-group">\
                    <label class="col-md-4 control-label" for="id">Product ID</label>\
                    <div class="col-md-6">\
                      <input id="id" name="id" type="text" placeholder="Enter product id" class="form-control input-md" required="">\
                     </div>\
                   </div>\
                   <div class="form-group">\
                    <label class="col-md-4 control-label" for="store">Store</label>\
                    <div class="col-md-6">\
                      <select id="store" name="store" class="form-control">\
                        <option value="">Select</option>\
                        <option value="hn">Hayneedle</option>\
                        <option value="wm">Walmart</option>\
                        <option value="wf">Wayfair</option>\
                      </select>\
                    </div>\
                   </div>\
                   <div class="form-group">\
                    <label class="col-md-4 control-label" for="price">Your Price</label>\
                    <div class="col-md-6">\
                      <input id="price" name="my-price" type="number" placeholder="Enter your price" class="form-control input-md" required="">\
                    </div>\
                  </div>\
                   <div class="form-group">\
                    <label class="col-md-4 control-label" for="limit">Min Profit</label>\
                    <div class="col-md-6">\
                      <input id="min-profit" name="min-profit" type="text" placeholder="Enter minimum profit" class="form-control input-md" required="">\
                    </div>\
                  </div>\
                  <div class="form-group"> \
                    <label class="col-md-4 control-label osv-label" for="limit">OSV</label> \
                    <div class="col-md-6"> \
                      <input id="osv" name="osv" type="checkbox" /> \
                    </div> \
                  </div>  \
                   <div class="form-group">\
                    <label class="col-md-4 control-label" for="submit"></label>\
                    <div class="col-md-6">\
                      <button id="submit" type="submit" name="submit" class="btn btn-success">Submit</button>\
                    </div>\
                   </div>\
                  </fieldset>\
                 </form>';
    } else {
      layout = '<form class="form-horizontal new-product-form" action="/save?ction=Updated" method="post">\
                  <fieldset>\
                      <legend>Product Price: '+data.storePrice+'</legend>\
                      <div class="form-group">\
                          <label class="col-md-4 control-label" for="id">Product ID</label>\
                          <div class="col-md-6">\
                              <input id="id" name="id" type="text" placeholder="Enter product id" class="form-control input-md" value="'+data.id+'" required="" /> \
                          </div>\
                      </div>\
                      <div class="form-group">\
                          <label class="col-md-4 control-label" for="store">Store</label>\
                          <div class="col-md-6">\
                              <select id="store" name="store" class="form-control">\
                                  <option value="'+data.storeID+'">'+data.storeName+'</option>\
                              </select>\
                          </div>\
                      </div>\
                      <div class="form-group">\
                          <label class="col-md-4 control-label" for="price">Your Price</label>\
                          <div class="col-md-6">\
                              <input id="price" name="my-price" type="number" placeholder="Enter your price" class="form-control input-md" value="'+data.myPrice+'" required=""> \
                           </div>\
                      </div>\
                      <div class="form-group">\
                          <label class="col-md-4 control-label" for="limit">Min Profit</label>\
                          <div class="col-md-6">\
                              <input id="min-profit" name="min-profit" type="text" placeholder="Enter minimum profit" class="form-control input-md" value="'+data.minProfit+'" required=""> \
                          </div>\
                      </div>\
                      <div class="form-group"> \
                        <label class="col-md-4 control-label osv-label" for="limit">OSV</label> \
                        <div class="col-md-6"> \
                          <input id="osv" name="osv" type="checkbox" '+checked+'/> \
                        </div> \
                      </div>  \
                      <div class="form-group">\
                          <label class="col-md-4 control-label" for="submit"></label>\
                          <div class="col-md-6">\
                              <button id="submit" type="submit" name="submit" class="btn btn-success">Submit</button>\
                          </div>\
                      </div>\
                  </fieldset>\
              </form>';
    }
    return layout;
  };


   exports.deleteBtn = function (serverUrl, id) {
    return '<form class="delete-form" action="'+serverUrl+'/delete?id='+ id +'" style="display:inline;" method="post"> \
              <button type="submit" class="btn btn-default delete-btn">Delete</button> \
          </form>';
   };

 



















