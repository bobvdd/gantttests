/**
 * Taken from the original example
 */
import { Column, ColumnStore } from '@bryntum/gantt/gantt.umd';
//import { Combo } from '@bryntum/gantt/gantt.umd.js';

/**
 * @module WorkCenterColumn
 */

/**
 * A column showing the status of a task
 *
 * @extends Gantt/column/Column
 * @classType workcentercolumn
 */

//  function cellAlert(msg)
//  {
//  alert(msg);
//  }

export default class WorkCenterColumn extends Column {
    static get $name() {
        return 'WorkCenterColumn';
    }

    static get type() {
        return 'workcentercolumn';
    }

    static get isGanttColumn() {
        return true;
    }

    static get defaults() {
        return {
            // Set your default instance config properties here
            field      : 'workcenter',
            text       : 'WorkCenter',
            cellCls    : 'b-workcenter-column-cell',
            htmlEncode : false,
            //onItem() { cellAlert("Workcenter dropdown clicked") },
            editor : {
                    type  : 'combo',
                    items : ['Haas', 'Makino', 'Hardinge', 'Tumbler','Mazak']
                    },
            filterable : {
                filterField: {
                    type  : 'combo',
                    items : ['Haas', 'Makino', 'Hardinge', 'Tumbler','Mazak']
                }
            }
        };
    }

    //endregion

    renderer({ record }) {
        const workcenter = record.originalData.workcenter;

        return workcenter
            ? {
                  tag       : 'b',
                  className : `${workcenter}`,
                  html      : workcenter
              }
             :  '';
    }

}

ColumnStore.registerColumnType(WorkCenterColumn);
