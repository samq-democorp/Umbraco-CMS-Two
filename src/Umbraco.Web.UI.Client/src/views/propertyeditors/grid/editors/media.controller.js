angular.module("umbraco")
    .controller("Umbraco.PropertyEditors.Grid.MediaController",
    function ($scope, userService, editorService, localizationService, mediaHelper) {

        $scope.control.icon = $scope.control.icon || 'icon-picture';

        updateThumbnailUrl();

        if (!$scope.model.config.startNodeId) {
            if ($scope.model.config.ignoreUserStartNodes === true) {
                $scope.model.config.startNodeId = -1;
                $scope.model.config.startNodeIsVirtual = true;

            } else {
                userService.getCurrentUser().then(userData => {
                    $scope.model.config.startNodeId = userData.startMediaIds.length !== 1 ? -1 : userData.startMediaIds[0];
                    $scope.model.config.startNodeIsVirtual = userData.startMediaIds.length !== 1;
                });
            }
        }

        $scope.setImage = function() {
            var startNodeId = $scope.model.config && $scope.model.config.startNodeId ? $scope.model.config.startNodeId : null;

            var mediaPicker = {
                startNodeId: startNodeId,
                startNodeIsVirtual: startNodeId ? $scope.model.config.startNodeIsVirtual : null,
                cropSize: $scope.control.editor.config && $scope.control.editor.config.size ? $scope.control.editor.config.size : null,
                showDetails: true,
                disableFolderSelect: true,
                onlyImages: true,
                dataTypeKey: $scope.model.dataTypeKey,
                submit: model => {
                    updateControlValue(model.selection[0]);
                    editorService.close();
                },
                close: () => editorService.close()
            };

            editorService.mediaPicker(mediaPicker);
        };

        $scope.editImage = function() {

            const mediaCropDetailsConfig = {
                size: 'small',
                target: $scope.control.value,
                submit: model => {
                    updateControlValue(model.target);
                    editorService.close();
                },
                close: () => editorService.close()
            };

            localizationService.localize('defaultdialogs_editSelectedMedia').then(value => {
                mediaCropDetailsConfig.title = value;
                editorService.mediaCropDetails(mediaCropDetailsConfig);
            });
        }

        /**
         *
         */
        function updateThumbnailUrl() {
            if ($scope.control.value && $scope.control.value.image) {
                var options = {
                    width: 800
                };

                if ($scope.control.value.coordinates) {
                    // Use crop
                    options.crop = $scope.control.value.coordinates;
                } else if ($scope.control.value.focalPoint) {
                    // Otherwise use focal point
                    options.focalPoint = $scope.control.value.focalPoint;
                }

                if ($scope.control.editor.config && $scope.control.editor.config.size) {
                    options.width = $scope.control.editor.config.size.width;
                    options.height = $scope.control.editor.config.size.height;
                }

                mediaHelper.getProcessedImageUrl($scope.control.value.image, options).then(imageUrl => {
                    $scope.thumbnailUrl = imageUrl;
                });
            } else {
                $scope.thumbnailUrl = null;
            }
        }

        /**
         *
         * @param {object} selectedImage
         */
        function updateControlValue(selectedImage) {
            // we could apply selectedImage directly to $scope.control.value,
            // but this allows excluding fields in future if needed
            $scope.control.value = {
                focalPoint: selectedImage.focalPoint,
                coordinates: selectedImage.coordinates,
                id: selectedImage.id,
                udi: selectedImage.udi,
                image: selectedImage.image,
                caption: selectedImage.caption,
                altText: selectedImage.altText
            };

            updateThumbnailUrl();
        }
    });
