var app = angular.module("myapp", []);

app.controller("ListController", ['$scope', function($scope) {

    $scope.eventDetails = [];
    $scope.returnDetails = [];

    $scope.hours = ["0", "0.5","1","1.5", "2","2.5","3","3.5","4","4.5","5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11","11.5","12"];
    $scope.minutes = ["0", "15", "30", "45"];
    $scope.realHours = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    $scope.am = ["AM", "PM"];
        
        $scope.addNew = function(eventDetail){
            $scope.eventDetails.push({ 
                'ename': "", 
                'eduration': "",
                'edeadline': "",
                'ehdue' : "",
                'emdue' : "",
                'epmdue': "",
            });

        };
    
        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.eventDetails, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.eventDetails = newDataList;
        };
    
    $scope.checkAll = function () {
    	window.alert($scope.selectedAll);
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.eventDetails, function(eventDetail) {
            eventDetail.selected = $scope.selectedAll;
        });
    };  

    $scope.submit = function(){
    	var newDataList=[];
    	$scope.returnDetails = [];
        $scope.selectedAll = false;
    	angular.forEach($scope.eventDetails, function(selected){
            if(selected.selected){
                newDataList.push({
                	'ename': selected.ename, 
                	'eduration': selected.eduration,
                	'edeadline': selected.edeadline,
                	'ehdue' : selected.ehdue,
                	'emdue' : selected.emdue,
                	'epmdue' : selected.epmdue,
                });
                alert(newDataList[0]);
                alert(newDataList[0].eduration);
            }
        }); 
        alert(newDataList[1].eduration);
        $scope.returnDetails = newDataList;
        $scope.remove();
    }  
       
}]);
