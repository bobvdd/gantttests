import {
    Toolbar,
    Toast,
    DateHelper,
    CSSHelper
} from '@bryntum/gantt/gantt.umd';
import { Store } from '@bryntum/gantt/gantt.umd.js';

/**
 * @module GanttToolbar
 */

/**
 * @extends Core/widget/Toolbar
 */
export default class GanttToolbar extends Toolbar {
    // Factoryable type name
    static get type() {
        return 'gantttoolbar';
    }

    static get $name() {
        return 'GanttToolbar';
    }

    // Called when toolbar is added to the Gantt panel
    set parent(parent) {
        super.parent = parent;

        const me = this;

        me.gantt = parent;

        parent.project.on({
            load    : 'updateStartDateField',
            refresh : 'updateStartDateField',
            thisObj : me
        });

        me.styleNode = document.createElement('style');
        document.head.appendChild(me.styleNode);
    }

    get parent() {
        return super.parent;
    }

    static get configurable() {
        return {
            items: [
                {
                    type  : 'buttonGroup',
                    items : [
                        {
                            ref      : 'loadButton',
                            icon     : 'b-fa b-fa-file-import',
                            text     : 'Dependencies',
                            tooltip  : 'Create dependencies',
                            onAction : 'up.onLoadClick'
                        }
                    ]
                },
                {
                    type  : 'buttonGroup',
                    items : [
                        {
                            ref      : 'downloadButton',
                            icon     : 'b-fa b-fa-download',
                            text     : 'Download',
                            tooltip  : 'Download chart data',
                            onAction : 'up.onDownLoadClick'
                        }
                    ]
                },
                {
                    type  : 'buttonGroup',
                    items : [
                        {
                            ref      : 'addTasksButton',
                            icon     : 'b-fa b-fa-plus',
                            text     : 'Add tasks',
                            tooltip  : 'Add tasks',
                            onAction : 'up.onAddtasksClick'
                        }
                    ]
                },
                {
                    type  : 'buttonGroup',
                    items : [
                        {
                            ref      : 'addMoveButton',
                            icon     : 'b-fa b-fa-forward',
                            text     : 'Move tasks',
                            tooltip  : 'Move tasks',
                            onAction : 'up.onMovetasksClick'
                        }
                    ]
                },
                {
                    type  : 'buttonGroup',
                    items : [
                        {
                            color    : 'b-green',
                            ref      : 'addTaskButton',
                            icon     : 'b-fa b-fa-plus',
                            text     : 'Create',
                            tooltip  : 'Create new task',
                            onAction : 'up.onAddTaskClick'
                        }
                    ]
                },
                {
                    type  : 'buttonGroup',
                    items : [
                        {
                            ref      : 'editTaskButton',
                            icon     : 'b-fa b-fa-pen',
                            text     : 'Edit',
                            tooltip  : 'Edit selected task',
                            onAction : 'up.onEditTaskClick'
                        },
                        {
                            ref   : 'undoRedo',
                            type  : 'undoredo',
                            items : {
                                transactionsCombo : null
                            }
                        }
                    ]
                },
                {
                    type  : 'buttonGroup',
                    items : [
                        {
                            ref      : 'expandAllButton',
                            icon     : 'b-fa b-fa-angle-double-down',
                            tooltip  : 'Expand all',
                            onAction : 'up.onExpandAllClick'
                        },
                        {
                            ref      : 'collapseAllButton',
                            icon     : 'b-fa b-fa-angle-double-up',
                            tooltip  : 'Collapse all',
                            onAction : 'up.onCollapseAllClick'
                        }
                    ]
                },
                {
                    type  : 'buttonGroup',
                    items : [
                        {
                            ref      : 'zoomInButton',
                            icon     : 'b-fa b-fa-search-plus',
                            tooltip  : 'Zoom in',
                            onAction : 'up.onZoomInClick'
                        },
                        {
                            ref      : 'zoomOutButton',
                            icon     : 'b-fa b-fa-search-minus',
                            tooltip  : 'Zoom out',
                            onAction : 'up.onZoomOutClick'
                        },
                        {
                            ref      : 'zoomToFitButton',
                            icon     : 'b-fa b-fa-compress-arrows-alt',
                            tooltip  : 'Zoom to fit',
                            onAction : 'up.onZoomToFitClick'
                        },
                        {
                            ref      : 'previousButton',
                            icon     : 'b-fa b-fa-angle-left',
                            tooltip  : 'Previous time span',
                            onAction : 'up.onShiftPreviousClick'
                        },
                        {
                            ref      : 'nextButton',
                            icon     : 'b-fa b-fa-angle-right',
                            tooltip  : 'Next time span',
                            onAction : 'up.onShiftNextClick'
                        }
                    ]
                },
                {
                    type  : 'buttonGroup',
                    items : [
                        {
                            type       : 'button',
                            ref        : 'featuresButton',
                            icon       : 'b-fa b-fa-tasks',
                            text       : 'Features',
                            tooltip    : 'Toggle features',
                            toggleable : true,
                            menu       : {
                                onItem       : 'up.onFeaturesClick',
                                onBeforeShow : 'up.onFeaturesShow',
                                items        : [
                                    {
                                        text    : 'Draw dependencies',
                                        feature : 'dependencies',
                                        checked : false
                                    },
                                    {
                                        text    : 'Task labels',
                                        feature : 'labels',
                                        checked : true
                                    },
                                    {
                                        text    : 'Project lines',
                                        feature : 'projectLines',
                                        checked : false
                                    },
                                    {
                                        text    : 'Highlight non-working time',
                                        feature : 'nonWorkingTime',
                                        checked : false
                                    },
                                    {
                                        text    : 'Enable cell editing',
                                        feature : 'cellEdit',
                                        checked : false
                                    },
                                    {
                                        text    : 'Show baselines',
                                        feature : 'baselines',
                                        checked : false
                                    },
                                    {
                                        text    : 'Show rollups',
                                        feature : 'rollups',
                                        checked : false
                                    },
                                    {
                                        text    : 'Show progress line',
                                        feature : 'progressLine',
                                        checked : false
                                    },
                                    {
                                        text    : 'Hide schedule',
                                        cls     : 'b-separator',
                                        subGrid : 'normal',
                                        checked : false
                                    }
                                ]
                            }
                        },
                        {
                            type       : 'button',
                            ref        : 'settingsButton',
                            icon       : 'b-fa b-fa-cogs',
                            text       : 'Settings',
                            tooltip    : 'Adjust settings',
                            toggleable : true,
                            menu       : {
                                type        : 'popup',
                                anchor      : true,
                                cls         : 'settings-menu',
                                layoutStyle : {
                                    flexDirection : 'column'
                                },
                                onBeforeShow : 'up.onSettingsShow',

                                items: [
                                    {
                                        type      : 'slider',
                                        ref       : 'rowHeight',
                                        text      : 'Row height',
                                        width     : '12em',
                                        showValue : true,
                                        min       : 30,
                                        max       : 70,
                                        onInput   : 'up.onSettingsRowHeightChange'
                                    },
                                    {
                                        type      : 'slider',
                                        ref       : 'barMargin',
                                        text      : 'Bar margin',
                                        width     : '12em',
                                        showValue : true,
                                        min       : 0,
                                        max       : 10,
                                        onInput   : 'up.onSettingsMarginChange'
                                    },
                                    {
                                        type      : 'slider',
                                        ref       : 'duration',
                                        text      : 'Animation duration ',
                                        width     : '12em',
                                        min       : 0,
                                        max       : 2000,
                                        step      : 100,
                                        showValue : true,
                                        onInput   : 'up.onSettingsDurationChange'
                                    }
                                ]
                            }
                        },
                        {
                            type       : 'button',
                            color      : 'b-red',
                            ref        : 'criticalPathsButton',
                            icon       : 'b-fa b-fa-fire',
                            text       : 'Critical paths',
                            tooltip    : 'Highlight critical paths',
                            toggleable : true,
                            onAction   : 'up.onCriticalPathsClick'
                        }
                    ]
                },
                {
                    type  : 'datefield',
                    ref   : 'startDateField',
                    label : 'Project start',
                    // required  : true, (done on load)
                    flex      : '0 0 17em',
                    listeners : {
                        change : 'up.onStartDateChange'
                    }
                },
                {
                    type : 'textfield',
                    ref  : 'filterByName',
                    cls  : 'filter-by-name',
                    flex : '0 0 12.5em',
                    // Label used for material, hidden in other themes
                    label : 'Find tasks by name',
                    // Placeholder for others
                    placeholder          : 'Find tasks by name',
                    clearable            : true,
                    keyStrokeChangeDelay : 100,
                    triggers             : {
                        filter: {
                            align : 'end',
                            cls   : 'b-fa b-fa-filter'
                        }
                    },
                    onChange : 'up.onFilterChange'
                }
            ]
        };
    }

