define(['./helper'], function (helper) {
  var variable = {
    ref: "variable",
    label: "Variable",
    type: "string",
    component: "dropdown",
    options: function () {
      return helper.getVariables();
    }
  };

  var type = {
    label: 'Variable type',
    component: 'expression-with-dropdown',
    dropdownOnly: false,
    type: 'string',
    ref: 'type',
    defaultValue: '',
    options: [
      { value: 'appId', label: 'App id' },
      { value: 'appName', label: 'App name' },
      { value: 'browserDevice', label: 'Browser device' },
      { value: 'browserLanguage', label: 'Browser language' },
      { value: 'browserUrl', label: 'Browser url' },
      { value: 'browserWidth', label: 'Browser width' },
      { value: 'browserHeight', label: 'Browser height' },
      { value: 'currentLocation', label: 'Current location' },
      { value: 'sheetId', label: 'Sheet id' },
      { value: 'sheetName', label: 'Sheet name' }
    ]
  };

  var config = {
    type: "items",
    label: "Variables",
    component: "items",
    items: {
      objects: {
        ref: "variablesList",
        label: "Variables",
        type: "items",
        items: {
          objects: {
            type: 'array',
            ref: 'props.variables',
            label: 'Variables',
            itemTitleRef: function (action) {
              const result = action.type.replace(/([A-Z])/g,' $1');
              const final = result.charAt(0).toUpperCase()+result.slice(1).toLowerCase();
              return final;
            },
            allowAdd: true,
            allowRemove: true,
            allowMove: true,
            addTranslation: 'Add variable',
            items: {
              type: type,
              variable: variable
            }
          }
        }
      }
    }
  };

  var aboutDefinition = {
    component: 'items',
    label: 'About',
    items: {
      header: {
        label: 'Qwik variable',
        style: 'header',
        component: 'text'
      },
      paragraph1: {
        label: `An easy way to set a variable with additional information from the browser and Qlik Sense`,
        component: 'text'
      },
      paragraph2: {
        label: 'Created by Riley MacDonald.',
        component: 'text'
      }
    }
  };

  return {
    type: "items",
    component: "accordion",
    items: {
      config: config,
      about: aboutDefinition
    }
  };
});