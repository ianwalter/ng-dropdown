# [ng-dropdown](http://ianwalter.github.io/ng-dropdown/)
*A simple AngularJS directive to provide dropdown menu functionality!*

This project was built using [ng-boilerplate](https://github.com/ianwalter/ng-boilerplate)!

#### Step 1: Install ng-dropdown

Install using Bower:

```
bower install ng-dropdown --save
```

Include ng-dropdown.min.js in your app.

#### Step 2: Load the ng-dropdown module

```javascript
var app = angular.module('dropdown-demo', ['ngRoute', 'ng-dropdown'])
```

#### Step 3: Add the context-menu directive to a DOM element

```html
<div dropdown class="panel panel-default" data-target="myMenu"
     ng-class="{ 'active': active }">
  ...
</div>
```

#### Step 4:

#### Disabling the dropdown

If you need to disable the dropdown menu in certain circumstances, you can add an expression to the
 ```dropdown-disabled``` attribute. If the expression evaluates to true, the dropdown will be
 disabled, for example, ```dropdown-disabled="1 === 1"```

That's it, I hope you find this useful!

«–– [Ian](http://ianvonwalter.com)