    setAnimationDuration(value) {
        const me      = this,
              cssText = `.b-animating .b-gantt-task-wrap { transition-duration: ${
                value / 1000
            }s !important; }`;

        me.gantt.transitionDuration = value;

        if (me.transitionRule) {
            me.transitionRule.cssText = cssText;
        } else {
            me.transitionRule = CSSHelper.insertRule(cssText);
        }
    }

    updateStartDateField() {
        const { startDateField } = this.widgetMap;

        startDateField.value = this.gantt.project.startDate;

        // This handler is called on project.load/propagationComplete, so now we have the
        // initial start date. Prior to this time, the empty (default) value would be
        // flagged as invalid.
        startDateField.required = true;
    }

    // region controller methods

    async onAddTaskClick() {
        const { gantt } = this,
              added     = gantt.taskStore.rootNode.appendChild({
                name     : 'New task',
                duration : 1
            });

        // run propagation to calculate new task fields
        await gantt.project.propagateAsync();

        // scroll to the added task
        await gantt.scrollRowIntoView(added);

        gantt.features.cellEdit.startEditing({
            record : added,
            field  : 'name'
        });
    }

    async onLoadClick_old() {
        const { gantt } = this;
        // var launchsaasJSON = JSON.parse(localStorage.getItem('launch-saas'));
        // const store = new Store({
        //     data : launchsaasJSON
        // });

        const store = new Store({
            data : [
                { id : 1, name : 'Superman' },
                { id : 2, name : 'Batman' },
                { id : 3, name : 'Robin' },
                { id : 4, name : 'Superwoman' }
            ]
        });

        gantt.Store = store;
        await gantt.project.propagateAsync();
    }

