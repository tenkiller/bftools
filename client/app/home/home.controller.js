(function () {
  'use strict';
  angular.module('bfTools').controller('homeController', ['dataService', homeController]);

  function homeController(dataService) {
    var vm = this;

    vm.title = 'bfGrid';

    vm.grid = {
      source: dataService.comics,
      columns: [
        { title: '', field: 'grade', width: 5 },
        { title: '', template: '<button type="button"><strong><em>I</em></strong></button>', width: 36 },
        { title: 'Volume', field: 'volume', width: 60 },
        { title: 'Issue', field: 'issue', width: 40 },
        { title: 'Title', field: 'title' },
        { title: 'Month', field: 'month', width: 60 },
        { title: 'Year', field: 'year', width: 60 },
        { title: 'Publisher', field: 'publisher' },
        { title: 'Price', field: 'price' },
        { title: 'Value', field: 'value' },
        { title: 'Id', field: 'id', hidden: true }
      ],
      pageable: false,
      pageSize: 10,
      height: 200
    };
  }
})();