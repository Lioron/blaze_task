var reports = angular.module('reports', [])

reports.controller("ReportsController", ["$scope", "$http", function(scope, http){

	scope.menuState = 'hide-reports';

	scope.isLoading = '';

	scope.showMenu = function(){
		scope.menuState = 'show-reports';
	}

	scope.getData = function(){
		scope.isLoading = 'loading-rotate';

		http.get("sidebar.json")
			.success(function(data, status, headers, config){
				scope.reports = data.result;

				scope.isLoading = '';
			});
	}

	scope.getData();

	scope.counter = function(){
		var totalReports = 0;

		function countSessions(data){
			if(data){
				data.forEach(function(session, index){
						countSessions(session.sessions);
					totalReports++;
				});
			}
		}

		countSessions(scope.reports);

		return totalReports;
	}
}]);
