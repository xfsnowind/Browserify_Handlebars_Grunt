Browserify_Handlebars_Grunt
===========================

This is a experimental project to apply browserify instead of requireJs. I just want to reuse and learn all the techniques and tools applied in NesstarTouch.

Techniques used can be referenced to http://goo.gl/cExSMf

Installation
------------

If you want to build the testBowerGruntHandlebarsRequireJs project yourself, you need
[npm](https://npmjs.org) and [Grunt](http://gruntjs.com).  Assuming npm is
installed, first install Grunt and dependencies like this:

```
> npm install grunt-cli -g
> npm install
```

Then you can build the package like this:

```
> grunt
```

The package will be in the `www` directory which you can copy to your app. Open the page localhost:9000 in the browser, you can see the result.

Release
-------
To release the desktop application, type the command:
```
 grunt release
```
