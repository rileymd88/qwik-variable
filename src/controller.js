/* eslint-disable max-len */
/* eslint-disable no-console */
var qlik = window.require('qlik');


export default ['$scope', '$element', async function ($scope, $element) {
  $scope.layoutId = $scope.layout.qInfo.qId;
  const enigma = await $scope.component.model.enigmaModel;
  const layoutObj = await enigma.app.getObject($scope.layoutId);
  const sheetObj = await layoutObj.getParent();
  const sheetProps = await sheetObj.getProperties();
  const index = sheetProps.cells.findIndex(cell => cell.name === $scope.layoutId);
  let clone = { ...sheetProps };
  clone.cells[index] = {
    "name": $scope.layoutId,
    "type": "qwik-language",
    "col": -1,
    "row": -1,
    "colspan": 0,
    "rowspan": 0,
    "bounds": {
      "y": 0,
      "x": 0,
      "width": 0,
      "height": 0
    }
  };
  await sheetObj.setProperties(clone);
}];