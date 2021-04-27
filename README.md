# 🚀 Welcome to your new awesome project!


## 1. Setup
First, make sure that you have install node.js on your computer. If you have not, get it on this website:

**https://nodejs.org/en/download/**

After you have installed node.js on your computer, go to `package.json` to change `name`, `description`, and `author`
of this project.

Now, you can now run

```
npm install
```

to download all the required modules.

## 2. Develop and debug your project in development mode

When your project is still in development, run 

```
npm run test
```

to run a webpack server, which will automatically recompile as you update your code and serve it to your local browser.
It will also provide helpful debugging information in the browser console.

## 3. Build your project for distribution in production mode

When your project is ready for distribution, run 

```
npm run build
```

to build your project in production mode. Webpack will bundle and minify your scripts and place it in the `dist` folder. 
You can then upload the files to cdn for distribution.

## 4. Install new modules
If your project requires more modules that are used in your source scripts (located in the `src` folder ), run

```
npm install --save [name of your module]
```

If your projects requires more modules that are used in your `webpack.config.js` (such as loaders and plugins), run 

```
npm install --save-dev [name of your module]
```

## 5. Caveat on sharing your source code 
If you want to share your source code with others, do not include the `node_module` folder. Otherwise, the size of your 
shared file will explode. The `package.json` file records all the modules required to run and build your project, and 
the other party can simple run `npm install` to install the modules locally.

The `.gitignore` file included in this template will tell git to ignore all the unnecessary files when you are using git 
for version control.