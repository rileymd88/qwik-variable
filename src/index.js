/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
var qlik = window.require('qlik');
import initialProperties from './initial-properties.js';
import template from './template.html';
import definition from './definition.js';
import controller from './controller.js';
import localCSS from './style.css'; // eslint-disable-line no-unused-vars

function getCoordinates() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getCustomVariable(type, app, sheetName, window, navigator) {
  console.log(window);
  const height = window.innerHeight;
  const width = window.innerWidth;
  let result;
  switch (type) {
    case 'appId':
      result = app.id;
      break;
    case 'appName':
      const appLayout = await app.getAppLayout();
      result = appLayout.layout.qTitle;
      break;
    case 'browserDevice':
      if (width <= 800) {
        result = 'mobile';
      }
      else {
        result = 'desktop';
      }
      break;
    case 'browserHeight':
      console.log(height);
      result = height.toString();
      break;
    case 'browserWidth':
      console.log(width);
      result = width.toString();
      break;
    case 'browserLanguage':
      result = navigator.language;
      break;
    case 'browserUrl':
      result = window.location.href;
      break;
    case 'currentLocation':
      if (navigator.geolocation) {
        const position = await getCoordinates(); 
        result = `[${position.coords.longitude}, ${position.coords.latitude}]`;
        break;
      }
      else {
        result = '';
        break;
      }
    case 'sheetId':
      const { sheetId } = await qlik.navigation.getCurrentSheetId();
      result = sheetId;
      break;
    case 'sheetName':
      result = sheetName;
      break;
    default:
      result = '';
      break;
  }
  return result;
}

export default {
  initialProperties: initialProperties,
  template: template,
  definition: definition,
  controller: controller,
  paint: async function (element, layout) {
    const app = qlik.currApp(this);
    const scope = this.$scope;
    this.$scope.isInEdit = this.options.interactionState == 2;
    if (scope.isInEdit) {
      scope.containerStyle = { "display": "block" };
    }
    else {
      scope.containerStyle = { "display": "none" };
    }
    const { sheetId } = await qlik.navigation.getCurrentSheetId();
    const m = await app.getObjectProperties(sheetId);
    const sheetName = m.properties.qMetaDef.title;

    if (typeof layout.props.variables !== 'undefined') {
      layout.props.variables.map(async function (v) {
        const customVariable = await getCustomVariable(v.type, app, sheetName, window, navigator);
        app.variable.setStringValue(v.variable, customVariable);
      });
    }
  },
  support: {
    snapshot: false,
    export: false,
    exportData: false
  }
};
