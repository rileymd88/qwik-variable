define(['./helper'], function (helper) {
  var variable = {
    ref: "props.variable",
    label: "Variable",
    type: "string",
    component: "dropdown",
    options: function () {
      return helper.getVariables();
    }
  };

  var appearance = {
    uses: "settings",
    items: {
      general: {
        items: {
          showTitles: {
            defaultValue: false
          },
          details: {
            show: false
          }
        }
      },
      options: {
        type: "items",
        label: "Qwik language options",
        items: {
          variable: variable
        }
      }
    }
  };

  var aboutDefinition = {
    component: 'items',
    label: 'About',
    items: {
      header: {
        label: 'Qwik Language',
        style: 'header',
        component: 'text'
      },
      paragraph1: {
        label: `An easy way to set a variable with the browser language`,
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
      appearance: appearance,
      about: aboutDefinition
    }
  };
});