    async onLoadClick()
    {
        const { gantt } = this;
        let depstore = gantt.dependencyStore ;

        //Extract the existing dependecies in a new array
        depstore.autoCommit = true;
        let newdependencies = []
        for (let i = 0; i < depstore.allRecords.length; i++)
        {
            newdependencies.push(depstore.allRecords[i].data);
        }
        // Add the new dependencies to the array 
        newdependencies = [...newdependencies,{ id : 2, from : 2, to : 3 },{ id : 3, from : 3, to : 4 }];
        depstore.data = newdependencies;

        // depstore.data= [
        //      { id : 2, from : 2, to : 3 },
        //      { id : 3, from : 3, to : 4 },
        //  ];

        await gantt.project.propagateAsync();
    } 

    async onDownLoadClick() {
        const { gantt } = this;

        // Tasks
        var alltaskrecords = gantt.tasks.splice(0,1);
        var tasksobject =   {"tasks" : {"rows" : alltaskrecords}}; //only use first array element from the tasks

        // Resources
        var allresourcerecords = gantt.resources;
        var resourcesobject =   {"resources" : {"rows" : allresourcerecords}};

        // Assignments
        var allassignmentrecords = gantt.assignments;
        var assignmentsobject =   {"assignments" : {"rows" : allassignmentrecords}};

        // Dependencies
        var alldependencyrecords = gantt.dependencies;
        var dependenciessobject =   {"dependencies" : {"rows" : alldependencyrecords}};

        // Projects
        var allprojectrecords = gantt.project;
        var projectsobject =   {"project" : {"rows" : allprojectrecords}};

        // Calendars
        var allcalendarrecords = gantt.taskStore.calendarManagerStore.allRecords.splice(0,1); //only use first calendar
        var firstcalendar=allcalendarrecords
        var calendarsobject =   {"calendars" : {"rows" : firstcalendar}};

        // TimeRange
        var alltimerangesrecords = gantt.timeRanges;
        var timerangesobject =   {"timeRanges" : {"rows" : alltimerangesrecords}};
        
        // Concatenate all JSON in a single JSON object
        var projectobject = {...projectsobject,...calendarsobject,...tasksobject,...dependenciessobject,...resourcesobject,...assignmentsobject,...timerangesobject};
        var text = JSON.stringify(projectobject,null,4);
        var name = 'launch-saas.json';

        // Store JSON in local storage
        localStorage.setItem('launch-saas', text);
        //var launchsaasJSON = JSON.parse(localStorage.getItem('launch-saas'));

        // Download JSON to the downloads folder
        const a = document.createElement('a');
        const type = name.split(".").pop();
        a.href = URL.createObjectURL( new Blob([text], { type:`text/${type === "txt" ? "plain" : type}` }) );
        a.download = name;
        a.click();
    }

    async onAddtasksClick()
    {
        const { gantt } = this;
        let selection = gantt.selectedRecord;
        let subtask1,subtask2,subtask3;
        if (selection!= null)
        {
            //Define sub tasks
            let selectedTask = gantt.taskStore.getById(selection.id);
            subtask1 = selectedTask.appendChild({ name : 'Sub Task Mazak 01', workcenter: 'Mazak', startDate : '2019-01-12', duration : 3, inactive : false });
            subtask2 = selectedTask.appendChild({ name : 'Sub Task EDM 01', workcenter: 'EDM', duration : 0, inactive : false });
            subtask3 = selectedTask.appendChild({ name : 'Sub Task Tumble 01', workcenter: 'Tumble', duration : 2, inactive : false });

            await gantt.project.propagateAsync();
            this.gantt.expandAll();

            // Define dependencies
            let depstore = gantt.dependencyStore;
            depstore.autoCommit = true;
            gantt.taskStore.autoCommit = true;
            let newdependencies = []
            for (let i = 0; i < depstore.allRecords.length; i++)
            {
                newdependencies.push(depstore.allRecords[i].data);
            }
            // Add the new dependencies to the array 
            newdependencies = [...newdependencies,
                { id : subtask1.id, from : subtask1.id, to : subtask2.id },
                { id : subtask2.id , from : subtask2.id , to : subtask3.id },
            ];
            depstore.data = newdependencies;
        }
        else{
            alert("Select a row first");
        }
    }

