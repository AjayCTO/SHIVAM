'use strict';
app.controller('homeController', ['$scope','log', function ($scope, log) {
    $scope.Person = {};
    $scope.People = {};
    $scope.IsEditMode = false;
    $scope.pagetitle = "Add";

    var Newurl = "http://angularPro.shivamitconsultancy.com/api/People/";



    $scope.OpenAddPanel = function () {
        $scope.pagetitle = "Add";
        $('#full-panel-example').attr("class", "panel-full active");
        $('#full-panel-example').attr("style", "visibility:visible");
    }
    $scope.AddNewItem=function()
    {
       
        $("#modal2").attr("style", "transform: scaleX(1); z-index: 1003; display: block; opacity: 1; top: 10%;");
    }
    $scope.closeModal = function () {

        $("#modal2").removeAttr("style");
    }
    $scope.addPerson = function () {

        if ($("#personName").val() != "") {

            $.ajax({
                url: Newurl,
                type: 'post',
                data: $scope.Person,
                success: function (data, textStatus, jQxhr) {
                    log.success('Patient Saved Successfully !!', 'Patient Success');
                    $scope.getPeople();
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    log.success('Error occured.', 'Patient data');
                }
            });

        }
        else {
            log.success('Please enter atleast patient name.', 'Patient data');
        }

    }
    $scope.getPeople = function () {

        $.ajax({
            url: Newurl,
            type: 'get',
            success: function (data, textStatus, jQxhr) {
                $scope.Person = {};
                $scope.closeModal();
                
                log.success('Patient loaded Successfully !!');
                $scope.People = data;
               
                $scope.$apply();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                log.error('Error occured.', 'Patient data');
            }
        });
    };
    $scope.updatePerson = function (Person) {

        $.ajax({
            url: Newurl + Person.Id,
            type: 'put',
            data: Person,
            success: function (data, textStatus, jQxhr) {
                
                $scope.getPeople();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                log.success('Error occured.', 'Patient data');
            }
        });

    }

    $scope.deletePerson = function (Person) {
        if (confirm('Really want to delete this patient?')) {

            $.ajax({
                url: Newurl + Person.Id,
                type: 'delete',
                data: Person,
                success: function (data, textStatus, jQxhr) {
                     
                    $scope.getPeople();
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    log.success('Error occured.', 'Patient data');
                }
            });

        }
    }
    $scope.activeEditMode = function (Person) {
        $scope.IsEditMode = true;
        $scope.Person = Person;
        $scope.pagetitle = "Edit";
        $scope.AddNewItem();
    }

    $scope.getPeople();
}]);