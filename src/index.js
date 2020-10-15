var qlik = window.require('qlik');
import initialProperties from './initial-properties.js';
import template from './template.html';
import definition from './definition.js';
import controller from './controller.js';
import localCSS from './style.css'; // eslint-disable-line no-unused-vars

export default {
  initialProperties: initialProperties,
  template: template,
  definition: definition,
  controller: controller,
  paint: function (element, layout) {
    const app = qlik.currApp(this);
    const scope = this.$scope;
    this.$scope.isInEdit = this.options.interactionState == 2;
    if(typeof layout.props.variable !== 'undefined') {
      const browserLanguage = navigator.language;
      app.variable.setStringValue(layout.props.variable, browserLanguage);
    }
  },
  support: {
    snapshot: false,
    export: false,
    exportData: false
  }
};
