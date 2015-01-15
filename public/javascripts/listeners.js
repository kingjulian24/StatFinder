/* global $: flase, confirm: false */
var loc       = require('./loc.js');
var layouts   = require('./layouts.js');
var idCheck   = require('./idCheck.js');

module.exports = {

  init: function (config) {

    this.$tblData         = config.$tblData;
    this.$modalContainer = config.$modalContainer;

  },
  resetModal: function(layout) {
    // clear modal & add new modal
    this.$modalContainer.html('').
        append(layout);

  },
  resetModalBody: function(layout) {

    // delete modal body and add new body
    this.$modalBody.html('').
    append(layout);

  },
  tblDataListener: function () {
    var self = this;
    // product row listener
    this.$tblData.on('click', function(){

      // save tblData data
      self.$currentRowData = $(this).parent().data("data");

      // reset modal
      self.resetModal(layouts.modal(self.$currentRowData));

      // save new elements
      self.$editBtn = $('.edit-btn');
      self.$viewSrcBtn = $('.view-source-btn');

      // show modal
      $('#myModal').modal('show');


      // save modal body
      self.$modalBody = $('.modal-body');

      // add listener for new modal
      self.editBtnListener();
      self.srcBtnListener();

    });

  },
  editBtnListener: function () {
    var self = this;
    this.$editBtn.on('click', function(){
      //change edit btn to back btn
      $(this).html('Back').
      addClass('back-btn').
      removeClass('edit-btn').
      blur().
      after('<form class="delete-form" action="/delete?loc='+ loc +'&id='+ self.rowData.id +'" style="display:inline;" method="post"><button type="submit" class="btn btn-default delete-btn">Delete</button></form>'); // add delete btn

      // save new elements
      self.$deleteBtn = $('.delete-btn');
      self.$deleteForm = $('.delete-form');
      self.$bkBtn = $('.back-btn');

      // remove source btn
      self.$viewSrcBtn.remove();

      // reset modal with edit form
      self.resetModalBody(layouts.editForm( self.$currentRowData, { new: false , loc: loc } ));

      self.bkBtnFromEditListener();
      self.deleteFormListener();

    });
  },
  deleteFormListener: function() {
    // delete confirmation
    this.$deleteForm.on('submit',function(){
      return confirm('Are you sure?');
    });
  },
  newProductFormListener: function  () {
    $('.new-product-form').on('submit', function () {

      var id = $('.new-product-form #id').val(),
        store = $('.new-product-form #store').val();


        if(!idCheck(id, store)){
          $('.modal-title').html('').
            append(
              $('<h3>', {
                text: 'Sorry, wrong id/store combination',
                class: 'alert bg-danger'
              })
            );
          return false;
        }
    });
  },
  bkBtnFromEditListener: function () {
    var self = this;
    this.$bkBtn.on('click',function (){

      // change edit btn to back btn
      $(this).html('Edit').
      addClass('edit-btn').
      removeClass('back-btn').
      blur().
      before('<button type="button" class="btn btn-default view-source-btn">View Source</button>');

      // save new elements
      self.$editBtn = $('.edit-btn');
      self.$viewSrcBtn = $('.view-source-btn');

      // remove delete btn
      self.$deleteBtn.remove();

      self.resetModalBody(layouts.productBodyModal(self.$currentRowData));

      // liseten for new elements
      self.editBtnListener();
      self.srcBtnListener();
    });
  },
  bkBtnFromSrcListener: function () {
    var self = this;
    this.$bkBtn.on('click',function (){

      // change edit btn to back btn
      $(this).html('View Source').
      addClass('view-source-btn').
      removeClass('back-btn').
      blur().
      after('<button type="button" class="btn btn-default edit-btn">Edit</button>');

      // save new elements
      self.$editBtn = $('.edit-btn');
      self.$viewSrcBtn = $('.view-source-btn');

      // delete modal body and add new body
      self.resetModalBody(layouts.productBodyModal(self.$currentRowData));

      // liseten for new elements
      self.editBtnListener();
      self.srcBtnListener();
    });
  },
  addNewProductBtnListener: function () {
    var self = this;
    $('.add-new-product').on('click',function(){
      self.$modalContainer.html(''). // reset modal
      append(layouts.blankModal('NEW'));
      $('.modal-body').append(layouts.editForm({},{new:true, loc:loc}));
      $('#myModal').modal('show');

      self.newProductFormListener();
    });
  },
  srcBtnListener: function () {
    var self = this;

    this.$viewSrcBtn.on('click', function(){

      // add back button
      $(this).html('Back').
      addClass('back-btn').
      removeClass('view-source-btn').
      blur();

      //remove edit btn
      self.$editBtn.remove();

      // reset modal body and add iframe
      self.resetModalBody(layouts.iframeBody(self.$currentRowData));

      // save new elements
      self.$bkBtn = $('.back-btn');


      self.bkBtnFromSrcListener();
      self.iframeOnLdListener();

    });
  },
  iframeOnLdListener: function () {
    $('iframe').on('load', function(){
      $('#loading').remove();
    });
  }

};
