# [ng-dropdown](http://ianwalter.github.io/ng-dropdown/)
*A simple AngularJS directive to provide dropdown menu functionality!*

This project was built using [ng-boilerplate](https://github.com/ianwalter/ng-boilerplate)!

#### Step 1: Install ng-dropdown

Install using Bower:

```
bower install ng-dropdown --save
```

Include js/ng-dropdown.min.js in your app. You may also want to include css/ng-dropdown.min.css. It's not necessary
since you can specify the class that will show your dropdown menu (defaults to 'open'), but it's recommended.

#### Step 2: Load the ng-dropdown module

```javascript
var app = angular.module('dropdown-demo', ['ngRoute', 'ng-dropdown'])
```

#### Step 3: Add the dropdown menu markup

```html
<div dropdown id="dropdown-demo" class="ng-dropdown"
     dropdown-menu="dropdown-demo-menu"
     dropdown-open-class="open"
     dropdown-active-class="active"
     dropdown-option-class="option">
  <div class="ng-dropdown-field">
    <div class="ng-dropdown-value" ng-bind="selected.one"></div>
  </div>
  <div id="dropdown-demo-menu" class="ng-dropdown-menu">
    <div ng-repeat="option in options"
         ng-bind="option"
         ng-click="selected.one = option"
         class="option"></div>
  </div>
</div>
```

```dropdown``` The name of the directive.

```dropdown-menu``` The ID of the dropdown menu you would like to display when the dropdown field is clicked.

```dropdown-open-class``` (optional) The class that "shows" the dropdown menu which is initially hidden (defaults to 
"open").

```dropdown-active-class``` (optional) The class that marks the dropdown as active so you can style it differently if
necessary (defaults to "active").

```dropdown-option-class``` (optional) A class added to each option in the dropdown so that the directive can 
eventually keep of which option is highlighted when using keyboard shortcuts like up arrow and down arrow (defaults to 
"option").

```opened``` The variable within the scope of the directive that evaluates to true when the dropdown menu is open.


#### Disabling the dropdown

If you need to disable the dropdown menu in certain circumstances, you can add an expression to the
 ```dropdown-disabled``` attribute. If the expression evaluates to true, the dropdown will be
 disabled, for example, ```dropdown-disabled="1 === 1"```

That's it, I hope you find this useful!

«–– [Ian](http://ianvonwalter.com)
