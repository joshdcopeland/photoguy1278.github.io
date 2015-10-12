//controllers in own file: https://youtu.be/6J08m1H2BME?t=3135
var app = angular.module("app", ['ngAnimate']);
app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
//*****  CONTROLLERS *****//

app.controller('MainCtrl', function($scope, $rootScope) {
  $scope.companies = [
    {
      "id": "0",
      "name":"charity: water",
      "code":"100",
      "description":"HOW WE WORK\nWe invest the money we raise into organizations with years of experience to build sustainable, community-owned water projects around the world. Our team works closely to ensure that every dollar is accounted for and then provides reports back to our donors. Learn about our approach, the solutions we fund and our partners on the ground.\nOUR PROGRESS\nWe're passionate about solving the water crisis in our lifetime, using 100% of all public donations to fund water projects, and proving where every dollar goes with photos and GPS coordinates. Here's the progress we've made since we started working in 2006.\nWHERE WE WORK\nWe fund water programs in 24 countries around the globe - in Africa, Asia, Central and South America. Water scarcity, poverty, political stability and strong partner organizations all play a part in where we choose to work. We focus on providing rural communities with their first access to clean water.\n STORIES FROM THE FIELD\nOur time in the field gives us a personal view on what it's like to get clean water for the first time. The mothers, children and communities that we’ve met inspire our ideas and, often times, solutions. Every one of them has a story worth sharing.\nTHE FUTURE IS BRIGHT \n We're not just about funding new wells, we're also taking care of the ones we've already built. This is how we ensure that our water projects continue to provide clean water to communities long after they are installed. Pipeline is a system of local leaders, innovative technology and trained mechanics all working together to keep water flowing at charity: water projects around the world.",
      "imageUrl":"http://d11sa1anfvm2xk.cloudfront.net/media/downloads/logos/cw_vertical_black.jpg",
      "url":"https://donate.charitywater.org/donate"
    },
    {
      "id": "1",
    "name":"Crowdrise \"Nepal Earthquake Relief\" ",
    "code":"101",
    "description":"Thousands of people have been killed by a massive 7.9 magnitude earthquake that hit Nepal on April 25, 2015. There is widespread devastation across Nepal. The death toll, now over 2,500, continues to rise as search and rescue efforts are underway in Kathmandu and across the country. People are still trapped under collapsed buildings in Kathmandu, and there is no way to accurately guess how many are in need throughout the other cities and thousands of villages at this time. We have been hearing that villages - especially those closest to the epicenter - have been the most devastated. Some initial reports suggest that many villages have been totally flattened by the quake. There have been dozens of tremors and aftershocks since the first earthquake, further destabilizing structures and complicating rescue efforts.",
    "imageUrl":"https://www.crowdrise.com/media/large/quake-553bbe0e6d9f6.jpg?553f286ee632c",
    "url":"https://www.crowdrise.com/NepalEarthquakeFund"
    }
  ];
  
  $scope.history = [
    {
      "id": 0,    
      "name":"charity: water",
      "code":"100",
      "time":"2015-05-09T18:00:37",
      "bucks":"10.0000",
      "balance":"21.00"
    },
    {
      "id": 1,    
      "name":"charity: water",
      "code":"100",
      "time":"2015-05-09T18:05:08",
      "bucks":"5.0000",
      "balance":"16.00"
    },
    {
      "id": 2,    
      "name":"charity: water",
      "code":"100",
      "time":"2015-05-09T18:08:58",
      "bucks":"5.0000",
      "balance":"11.00"
    },
    {
      "id": 3,    
      "name":"charity: water",
      "code":"100",
      "time":"2015-05-09T18:14:34",
      "bucks":"3.0000",
      "balance":"8.00"
    },
    {
      "id": 4,    
      "name":"charity: water",
      "code":"100",
      "time":"2015-05-22T09:48:57",
      "bucks":"1.0000",
      "balance":"7.00"
    },
    {
      "id": 5,    
      "name":"FILLUP",
      "code":"NULL",
      "time":"2015-05-22T09:48:57",
      "bucks":"10.0000",
      "balance":"17.00"
    }, 
    {
      "id": 6,
      "name":"Crowdrise \"Nepal Earthquake Relief\"",
      "code":"101",
      "time":"2015-06-08T07:02:43",
      "bucks":"1.0000",
      "balance":"16.00"
    } 
    
  ];
  
    $rootScope.searchItems = [
    "charity: water",
    "Crowdrise \"Nepal Earthquake Relief\" "
  ];
	//Sort Array//
	$rootScope.searchItems.sort();
	//Define Suggestions List
	$rootScope.suggestions = [];
	//Define Selected Suggestion Item
	$rootScope.selectedIndex = -1;
  
  //function to call on ng-change
  $rootScope.search = function () {
    $rootScope.suggestions = [];
    var myMaxSuggestionListLength = 0;
    for (var i = 0; i<$rootScope.searchItems.length; i++) {
      var searchItemsSmallLetters = angular.lowercase($rootScope.searchItems[i]);
      var searchTextSmallLetters = angular.lowercase($scope.searchText);
      if(searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1){
        $rootScope.suggestions.push(searchItemsSmallLetters);
        myMaxSuggestionListLength += 1;
        if(myMaxSuggestionListLength == 5) {
          break;
        }
      }
    }
  }
    //===================================AUTOCOMPLETE ==============================
  
  //Keep Track Of Search Text Value During The Selection From The Suggestions List  
  $rootScope.$watch('selectedIndex', function(val) {
    if(val !== -1) {
      $scope.searchText = $rootScope.suggestions[$rootScope.selectedIndex];
    } 
  });
  
  //Text Field Events
  //Function to Call on ng-keydown
  $rootScope.checkKeyDown = function(event){
    if(event.keyCode === 40) { //down key, increment selectedIndex
      event.preventDefault();
      if($rootScope.selectedIndex+1 !== $rootScope.suggestions.length) {
        $rootScope.selectedIndex++;      
      }
    } else if(event.keyCode === 38) { //up key, decrement selectedIndex
      event.preventDefault();
      if($rootScope.selectedIndex-1 !== -1) {
        $rootScope.selectedIndex--;
      }  
    } else if(event.keyCode === 13) {//enter key, empty suggestions array
      event.preventDefault();
      $rootScope.suggestions = [];
    }
  }
  // function to call on ng-keyup
  $rootScope.checkKeyUp = function(event){
    if(event.keyCode !== 8 || event.keyCode !== 46){ //delete or backspace
      if($scope.searchText == "") {
        $rootScope.suggestions = [];
      }
    }
  }
  //===================================
  //list Item Events
  //Function to call on ng-click
  $rootScope.AssignValueAndHide = function(index) {
    $scope.searchText = $rootScope.suggestions[index];
    $rootScope.suggestions = [];
  }
  //======================================== END AUTOCOMPLETE ==============================
  
  //============================== BUCKIT ==================
  $scope.currentCompany = null;
  
  function setCurrentComapny(company) {
    $scope.currentCompany = company;
    
  }  
  
  $scope.setCurrentCompany = setCurrentComapny;
 
  //=================== BUCKIT STATES ==================
  
  
  function shouldShowBuckit() {
    return $scope.currentCompany;
  }
  
  function cancelBuckit() {
    $scope.currentCompany = null; 
  }

  $scope.cancelBuckit = cancelBuckit;
  $scope.shouldShowBuckit = shouldShowBuckit;
  
  //use passed name to find the object in companies array with macthing name 
  function populateBuckit(company) {
		$scope.shouldGlow = false;
    var index = _.findIndex($scope.companies, function(b) {
      return angular.lowercase(b.name) == angular.lowercase(company);
    });
    
    $scope.company = $scope.companies[index];
    $scope.bucksPaid = 1;
  }
  //add function to scope
  $scope.populateBuckit = populateBuckit;  
  
  function upBuckit() {
    $scope.bucksPaid += 1;
    console.log("up");
    
  }
  function downBuckit() {
    $scope.bucksPaid -= 1;
    if ($scope.bucksPaid <= 0) {
      $scope.bucksPaid = 1;
    }
  }
  function setBuckit(amount){
    $scope.bucksPaid  = amount;
    if ($scope.bucksPaid <= 0) {
      $scope.bucksPaid = 1;
    }
  }
  $scope.downBuckit = downBuckit;
  $scope.upBuckit = upBuckit;
  $scope.setBuckit = setBuckit;
  $scope.shouldShowSetBucket = false;
  
  function toggleShowSetBuckit(){
    $scope.shouldShowSetBucket = !$scope.shouldShowSetBucket;   
  }
  
  $scope.toggleShowSetBuckit = toggleShowSetBuckit;
  
  

  
   
  function payBuckit(bucksPaid, company) {
    var eventCompany = {};
    eventCompany.name = company.name;
    eventCompany.code = company.code;
    eventCompany.id = parseInt($scope.history.length);
    eventCompany.bucks = bucksPaid;
    eventCompany.time =   new Date();
    eventCompany.balance = parseInt($scope.history[$scope.history.length - 1].balance) - parseInt(bucksPaid);
    $scope.history.push(eventCompany);
    $scope.searchText = '';
    console.log($scope.history);
		makeGlow();
  }
  $scope.payBuckit = payBuckit;
	
	//============================== FILLUP ==================//
  $scope.shouldShowFillup = false;
	
  function toggleShowFillup(){
    $scope.shouldShowFillup = !$scope.shouldShowFillup;
		$scope.shouldGlow = false;
  };
  
  $scope.toggleShowFillup = toggleShowFillup;
  
  $scope.fillupAmount = 1;
  
  function setFillup(amount) {
    var eventCompany = {};
    eventCompany.name = 'FILLUP';
    eventCompany.code = 'NULL';
    eventCompany.id = parseInt($scope.history.length);
    eventCompany.bucks = amount;
    eventCompany.time =   new Date();
    eventCompany.balance = parseInt($scope.history[$scope.history.length - 1].balance) + parseInt(amount);
    $scope.history.push(eventCompany);
    console.log(amount);
    toggleShowFillup();
		makeGlow();
  }
  
  $scope.setFillup = setFillup;
  
	$scope.shouldGlow = false;
	
	function makeGlow(){	
		$scope.shouldGlow = true;
	}
	
	$scope.makeGlow = makeGlow;

});




//*****  Directives  *****//



//********************************************//