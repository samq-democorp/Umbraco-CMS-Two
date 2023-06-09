function includePropsPreValsController($rootScope, $scope, localizationService, contentTypeResource) {

    if (!$scope.model.value) {
        $scope.model.value = [];
    }

    $scope.hasError = false;
    $scope.errorMsg = "";

    $scope.propertyAliases = [];
    $scope.selectedField = null;
    $scope.systemFields = [
        { value: "sortOrder", localizedKey: "general_sort" },
        { value: "updateDate", localizedKey: "content_updateDate" },
        { value: "updater", localizedKey: "content_updatedBy" },
        { value: "createDate", localizedKey: "content_createDate" },
        { value: "owner", localizedKey: "content_createBy" },
        { value: "published", localizedKey: "content_isPublished" },
        { value: "contentTypeAlias", localizedKey: "content_documentType" },
        { value: "email", localizedKey: "general_email" },
        { value: "username", localizedKey: "general_username" },
        { value: "failedPasswordAttempts", localizedKey: "user_failedPasswordAttempts" },
        { value: "approved", localizedKey: "user_stateApproved" },
        { value: "lockedOut", localizedKey: "user_stateLockedOut" },
        { value: "lastLockoutDate", localizedKey: "user_lastLockoutDate" },
        { value: "lastLoginDate", localizedKey: "user_lastLogin" },
        { value: "lastPasswordChangeDate", localizedKey: "user_lastPasswordChangeDate" }
    ];

    $scope.getLocalizedKey = function (alias) {
        const translationKey = $scope.systemFields.find(x => x.value === alias)?.localizedKey;
        return translationKey !== undefined ? translationKey : alias;
    }

    $scope.changeField = function () {
        $scope.hasError = false;
        $scope.errorMsg = "";
    }

    $scope.removeField = function (e) {
        var index = $scope.model.value.indexOf(e);
        $scope.model.value.splice(index, 1);
    }

    //now we'll localize these strings, for some reason the directive doesn't work inside of the select group with an ng-model declared
    _.each($scope.systemFields, function (e, i) {
        var key = $scope.getLocalizedKey(e.value);
        localizationService.localize(key).then(function (v) {
            e.name = v;

            switch (e.value) {
                case "published":
                case "updater":
                    e.name += " (Content only)";
                    break;
                case "username":
                case "email":
                case "failedPasswordAttempts":
                case "approved":
                case "lockedOut":
                case "lastLockoutDate":
                case "lastLoginDate":
                case "lastPasswordChangeDate":
                    e.name += " (Members only)";
                    break;
            }

        });
    });

    // Return a helper with preserved width of cells
    var fixHelper = function (e, ui) {
        ui.children().each(function () {
            $(this).width($(this).width());
        });

        var row = ui.clone();
        row.css("background-color", "lightgray");

        return row;
    };

    $scope.sortableOptions = {
        helper: fixHelper,
        handle: ".handle",
        opacity: 0.5,
        axis: 'y',
        containment: 'parent',
        cursor: 'move',
        items: '> tr',
        tolerance: 'pointer',
        forcePlaceholderSize: true,
        start: function(e, ui){
            ui.placeholder.height(ui.item.height());
        },
        update: function (e, ui) {
            
            // Get the new and old index for the moved element (using the text as the identifier)
            var newIndex = ui.item.index();
            var movedAlias = $('.alias-value', ui.item).text().trim();
            var originalIndex = getAliasIndexByText(movedAlias);

            // Move the element in the model
            if (originalIndex > -1) {
                var movedElement = $scope.model.value[originalIndex];
                $scope.model.value.splice(originalIndex, 1);
                $scope.model.value.splice(newIndex, 0, movedElement);
            }
        }
    };

    contentTypeResource.getAllPropertyTypeAliases().then(function(data) {
        $scope.propertyAliases = data;
    });

    $scope.addField = function () {

        var val = $scope.selectedField;
        if (val) {
            var isSystem = val.startsWith("_system_");
            if (isSystem) {
                val = val.trimStart("_system_");
            }

            var exists = _.find($scope.model.value, function (i) {
                return i.alias === val;
            });

            if (!exists) {
                $scope.hasError = false;
                $scope.errorMsg = "";

                $scope.model.value.push({
                    alias: val,
                    isSystem: isSystem ? 1 : 0
                });
            }
            else {
                //there was an error, do the highlight (will be set back by the directive)
                $scope.hasError = true;
                $scope.errorMsg = "Property is already added";
            }
        }
        else {
            $scope.hasError = true;
            $scope.errorMsg = "No property selected";
        }
    }

    function getAliasIndexByText(value) {
        for (var i = 0; i < $scope.model.value.length; i++) {
            if ($scope.model.value[i].alias === value) {
                return i;
            }
        }

        return -1;
    }

}


angular.module("umbraco").controller("Umbraco.PrevalueEditors.IncludePropertiesListViewController", includePropsPreValsController);
