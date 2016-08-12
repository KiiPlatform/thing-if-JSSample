import {RouterConfig} from '@angular/router';
import {Dashboard} from './dashboard/dashboard.component';
import {State} from './state/state.component';
import {TriggerComponent} from './trigger/trigger.component';
import {Pages} from './pages.component';
import {Forms} from './forms/forms.component';
import {Inputs} from './forms/components/inputs/inputs.component';
import {Layouts} from './forms/components/layouts/layouts.component';
import {Components} from './components/components.component';
import {Command} from './command/command.component';
//noinspection TypeScriptValidateTypes
export const PagesRoutes:RouterConfig = [
  {
    path: 'pages',
    component: Pages,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        data: {
          menu: {
            title: 'Thing Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'state',
        component: State,
        data: {
          menu: {
            title: 'States',
            icon: 'ion-ios-albums',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'command',
        component: Command,
        data: {
          menu: {
            title: 'Commands',
            icon: 'ion-arrow-return-right',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'trigger',
        component: TriggerComponent,
        data: {
          menu: {
            title: 'Triggers',
            icon: 'ion-ios-bolt',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      }
  
    ]
  }
];
