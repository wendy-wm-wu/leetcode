var Jukebox = function() {
  this.currentSong = null;
  this.songQueue = [];
}

Jukebox.prototype.shuffle = function() {
  this.songQueue.sort(() => Math.random() > 0.5 ? 1 : 0); 
}

Jukebox.prototype.play = function(song) {
  if (this.currentSong === null) {
    this.currentSong = this.songQueue.unshift();
    this.currentSong.play(); 
  } else {
    console.log('song is currently playing'); 
  }
}

Jukebox.prototype.pause = function() {
  if (this.currentSong !== null) {
    this.currentSong.pause(); 
  } else {
    console.log('there is no song currently playing');
  }
}

Jukebox.prototype.nextSong = function() {
  this.songQueue.shift();
  this.currentSong = this.songQueue[0]; 
  this.currentSong.play(); 
}

Jukebox.prototype.addSong = function(song) {
  this.songQueue.push(song);
}

Jukebox.prototype.currentSongName = function() {
  return this.currentSong.name;
}

var Song = function(name, track) {
  this.name = name;
  this.track = new Audio(track);
}

Song.prototype.play = function() {
  this.track.play(); 
}

Song.prototype.pause = function() {
  this.track.pause();
}

