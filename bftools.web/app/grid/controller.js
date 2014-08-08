﻿(function (app) {
  app.controller('gridController', gridController);

  function gridController($scope) {
    var vm = this, options, params;

    // get the options for this grid from its isolated scope
    options = $scope.options;
    // define the query string paramaters used for http get requests
    params = { skip: 0, take: options.pageSize };

    // indicate that the grid is doing work
    vm.working = true;
    // init grid paging
    vm.pageable = options.pageable;
    vm.curPage = vm.numPages = 1;
    vm.pages = [];
    // configure grid height
    vm.height = (angular.isNumber(options.height)) ? options.height + 'px' : 'auto';
    // configure grid columns
    vm.cols = configColumns(options.columns);
    // populate data into the grid
    vm.response = getData.call(vm, options.source, params);

    vm.back = function (e) {
      e.stopPropagation();
      navigateBack.call(this, options.source, params);
    };

    vm.forward = function (e) {
      e.stopPropagation();
      navigateForward.call(this, options.source, params);
    };

    vm.goto = function (page) {
      navigateTo.call(this, options.source, params, page);
    };
  }

  function initColumnWidths(columns) {
    var i, cols = columns;
    for (i = 0; i < columns.length; i++) {
      cols[i].width = (angular.isUndefined(columns[i].width)) ? 'auto' : columns[i].width + 'px';
    }
    return cols;
  }

  function configColumns(columns) {
    var cols = initColumnWidths(columns);

    return cols;
  }

  function getData(source, params) {
    var self = this;

    self.working = true;

    return source.get(params, function (response, headers) {
      self.numPages = Math.ceil(response.total / params.take);

      if (self.pages.length !== self.numPages) {
        self.pages = [];

        for (var i = 1; i <= self.numPages; i++) {
          // TODO: handle cases where numPages > 10
          self.pages.push(i);
        }
      }

      self.working = false;
    });
  }

  function navigateBack(source, params) {
    var self = this;

    if (self.curPage === 1) { return; }

    params.skip = (--self.curPage - 1) * params.take;
    self.response = getData.call(self, source, params);
  }

  function navigateForward(source, params) {
    var self = this;

    if (self.curPage + 1 > self.numPages) { return; }

    params.skip = self.curPage++ * params.take;
    self.response = getData.call(self, source, params);
  }

  function navigateTo(source, params, page) {
    var self = this;

    if (page > self.numPages) { return; }

    if (page > 0) {
      self.curPage = page;
      params.skip = (self.curPage - 1) * params.take;
      self.response = getData.call(self, source, params);
    }
  }

})(angular.module('bfTools'));