    async onMovetasksClick(){
        const { gantt } = this;
        let allrecords = gantt.taskStore.allRecords;

        //Get start date time of first task
        // let earliestTaskStartDate = gantt.taskStore.allRecords[0].startDate;
        // let earlymonth = earliestTaskStartDate.getMonth();
        // let earlyday = earliestTaskStartDate.getDay();
        // let earlyyear = earliestTaskStartDate.getYear();

        //gantt.project.manuallyScheduled= true;

        for (let i = 1; i < gantt.taskStore.allRecords.length; i++)
        {   
            let startDateTask = gantt.taskStore.allRecords[i].startDate;
            startDateTask.setMonth(startDateTask.getMonth() + 1);
            let endDateTask = gantt.taskStore.allRecords[i].endDate;
            endDateTask.setMonth(endDateTask.getMonth() + 1);
        }

        await gantt.project.propagateAsync();
        //gantt.project.manuallyScheduled= false;
    }

    async onEditTaskClick() {
        const { gantt } = this;

        if (gantt.selectedRecord) {
            gantt.editTask(gantt.selectedRecord);
        } else {
            Toast.show('First select the task you want to edit');
        }
    }

    onExpandAllClick() {
        this.gantt.expandAll();
    }

    onCollapseAllClick() {
        this.gantt.collapseAll();
    }

    onZoomInClick() {
        this.gantt.zoomIn();
    }

    onZoomOutClick() {
        this.gantt.zoomOut();
    }

    onZoomToFitClick() {
        this.gantt.zoomToFit({
            leftMargin  : 50,
            rightMargin : 50
        });
    }

    onShiftPreviousClick() {
        this.gantt.shiftPrevious();
    }

    onShiftNextClick() {
        this.gantt.shiftNext();
    }

    onStartDateChange({ value, oldValue }) {
        if (!oldValue) {
            // ignore initial set
            return;
        }

        this.gantt.startDate = DateHelper.add(value, -1, 'week');

        this.gantt.project.setStartDate(value);
    }

    onFilterChange({ value }) {
        if (value === '') {
            this.gantt.taskStore.clearFilters();
        } else {
            value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            this.gantt.taskStore.filter({
                filters : task =>
                    task.name && task.name.match(new RegExp(value, 'i')),
                replace : true
            });
        }
    }

    onFeaturesClick({ source: item }) {
        const { gantt } = this;

        if (item.feature) {
            const feature          = gantt.features[item.feature];
                  feature.disabled = !feature.disabled;
        } else if (item.subGrid) {
            const subGrid           = gantt.subGrids[item.subGrid];
                  subGrid.collapsed = !subGrid.collapsed;
        }
    }

    onFeaturesShow({ source: menu }) {
        const { gantt } = this;

        menu.items.map(item => {
            const { feature } = item;

            if (feature) {
                // a feature might be not presented in the gantt
                // (the code is shared between "advanced" and "php" demos which use a bit different set of features)
                if (gantt.features[feature]) {
                    item.checked = !gantt.features[feature].disabled;
                }
                // hide not existing features
                else {
                    item.hide();
                }
            } else {
                item.checked = gantt.subGrids[item.subGrid].collapsed;
            }
            return item;
        });
    }

    onSettingsShow({ source: menu }) {
        const { gantt }                          = this,
              { rowHeight, barMargin, duration } = menu.widgetMap;

        rowHeight.value = gantt.rowHeight;
        barMargin.value = gantt.barMargin;
        barMargin.max   = gantt.rowHeight / 2 - 5;
        duration.value  = gantt.transitionDuration;
    }

    onSettingsRowHeightChange({ value }) {
        this.gantt.rowHeight                                       = value;
        this.widgetMap.settingsButton.menu.widgetMap.barMargin.max =
            value / 2 - 5;
    }

    onSettingsMarginChange({ value }) {
        this.gantt.barMargin = value;
    }

    onSettingsDurationChange({ value }) {
        this.gantt.transitionDuration = value;
        this.styleNode.innerHTML      = `.b-animating .b-gantt-task-wrap { transition-duration: ${
            value / 1000
        }s !important; }`;
    }

    onCriticalPathsClick({ source }) {
        this.gantt.features.criticalPaths.disabled = !source.pressed;
    }

    // endregion
}

// Register this widget type with its Factory
GanttToolbar.initClass();
