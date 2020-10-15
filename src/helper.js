/* eslint-disable no-console */
define(["qlik"], function (qlik) {
  return {
    getVariables:  function () {
      return new Promise(async function (resolve, reject) {
        const app = await qlik.currApp(this);
        const variableProps = {
          qVariableListDef: {
            qType: 'variable'
          }
        };
        const reply = await app.createGenericObject(variableProps);
        const variableList = reply.layout.qVariableList.qItems;
        let finalVariableList = [];
        for(let i = 0; i< variableList.length;i++) {
          finalVariableList.push({
            value: variableList[i].qName,
            label: variableList[i].qName
          });
        }
        resolve(finalVariableList);
      });
    }
  };
});
