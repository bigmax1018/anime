export default function dobCalc(mydate: string) {
  const dateA = new Date(mydate);
  const dob = dateA.toISOString();

  const myArray = dob?.split("-");
  const myDay = myArray[2].split("T");

  let month = myArray && Number(myArray[1]),
    date = myArray && Number(myDay[0]),
    value = "",
    planet = "";

  if ((month === 1 && date >= 20) || (month === 2 && date <= 18)) {
    value = "Aquarius";
    planet = "Uranus";
  }
  if (month === 1 && date > 31) {
    value = "Huh?";
  }
  if ((month === 2 && date >= 19) || (month === 3 && date <= 20)) {
    value = "Pisces";
    planet = "Neptune";
  }
  if (month === 2 && date > 29) {
    value = "Say what?";
  }
  if ((month === 3 && date >= 21) || (month === 4 && date <= 19)) {
    value = "Aries";
    planet = "Mars";
  }
  if (month === 3 && date > 31) {
    value = "OK.  Whatever.";
  }
  if ((month === 4 && date >= 20) || (month === 5 && date <= 20)) {
    value = "Taurus";
    planet = "Venus";
  }
  if (month === 4 && date > 30) {
    value = "I’m soooo sorry!";
  }
  if ((month === 5 && date >= 21) || (month === 6 && date <= 21)) {
    value = "Gemini";
    planet = "Mercury";
  }
  if (month === 5 && date > 31) {
    value = "Umm … no.";
  }
  if ((month === 6 && date >= 22) || (month === 7 && date <= 22)) {
    value = "Cancer";
    planet = "Moon";
  }
  if (month === 6 && date > 30) {
    value = "Sorry.";
  }
  if ((month === 7 && date >= 23) || (month === 8 && date <= 22)) {
    value = "Leo";
    planet = "Sun";
  }
  if (month === 7 && date > 31) {
    value = "Excuse me?";
  }
  if ((month === 8 && date >= 23) || (month === 9 && date <= 22)) {
    value = "Virgo";
    planet = "Mercury";
  }
  if (month === 8 && date > 31) {
    value = "Yeah. Right.";
  }
  if ((month === 9 && date >= 23) || (month === 10 && date <= 22)) {
    value = "Libra";
    planet = "Venus";
  }
  if (month === 9 && date > 30) {
    value = "Try Again.";
  }
  if ((month === 10 && date >= 23) || (month === 11 && date <= 21)) {
    value = "Scorpio";
    planet = "Pluto";
  }
  if (month === 10 && date > 31) {
    value = "Forget it!";
  }
  if ((month === 11 && date >= 22) || (month === 12 && date <= 21)) {
    value = "Sagittarius";
    planet = "Jupiter";
  }
  if (month === 11 && date > 30) {
    value = "Invalid Date";
  }
  if ((month === 12 && date >= 22) || (month === 1 && date <= 19)) {
    value = "Capricorn";
    planet = "Saturn";
  }
  if (month === 12 && date > 31) {
    value = "No way!";
  }

  // Zodiac Animal

  let year = new Date().getFullYear();
  let birthyear = myArray && Number(myArray[0]);
  let toyear = year - 1;
  let birthpet = "";

  let x = (toyear - birthyear) % 12;

  if (x === 1 || x === -11) {
    birthpet = "Cow";
  } else {
    if (x === 0) {
      birthpet = "Tiger";
    } else {
      if (x === 11 || x === -1) {
        birthpet = "Rabbit";
      } else {
        if (x === 10 || x === -2) {
          birthpet = "Dragon";
        } else {
          if (x === 9 || x === -3) {
            birthpet = "Snake";
          } else {
            if (x === 8 || x === -4) {
              birthpet = "Horse";
            } else {
              if (x === 7 || x === -5) {
                birthpet = "Sheep";
              } else {
                if (x === 6 || x === -6) {
                  birthpet = "Monkey";
                } else {
                  if (x === 5 || x === -7) {
                    birthpet = "Rooster";
                  } else {
                    if (x === 4 || x === -8) {
                      birthpet = "Dog";
                    } else {
                      if (x === 3 || x === -9) {
                        birthpet = "Pig";
                      } else {
                        if (x === 2 || x === -10) {
                          birthpet = "Rat";
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return { star: value, zodiac: birthpet, planet, age };
}
