/**
 * Gantt Component
 */

// React libraries
import React from 'react';

// Bryntum libraries
import { BryntumGantt } from '@bryntum/gantt-react';
//import { BryntumSchedulerPro } from '@bryntum/scheduler-react';
//import { BryntumSchedulerPro } from '@bryntum/gantt-react';

// Application imports
import Task from '../lib/Task';
import '../lib/StatusColumn';
import '../lib/WorkCenterColumn';
import '../lib/GanttToolbar';

function cellAlert(msg)
{
alert(msg);
}

async function addDependencies(cell)
{
    //Find the dependency store starting from the cell that is selected
    //let owner = cell.parent.owner;
    //let grid = cell.parent;
    let proj= cell.parent.owner.project;
    let depstore = proj.dependencyStore;

    //Extract the existing dependecies in a new array
    //depstore.autoCommit = true;
    let newdependencies = []
    for (let i = 0; i < depstore.allRecords.length; i++)
    {
        newdependencies.push(depstore.allRecords[i].data);
    }
    // Add the new dependencies to the array 
    newdependencies = [...newdependencies,{ id : 2, from : 2, to : 3 },{ id : 3, from : 3, to : 4 }];
    depstore.data = newdependencies;


    //let tasks = proj.taskStore;

    await proj.propagateAsync();

    //cellAlert("Cell context menu clicked") ;
    return depstore;
}

const Gantt = props => {

    const ganttConfig = {
        tbar : { type: 'gantttoolbar' },

        dependencyIdField : 'wbsCode',

        // project: myproject,

        project: {
            // Let the Project know we want to use our own Task model with custom fields / methods
            taskModelClass : Task,
            transport      : {
                load: {
                    url : 'data/launch-saas.json',
                    // children :  localStorage.getItem('launch-saas'),
                    // reader: {
                    //     type: 'json',
                    // },
                }
            },
            autoLoad : false,
            //autoSync: true,

            eventsData : [
                {
                    id       : 1,
                    name     : 'MSP Request 01',
                    inactive : false,
                    expanded : true,
                    manuallyScheduled: false,
                    children : [
                        { id : 2, name : 'Task 01', workcenter: 'Haas', startDate : '2019-01-12', duration : 2, inactive : false },
                        { id : 3, name : 'Task 02', workcenter: 'Haas', startDate : '2019-01-12', duration : 5, inactive : false },
                        { id : 4, name : 'Task 03', workcenter: 'Haas', startDate : '2019-01-12', duration : 3, inactive : false },
                        { id : 5, name : 'Task 04', workcenter: 'Haas', startDate : '2019-01-12', duration : 4, inactive : false },
                        { id : 6, name : 'Task 05', workcenter: 'Haas', startDate : '2019-01-12', duration : 2, inactive : false }
                    ]
                }
            ],
            dependenciesData : [
                // { id : 2, from : 2, to : 3 },
                // { id : 3, from : 3, to : 4 },
                { id : 4, from : 4, to : 5 },
                { id : 5, from : 5, to : 6 },
            ],

            // The State TrackingManager which the UndoRedo widget in the toolbar uses
            stm: {
                autoRecord : true
            },

            // This config enables response validation and dumping of found errors to the browser console.
            // It's meant to be used as a development stage helper only so please set it to false for production systems.
            validateResponse : true
        },

        startDate               : '2019-01-12',
        endDate                 : '2019-03-24',
        resourceImageFolderPath : 'users/',

        columns                 : [
            { type: 'wbs', text : 'Sort order' },
            { type: 'name', width: 250 },
            {
                type : 'workcentercolumn',
                text : 'Workcenter',
                field : 'workcenter',
                headerMenuItems: [{
                text : 'My unique header item',
                icon : 'b-fa b-fa-paw',
                onItem() { cellAlert("Header context menu clicked") }

                }],
                cellMenuItems: [{
                text : 'My unique cell item',
                icon : 'b-fa b-fa-plus',
                // onItem() { cellAlert("Cell context menu clicked") },
                onItem() { addDependencies(this)},
                }]
            },
            { type: 'schedulingmodecolumn',
        },
            { type: 'startdate' },
            { type: 'duration' },
            { type: 'resourceassignment', width: 120, showAvatars: true },
            { type: 'percentdone', showCircle: true, width: 70 },
            {
                type  : 'predecessor',
                width : 112
            },
            {
                type  : 'successor',
                width : 112
            },
            { type: 'calendar' },
            { type: 'constrainttype' },
            { type: 'constraintdate' },
            { type: 'statuscolumn' },
            {
                type  : 'date',
                text  : 'Deadline',
                field : 'deadline'
            },
            { type: 'addnew' }
        ],

        subGridConfigs: {
            locked: {
                flex : 3
            },
            normal: {
                flex : 4
            }
        },

        columnLines : false,

        rollupsFeature: {
            disabled : true
        },
        baselinesFeature: {
            disabled : true
        },
        progressLineFeature: {
            disabled   : true,
            statusDate : new Date(2019, 0, 25)
        },
        filterFeature         : true,
        dependencyEditFeature : true,
        timeRangesFeature     : {
            showCurrentTimeLine : true
        },
        labelsFeature: {
            left: {
                field  : 'name',
                editor : {
                    type : 'textfield'
                }
            }
        }
    };

    return <BryntumGantt {...ganttConfig} {...props} />;
};

export default Gantt;
