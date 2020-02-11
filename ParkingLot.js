/* Design a parking lot using Object-Oriented Principles. */

class ParkingLot {
  constructor(spaces) {
    this.limit = spaces; 
    this.number = 0; 
    this.cars = {};
  }
  park(car) {
    if (this.number <= this.limit) {
      if (this.cars[car.name] !== undefined) {
        console.log('car is already in parking lot'); 
      } else {
        this.cars[car.name] = car; 
        this.number++; 
      }
    } else {
      console.log('parking lot is full'); 
    }
  }

  exit(car) {
    if (this.number === 0) {
      console.log('there are no cars in the parking lot'); 
    } else if (this.cars[car.name] === undefined) {
      console.log('car is not in parking lot'); 
    } else {
      delete this.cars[car.name]; 
      this.number--; 
    }
  }

  isAvailable() {
    return this.number < this.limit; 
  }
}

/*
each parking lot has limited parking spaces
must pay for parking
count removed cars and entered cars 
*/