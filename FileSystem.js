var FileSystem = function(name) {
  this.folder = new Folder(name);
  this.currentFile = null;
  this.currentFolder = null; 
}

FileSystem.prototype.showCurrent = function() {
  if (this.currentFile !== null || this.currentFolder !== null) {
    return this.currentFile.name || this.currentFolder.name; 
  } else {
    console.log("no file"); 
  }
}

FileSystem.prototype.findFile = function(name) {
  let found = this.folder.findFile(name);
  this.currentFile = found;
  return found; 
}

FileSystem.prototype.findFolder = function(name) {
  let found = this.folder.findFolder(name); 
  this.currentFolder = found; 
  return found; 
}

FileSystem.prototype.addFileToCurrentFolder = function(name, content) {
  this.currentFolder.push(new File(name, content)); 
}

FileSystem.prototype.addFolderToCurrent = function(name) {
  this.currentFolder.push(new Folder(name));
}

FileSystem.prototype.deleteCurrentFile = function(name, content) {
  this.currentFolder.filesAndFolders.forEach((item, i) => {
    if (item.type === "file" && item.name === name) {
      this.currentFolder.filesAndFolders.splice(i, 1); 
    }
  });
}

FileSystem.prototype.deleteCurrentFolder = function(name) {
  this.currentFolder.filesAndFolders.forEach((item, i) => {
    if (item.type === "folder" && item.name === name) {
      this.currentFolder.filesAndFolders.splice(i, 1); 
    }
  });
}

var Folder = function(name) {
  this.name = name;
  this.type = "folder"; 
  this.filesAndFolders = [];
}

Folder.prototype.findFolder = function(name) {
  if (this.name === name) {
    return this; 
  } else {
    this.filesAndFolders.forEach((item) => {
      if (item.type === "folder") {
        item.findFolder(name); 
      }
    });
  }
}

Folder.prototype.findFile = function(name) {
  //if item is file 
  this.filesAndFolders.forEach((item) => {
    if (item.type === "file" && item.name === name) {
      return item; 
    }
  })
  //if item is a folder
  this.filesAndFolders.forEach((item) => {
    if (item.type === "folder" ) {
      item.findFile(name); 
    }
  })
}

var File = function(name, content) {
  this.name = name;
  this.type = "file"; 
  this.content = this.content !== undefined ? content : null;
}

