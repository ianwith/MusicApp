MusicApp
========

The MusicApp is an experimental project.

This application uses several new features of the still-developing html5 standard,
please open it with chrome.

###Tips for use
- Drag music files into the browser, or click the cd-icon to add files.
- Right click to show the playlist.
- Use arrow key *Left* and *Right* to switch between effects.

###Want to make your own effect?
1. Just create another effect file. Make sure it is an AMD module, and do not forget to include the analyser module. like this:
```js
define(['analyser'], function(analyser){
  //write your code here
}
```
2. Then start to write the draw function!
3. Make sure your effect file is included by the visualizer module.
